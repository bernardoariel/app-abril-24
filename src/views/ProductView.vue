<template>
  <div class="container mx-auto p-2">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <ProductCard v-if="!isLoading" v-bind="producto" />
      <LoaderComponent v-if="isLoading" v-bind="ConfigLoader" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import ProductCard from '@/modules/sqlserver/products/components/ProductCard.vue';
import { useProduct } from '@/modules/sqlserver/products/composable/useProduct';
import LoaderComponent from '@/common/components/LoaderComponent.vue';

const { params } = useRoute();

interface AttrLoader {
  size: number;
  color: string;
}
const ConfigLoader: AttrLoader = {
  size: 80,
  color: '#000',
};

const sizeLoading: number = 50;
const { producto, isLoading } = useProduct({ id: +params.id });
</script>
