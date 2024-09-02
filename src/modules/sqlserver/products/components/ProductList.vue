<template>
  <div
    v-for="(prod, index) in productos"
    :key="prod.CodProducto"
    :class="[
      'flex flex-col p-4 mb-2 shadow-md hover:shadow-lg rounded-2xl relative transition-transform duration-300 transform hover:-translate-y-1',
      index % 2 === 0 ? 'bg-white' : 'bg-gray-800 text-white',
    ]"
  >
    <div class="flex items-center justify-between">
      <div class="flex flex-col ml-3">
        <h3 class="font-medium leading-none">{{ prod.Producto }}</h3>
        <p class="text-sm leading-none mt-1">{{ prod.Descripcion }}</p>
        <p class="text-sm leading-none mt-1">{{ prod.Medida }}</p>
        <p class="text-sm leading-none mt-1">{{ prod.Stock }} Unidades</p>
        <p class="text-sm leading-none mt-1 font-semibold">{{ formatPrice(prod.Precio) }}</p>
      </div>
    </div>

    <router-link :to="`/product/${prod.CodProducto}`" class="absolute bottom-2 right-2">
      <button
        class="btn btn-accent px-3 py-1 text-white transition-colors duration-200 hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
      >
        Ver {{ prod.CodProducto }}
      </button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { ProductsResponse } from '../interfaces/products.response';
import { formatPrice } from '../../../../common/helpers/formatPrice';

const props = defineProps<{ productos: ProductsResponse[] }>();
</script>
