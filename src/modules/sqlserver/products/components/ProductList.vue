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
      <div class="flex flex-col w-full">
        <div class="flex justify-between w-full">
          <h3 class="font-medium text-lg">{{ prod.Producto }}</h3>
          <h3 class="font-medium text-lg badge badge-ghost badge-outline mt-1">
            {{ prod.CodProducto }}
          </h3>
        </div>
        <p class="text-sm leading-none mt-1 text-center font-semibold">
          {{ prod.Descripcion }}
        </p>
        <div class="flex items-center justify-between">
          <!-- Imagen del producto -->
          <div class="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
            <img
              :src="prod.Imagen || imgDefault"
              alt="Imagen del producto"
              class="w-full h-auto object-cover rounded-md"
            />
          </div>

          <!-- Información del producto (al centro) -->
          <div class="flex flex-col text-center mx-4 space-y-2">
            <!-- Fila: Medida y Marca -->
            <div class="flex items-center justify-around space-x-4">
              <p class="text-lg leading-none">{{ prod.Medida }}</p>
              <p class="text-sm leading-none font-medium badge badge-neutral">
                {{ findMarcasById(prod.CodMarca)?.Marca }}
              </p>
            </div>

            <!-- Fila: Stock y Precio -->
            <div class="flex items-center justify-around space-x-5">
              <p class="text-2xl leading-none">{{ prod.Stock }} Unidades</p>
              <p class="text-2xl leading-none font-semibold">
                {{ formatPrice(prod.Precio) }}
              </p>
            </div>
          </div>

          <!-- Botón de acción (Ver Producto) -->
          <div class="flex-shrink-0">
            <router-link :to="`/product/${prod.CodProducto}`" class="absolute bottom-2 right-2">
              <button
                class="btn btn-accent w-16 h-auto px-0 py-2 text-white transition-colors duration-200 hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                Ver
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
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
