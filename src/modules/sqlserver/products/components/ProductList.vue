<template>
  <div v-for="(prod, index) in productos" :key="prod.CodProducto">
    <router-link
      :to="`/product/${prod.CodProducto}`"
      :class="[
        'flex flex-col p-4 mb-2 shadow-md hover:shadow-lg rounded-2xl relative transition-transform duration-300 transform hover:-translate-y-1',
        index % 2 === 0 ? 'bg-white' : 'bg-gray-800 text-white',
      ]"
    >
      <div class="flex items-center justify-between">
        <div class="flex flex-col w-full">
          <!-- FILA 1 -->
          <div class="flex justify-between w-full mb-2">
            <h3 class="font-medium text-lg badge badge-ghost badge-outline mt-1">
              {{ prod.CodProducto }}
            </h3>

            <p class="mt-1 text-xs">
              {{ prod.Medida }}
            </p>

            <h3 class="text-sm leading-none font-medium badge badge-neutral">
              {{ findMarcasById(prod.CodMarca)?.Marca }}
            </h3>
          </div>
          <!-- FILA 2 -->
          <div class="flex justify-center w-full">
            <h3 class="font-medium text-lg text-center">{{ prod.Producto }}</h3>
          </div>
          <!-- FILA 3 -->
          <div class="block w-full mb-1">
            <h3 class="font-medium text-sm text-center">
              <small>{{ prod.Descripcion }}</small>
            </h3>
          </div>

          <div class="flex items-center justify-between">
            <!-- Imagen del producto -->
            <div class="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden mx-5">
              <img
                :src="prod.Imagen ? prod.Imagen.replace(/:8080/, '') : imgDefault"
                alt="Imagen del producto"
                class="w-full h-auto object-cover rounded-md"
              />
            </div>

            <!-- Información del producto (al lado derecho) -->
            <div class="flex flex-col h-full">
              <div class="flex items-start">
                <h3 class="text-sm leading-none">{{ prod.Stock }} Unidades</h3>
              </div>
              <div class="flex items-center">
                <h3 class="text-sm leading-none font-semibold">
                  Precio de Lista: {{ formatPrice(prod.Precio) }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { ProductsResponse } from '../interfaces/products.response';
import { formatPrice } from '../../../../common/helpers/formatPrice';
import { useMarcas } from '../../marcas/composable/useMarcas';

const props = defineProps<{ productos: ProductsResponse[] }>();
const { findMarcasById } = useMarcas();
const imgDefault = import.meta.env.VITE_BASE_URL + '/src/assets/img/No_Image_Available.jpg';
</script>
