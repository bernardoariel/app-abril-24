<template>
  <div class="flex items-center justify-center p-4 bg-orangeCustom3 h-16">
    <!-- Botón Volver -->
    <button v-if="showBackButton" @click="goBack" class="btn btn-ghost mr-4">Volver</button>

    <!-- Botón Limpiar -->
    <button
      v-else-if="hasQueries"
      @click="clearQuery"
      class="btn btn-ghost text-red-600 font-semibold mr-4"
    >
      Limpiar
    </button>

    <h1 class="text-xl font-bold text-center flex-grow">{{ title }}</h1>
    <button v-if="isAdmin" @click="handleTaskExecution" class="btn btn-primary">
      Actualizar Credenciales
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../store/useAuth';
import { ejecutarTarea } from '../modules/Auth/services/actions';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const administradoresEmails = ['mario@abrilamoblamientos.com.ar'];
const isAdmin = computed(() => administradoresEmails.includes(authStore.user));

const showBackButton = computed(() => {
  return !['login', 'searchProduct'].includes(route.name as string);
});
const title = computed(() => {
  return route.meta.title || 'Default Title';
});

// Computada para verificar si hay queries activas
const hasQueries = computed(() => {
  const { search, marca, descripcion } = route.query;
  return Boolean(search || marca || descripcion);
});
const handleTaskExecution = async () => {
  const result = await ejecutarTarea();

  if (result.success) {
    console.log('Tarea ejecutada exitosamente:', result.data);
    alert('Tarea ejecutada exitosamente.');
  } else {
    console.error('Error al ejecutar la tarea:', result.error);
    alert('Error al ejecutar la tarea.');
  }
};
// Función para ir atrás
const goBack = () => {
  const previousRouteData = localStorage.getItem('previousRoute');
  const productListQueryData = localStorage.getItem('productListQuery');

  if (!previousRouteData) {
    router.replace({ name: 'searchProduct' });
    return;
  }

  try {
    const previousRoute = JSON.parse(previousRouteData);
    const productListQuery = productListQueryData ? JSON.parse(productListQueryData) : null;

    if (previousRoute.name === 'productList' && productListQuery) {
      if (route.name === 'productList') {
        router.replace({ name: 'searchProduct', query: productListQuery });
        return;
      }
      router.replace({ name: previousRoute.name, query: productListQuery });
    } else if (productListQuery && Object.keys(productListQuery).length >= 2) {
      router.replace({ name: previousRoute.name, query: productListQuery });
    } else {
      router.replace({ name: previousRoute.name });
    }
  } catch (error) {
    console.error('Error al parsear localStorage:', error);
    router.replace({ name: 'searchProduct' });
  }
};

// Función para limpiar las queries
const clearQuery = () => {
  router.replace({ name: route.name, query: {} }); // Limpia las queries de la URL
};
</script>
