<template>
  <div class="w-full h-full">
    <div class="flex flex-col h-full justify-start items-center pt-40">
      <input
        type="text"
        placeholder="Ingrese un producto a buscar"
        class="input input-bordered w-1/2 mb-4"
        v-model="productToSearch"
        @keyup.enter="triggerSearch"
      />
      <button @click="triggerSearch" class="btn btn-primary w-1/2">Buscar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProduct } from '@/composables/useProducts';
import { useSucursales } from '../modules/sqlserver/sucursales/composables/useSucursales';
import { useMarcas } from '../modules/sqlserver/marcas/composable/useMarcas';
const { productToSearch, triggerSearch } = useProduct();
// const { sucursales, isLoading } = useSucursales();
</script>
