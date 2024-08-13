<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-xs">
      <input
        type="text"
        placeholder="Ingrese un producto a buscar"
        class="input input-bordered w-full mb-4"
        v-model="product"
      />
      <button @click="searchProduct" class="btn btn-primary w-full">Buscar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/store/useProductStore';

const productStore = useProductStore();

const { product, searchProduct } = productStore;
</script>
