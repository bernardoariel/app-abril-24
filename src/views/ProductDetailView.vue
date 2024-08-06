<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4 text-center">Detalle del Producto</h1>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <router-link to="/products" class="btn btn-secondary">Volver al Listado</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const product = ref({ id: '', name: '', description: '' });

onMounted(() => {
  const productId = route.params.id;
  product.value = {
    id: productId,
    name: `Producto ${productId}`,
    description: `Descripción del producto ${productId}`,
  };
});
</script>
