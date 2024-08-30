<template>
  <div class="w-full h-full">
    <div class="flex flex-col h-full justify-start items-center pt-40">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Ingrese un producto a buscar"
        class="input input-bordered w-1/2 mb-4"
        ref="inputSearch"
      />
      <button @click="handleSearch" class="btn btn-primary w-1/2">Buscar</button>
      <div v-if="isLoading" class="mt-4">Cargando productos...</div>
      <div v-if="results.length" class="mt-4">
        <ul>
          <li v-for="product in results" :key="product.CodProducto">
            {{ product.Producto }}
          </li>
        </ul>
      </div>
      <div v-else-if="!isLoading && results.length === 0 && searchTerm" class="mt-4">
        No se encontraron productos.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ProductsResponse } from '../modules/sqlserver/products/interfaces/products.response';
import { abrilApiData } from '@/api/abrilApiData';
import { useQuery } from '@tanstack/vue-query';

const searchTerm = ref('');
const results = ref<ProductsResponse[]>([]);

const fetchProducts = async (term: string | number): Promise<ProductsResponse[]> => {
  if (!term) return [];
  const { data } = await abrilApiData.get<ProductsResponse[]>(`/productos/${term}`);
  return data;
};

const { isLoading, data, refetch } = useQuery({
  queryKey: ['products', searchTerm],
  queryFn: () => fetchProducts(searchTerm.value),
  staleTime: 1000 * 60 * 60, // 1 hora
  enabled: false, // Evita la ejecución automática de la consulta
});

watch(data, (newData) => {
  if (!newData) return;
  if (newData) {
    results.value = newData;
  }
});

const handleSearch = () => {
  searchTerm.value = searchTerm.value.trim();
  if (searchTerm.value) {
    refetch(); // Refresca la consulta con el nuevo término
  }
};
</script>
