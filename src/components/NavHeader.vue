<template>
  <div class="flex items-center justify-center p-4 bg-orangeCustom3 h-16">
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
  const productListQuery = localStorage.getItem('productListQuery');

  if (previousRoute) {
    const { name } = JSON.parse(previousRoute);

    if (name === 'productList' && productListQuery) {
      const parsedQuery = JSON.parse(productListQuery);
      router.replace({ name, query: parsedQuery });
    } else {
      // Si no, volvemos a la ruta anterior sin `query`
      router.replace({ name });
    }
  } else {
    router.replace({ name: 'searchProduct' });
  }
};
</script>
