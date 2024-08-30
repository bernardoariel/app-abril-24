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
import { useProducts } from '@/modules/sqlserver/products/composable/useProducts';
import { useRouter } from 'vue-router';

const router = useRouter()

const {searchTerm, results, refetch, isLoading, } = useProducts()

const handleSearch = () => {
  searchTerm.value = searchTerm.value.trim();
  if (searchTerm.value) {
    refetch(); 
    
  }
};
</script>
