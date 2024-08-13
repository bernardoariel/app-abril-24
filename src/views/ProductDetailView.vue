<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4 text-center">Detalle del Producto</h1>
    <div v-if="product" class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img
            class="h-48 object-cover md:h-full md:w-48 w-full justify-center align-middle flex"
            :src="product.imagenes[0].URL"
            alt="Product image"
          />
        </div>
        <div class="p-8">
          <h2 class="text-2xl font-bold text-gray-900">{{ product.CodNombre }}</h2>
          <p class="mt-2 text-gray-600">{{ product.Descripcion }}</p>
          <div class="mt-4">
            <span class="text-gray-600 font-semibold">Precio: </span>
            <span class="text-gray-900">${{ product.Costo2 }}</span>
          </div>
          <div class="mt-2">
            <span class="text-gray-600 font-semibold">Stock: </span>
            <span
              :class="{ 'text-green-500': +product.Stock! > 0, 'text-red-500': +product.Stock! <= 0 }"
              >{{ +product.Stock! > 0 ? `${product.Stock} disponibles` : 'Agotado' }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <p class="text-gray-600">Producto no encontrado.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/useProductStore';
import type { Producto } from '@/interfaces/products.interface';

const route = useRoute();
const productStore = useProductStore();

const product = ref<Producto>();

onMounted(() => {
  const productId = route.params.id;
  product.value = productStore.products.find((p) => p.id === productId) || null;
});
</script>
