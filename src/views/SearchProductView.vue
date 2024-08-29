<template>
  <div class="w-full h-full">
    <div class="flex flex-col h-full justify-start items-center pt-40">
      <input type="text" placeholder="Ingrese un producto a buscar" class="input input-bordered w-1/2 mb-4"
        v-model="productToSearch" @keyup.enter="() => handleSearch()" />
      <button @click="() => handleSearch()" class="btn btn-primary w-1/2">Buscar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProduct } from '@/composables/useProducts';
import { useRouter } from 'vue-router';

const { productToSearch, triggerSearch, isFetching } = useProduct();
const router = useRouter();
console.log(isFetching.value)

const handleSearch = async() => {
  await triggerSearch()
  router.push({ name: 'productList' });
}
</script>
