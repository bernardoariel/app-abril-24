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
import { useRouter } from 'vue-router';

const router = useRouter();

const searchTerm = ref('');

const handleSearch = async () => {
  if (!searchTerm.value) return;

  router.replace(`/product/${searchTerm.value}`);
};
</script>
