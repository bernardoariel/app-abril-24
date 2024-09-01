<template>
<<<<<<< HEAD
  <div class="flex items-center justify-between p-4 bg-gray-200">
    <!-- Div de la izquierda (start) -->
    <div class="flex items-center justify-start w-auto">
      <button v-if="showBackButton" @click="goBack" class="btn btn-ghost">Volver</button>
    </div>

    <!-- Div central (center) -->
    <div class="flex-1 text-center">
      <h1 class="text-xl font-bold whitespace-nowrap">{{ title }}</h1>
    </div>

    <!-- Div de la derecha (end) -->
    <div class="flex items-center justify-end w-auto"></div>
=======
  <div class="flex items-center p-4 bg-gray-200 h-16">
    <button v-if="showBackButton" @click="goBack" class="btn btn-ghost mr-4">Volver</button>
    <h1 class="text-xl font-bold">{{ title }}</h1>
>>>>>>> buscarProductos
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const title = computed(() => {
  switch (route.name) {
    case 'login':
      return 'Login';
    case 'productList':
      return 'Listado de Productos';
    case 'productDetail':
      return 'Detalle del Producto';
    case 'searchProduct':
      return 'Buscar Producto';
    default:
      return '';
  }
});

const showBackButton = computed(() => {
  return !['login', 'searchProduct'].includes(route.name as string);
});

const goBack = () => {
  router.replace({ name: 'searchProduct' });
};
</script>
