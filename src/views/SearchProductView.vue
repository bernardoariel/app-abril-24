<template>
  <div class="w-full h-full">
    <div class="flex flex-col h-full justify-start items-center pt-40">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Ingrese un producto a buscar"
        class="input input-bordered w-1/2 mb-4"
      />
      <button @click="handleSearch" class="btn btn-primary w-1/2">Buscar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProductPrefetch } from '../modules/sqlserver/products/composable/useProductPrefetch';

const searchTerm = ref('');
const { prefetch } = useProductPrefetch(); // Iniciar el hook dentro de setup

const handleSearch = async () => {
  if (!searchTerm.value) return;

  await prefetch(searchTerm.value); // Usar el método prefetch

  // Aquí podrías redirigir a la otra página usando router.push('/otra-pagina')
};
</script>
