<template>
  <div class="flex items-center justify-center p-4 bg-orange-300 h-16">
    <button v-if="showBackButton" @click="goBack" class="btn btn-ghost mr-4">Volver</button>
    <h1 class="text-xl font-bold text-center flex-grow">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const showBackButton = computed(() => {
  return !['login', 'searchProduct'].includes(route.name as string);
});
const title = computed(() => {
  return route.meta.title || 'Default Title';
});
const goBack = () => {
  const previousRoute = localStorage.getItem('previousRoute');
  if (previousRoute) {
    const { name, query } = JSON.parse(previousRoute);
    router.replace({ name, query });
  } else {
    router.replace({ name: 'searchProduct' }); // fallback a 'searchProduct' si no hay ruta anterior
  }
};
</script>
