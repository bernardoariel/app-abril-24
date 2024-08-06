<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4 text-center">Detalle del Producto</h1>
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img
            class="h-48 object-cover md:h-full md:w-48 w-full justify-center align-middle flex"
            src="../assets/img/phone-screen-with-abstract-marble-aesthetic.jpg"
            alt="Product image"
          />
        </div>
        <div class="p-8">
          <h2 class="text-2xl font-bold text-gray-900">{{ product.name }}</h2>
          <p class="mt-2 text-gray-600">{{ product.description }}</p>
          <div class="mt-4">
            <span class="text-gray-600 font-semibold">Precio: </span>
            <span class="text-gray-900">${{ product.price }}</span>
          </div>
          <div class="mt-2">
            <span class="text-gray-600 font-semibold">Stock: </span>
            <span
              :class="{ 'text-green-500': product.stock > 0, 'text-red-500': product.stock <= 0 }"
              >{{ product.stock > 0 ? `${product.stock} disponibles` : 'Agotado' }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const product = ref({ id: '', name: '', description: '', price: '', stock: '', img: '' });

onMounted(() => {
  const productId = route.params.id;
  product.value = {
    id: productId,
    name: `Producto ${productId}`,
    description: `Descripción del producto ${productId}`,
    price: 29.99,
    stock: 10,
    img: '../',
  };
});
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
