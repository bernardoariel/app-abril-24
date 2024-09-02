<template>
  <div
    v-for="(prod, index) in productos"
    :key="prod.CodProducto"
    :class="[
      'flex flex-col p-4 mb-2 shadow-md hover:shadow-lg rounded-2xl relative',
      index % 2 === 0 ? 'bg-white' : 'bg-gray-800',
    ]"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="flex flex-col ml-3">
          <div
            class="font-medium leading-none"
            :class="index % 2 !== 0 ? 'text-white' : 'text-black'"
          >
            {{ prod.Producto }}
          </div>
          <p
            class="text-sm leading-none mt-1"
            :class="index % 2 !== 0 ? 'text-white' : 'text-gray-600'"
          >
            {{ prod.Descripcion }}
          </p>
          <p
            class="text-sm leading-none mt-1"
            :class="index % 2 !== 0 ? 'text-white' : 'text-gray-600'"
          >
            {{ prod.Medida }}
          </p>
          <p
            class="text-sm leading-none mt-1"
            :class="index % 2 !== 0 ? 'text-white' : 'text-gray-600'"
          >
            {{ prod.Stock }}
          </p>
          <p
            class="text-sm leading-none mt-1 font-semibold"
            :class="index % 2 !== 0 ? 'text-white' : 'text-gray-600'"
          >
            {{ formatPrice(prod.Precio) }}
          </p>
        </div>
      </div>
    </div>

    <router-link :to="`/product/${prod.CodProducto}`">
      <button class="absolute bottom-2 right-2 btn btn-accent px-3 py-1 text-white">
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
