<template>
  <div class="md:flex-shrink-0 flex items-center justify-center">
    <img
      class="h-48 object-contain md:h-full md:w-48 w-full"
      :src="producto.Imagen || ''"
      alt="Product image"
    />
  </div>
  <div class="p-8">
    <h2 class="text-2xl font-bold text-gray-900">{{ producto.Producto }}</h2>
    <p class="mt-2 text-gray-600">{{ producto.Medida }}</p>
    <p class="mt-2 text-gray-600">{{ producto.Descripcion }}</p>
    <div class="mt-4">
      <span class="text-gray-600 font-semibold">Precio: </span>
      <span class="text-gray-900">${{ producto.Precio }}</span>
    </div>
    <div class="mt-2">
      <span class="text-gray-600 font-semibold">Stock: </span>
      <span
        :class="{ 'text-green-500': +producto.Stock! > 0, 'text-red-500': +producto.Stock! <= 0 }"
      >
        {{ producto.Stock! > 0 ? `${producto.Stock} disponibles` : 'Agotado' }}
      </span>
    </div>
    <div v-if="producto.Sucursales && producto.Sucursales.length">
      <span class="text-gray-600 font-semibold">Sucursales:</span>
      <ul>
        <!-- <li v-for="(sucursal, index) in producto.Sucursales" :key="index">
              {{ findSucursalById(sucursal.CodSucursal).NombreSuc }} : {{ sucursal.Cantidad }}
        </li>  -->
      </ul>
    </div>
    <div v-else class="text-center">
      <p class="text-gray-600">Producto no encontrado.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductsResponse } from '../interfaces/products.response';

const producto = defineProps<ProductsResponse>();
</script>

<style scoped></style>
