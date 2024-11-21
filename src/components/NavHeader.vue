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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

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
