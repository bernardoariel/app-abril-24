<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-xs">
      <input
        type="text"
        placeholder="Ingrese un producto a buscar"
        class="input input-bordered w-full mb-4"
        v-model="productToSearch"
      />
      <button @click="() => fetchProduct(productToSearch)" class="btn btn-primary w-full">Buscar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/store/useProductStore';
import { ref } from 'vue';
const productToSearch = ref('')
const productStore = useProductStore();
const { fetchProduct } = productStore;

</script>
