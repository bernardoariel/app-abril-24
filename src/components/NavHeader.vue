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

    <!-- Botón de Elipsis con Dropdown -->
    <div class="relative inline-block text-left">
      <button
        @click="toggleDropdown"
        class="flex items-center justify-center w-10 h-10 bg-orange-600 text-white rounded-full hover:bg-orange-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM10 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM10 13a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
          />
        </svg>
      </button>

      <!-- Opciones del Dropdown -->
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
      >
        <ul class="py-1">
          <!-- Opciones exclusivas de administradores -->
          <li v-if="isAdmin">
            <button
              @click="handleTaskExecution"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Actualizar Credenciales
            </button>
          </li>
          <!-- Opción Cerrar Sesión visible para todos -->
          <li>
            <button
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../store/useAuth';
import { ejecutarTarea } from '../modules/Auth/services/actions';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Estado del dropdown
const isDropdownOpen = ref(false);

// Función para alternar el dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Lista de emails de administradores
const administradoresEmails = ['mario@abrilamoblamientos.com.ar'];
const isAdmin = computed(() => administradoresEmails.includes(authStore.user));

// Mostrar el botón de "Volver" basado en la ruta
const showBackButton = computed(() => {
  return !['login', 'searchProduct'].includes(route.name as string);
});

// Título dinámico basado en la metadata de la ruta
const title = computed(() => {
  return route.meta.title || 'Default Title';
});

// Verificar si hay queries activas
const hasQueries = computed(() => {
  const { search, marca, descripcion } = route.query;
  return Boolean(search || marca || descripcion);
});

// Función para ejecutar una tarea
const handleTaskExecution = async () => {
  isDropdownOpen.value = false; // Cerrar el dropdown
  const result = await ejecutarTarea();

  if (result.success) {
    console.log('Tarea ejecutada exitosamente:', result.data);
    alert('Tarea ejecutada exitosamente.');
  } else {
    console.error('Error al ejecutar la tarea:', result.error);
    alert('Error al ejecutar la tarea.');
  }
};

// Función para cerrar sesión
const handleLogout = () => {
  authStore.clearUser(); // Limpiar usuario del store
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userEmail');
  isDropdownOpen.value = false; // Cerrar el dropdown
  router.push({ name: 'login' }); // Redirigir al login
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
