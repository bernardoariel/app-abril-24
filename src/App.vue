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

  <div>{{ marcas }}</div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

import NavHeader from './components/NavHeader.vue';
import FooterComponent from './components/FooterComponent.vue';
import { useMarcas } from './modules/sqlserver/marcas/composable/useMarcas';

// const { sucursales, isLoading } = useSucursales();
const { data: marcas } = useMarcas();
</script>

<style scoped>
.flex-grow {
  width: 100%;
  height: calc(100vh - 128px);
}
</style>
