<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useQuery } from '@tanstack/vue-query';

import { ref } from 'vue';

import type { Producto } from './interfaces/products.interface';
import { abrilApiData } from '@/modules/api/abrilApiData';

const searchTerm = ref('');

const searchProducto = async (): Promise<Producto | null> => {
  try {
    const response = await abrilApiData.get<Producto[]>('/productos/search', {
      params: {
        CodProducto: searchTerm.value,
      },
    });
    if (response.data.length > 0) {
      return response.data[0]; // Return the first item if the array is not empty
    } else {
      return null; // Return null when no items are found
    }
  } catch (error) {
    console.error('Error searching productos:', error);
    return null;
  }
};
const {
  isLoading,
  isError,
  data: producto,
  error,
  refetch,
} = useQuery({
  queryKey: ['producto', searchTerm],
  queryFn: searchProducto,
  enabled: false, // Initially disable the query to fetch manually
});

// Watch searchTerm to refetch data when it changes
</script>

<template>
  <div>
    <input v-model="searchTerm" placeholder="Buscar producto" />
    <button @click="refetch">Buscar</button>
  </div>
  <h1 class="text-xl1">Producto</h1>
  <div v-if="producto">
    <h1 class="text-xl1">{{ producto.Producto }}</h1>
    <h1 class="text-xl1">{{ producto.Medida }}</h1>
    <h1 class="text-xl1">{{ producto.Fabricante }}</h1>
    <h1 class="text-xl1">{{ producto.Costo1 }}</h1>
    <h1 class="text-xl1">{{ producto.Costo2 }}</h1>
    <!-- Mostrar Imagen -->
    <img v-if="producto.imagenes?.length" :src="producto.imagenes[0].URL" alt="Producto Imagen" />
  </div>
  <div v-if="isLoading">Cargando...</div>
  <div v-if="isError">Error: {{ error.message }}</div>
  <div class="flex flex-col min-h-screen">
    <FooterComponent />
  </div>
  <VueQueryDevtools />
</template>

<style scoped></style>
