<template>
  <div class="p-3 pb-16">
    <ProductList v-if="productos && !isLoading" :productos="productos" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProducts } from '@/modules/sqlserver/products/composable/useProducts';
import ProductList from '@/modules/sqlserver/products/components/ProductList.vue';

const { query } = useRoute();
const searchQuery = (query.search as string) || '';
const { productos, isLoading } = useProducts({ term: searchQuery });
</script>
