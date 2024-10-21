<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavHeader from './components/NavHeader.vue';
import FooterComponent from './components/FooterComponent.vue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<template>
  <div class="app-container bg-gray-100 min-h-screen flex flex-col">
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
.app-container {
  max-width: 100%; /* Asegura que el contenedor no supere el 100% del ancho de la pantalla */
  overflow-x: hidden; /* Previene el desbordamiento horizontal */
  padding: 0; /* Evita márgenes innecesarios que puedan causar desbordamiento */
  margin: 0 auto; /* Centra el contenedor */
}

.flex-grow {
  width: 100%;
  height: calc(100vh - 128px); /* Asegura que la altura se calcule correctamente */
}

h1 {
  text-align: center; /* Ejemplo de estilo adicional */
}
</style>
