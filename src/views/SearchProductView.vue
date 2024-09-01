<template>
  <div class="w-full h-full">
    <div class="flex flex-col h-full justify-start items-center pt-40">
      <div class="flex items-center w-3/4 max-w-lg">
        <!-- Ajustado a 3/4 del ancho con un máximo de 32rem -->
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Ingrese un producto a buscar"
          class="input input-bordered flex-grow"
        />
        <button @click="handleSearch" class="btn btn-primary ml-2">Buscar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const searchTerm = ref('');

const handleSearch = async () => {
  const term = searchTerm.value.trim();
  if (!term) return;
  const isNumber = !isNaN(Number(term));

  if (isNumber) {
    // Redirige a la ruta del producto por ID
    router.replace(`/product/${term}`);
  } else {
    // Redirige a la ruta de la lista de productos
    router.replace({ name: 'productList', query: { search: term } });
  }
};
</script>
