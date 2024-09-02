<template>
  <div class="p-3 pb-16">
    <div v-if="!searchQuery && !isLoading" class="flex justify-center items-center p-10">
      <p>No has ingresado ninguna búsqueda.</p>
    </div>
    <ProductList v-if="productos && !isLoading" :productos="productos" />
    <div v-if="isLoading && !isError" class="flex justify-center items-center p-10">
      <LoaderComponent v-bind="ConfigLoader" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProducts } from '@/modules/sqlserver/products/composable/useProducts';
import ProductList from '@/modules/sqlserver/products/components/ProductList.vue';
import LoaderComponent from '@/common/components/LoaderComponent.vue';
interface AttrLoader {
  size: number;
  color: string;
}
const ConfigLoader: AttrLoader = {
  size: 80,
  color: '#000',
};
const { query } = useRoute();
const searchQuery = (query.search as string) || '';
const { productos, isLoading, isError } = useProducts({ term: searchQuery });
</script>
