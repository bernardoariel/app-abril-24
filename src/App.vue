<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavHeader from './components/NavHeader.vue';
import FooterComponent from './components/FooterComponent.vue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useSucursales } from '@/modules/sqlserver/sucursales/composable/useSucursales';
import { useMarcas } from '@/modules/sqlserver/marcas/composable/useMarcas';

const { sucursales } = useSucursales();
const { marcas } = useMarcas();
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <NavHeader />
    <div class="flex-grow">
      <div class="h-full">
        <RouterView />
      </div>
    </div>
    <FooterComponent />
  </div>
  <VueQueryDevtools />
</template>

<style scoped>
.flex-grow {
  width: 100%;
  height: calc(100vh - 128px);
}
</style>
