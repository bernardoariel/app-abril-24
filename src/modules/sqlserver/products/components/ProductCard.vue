<template>
  <div class="card bg-orange-300 shadow-xl p-4 lg:flex lg:flex-row lg:items-center mb-16">
    <figure class="lg:w-1/2 flex justify-center">
      <img
        v-if="producto.Imagen"
        :src="producto.Imagen ? producto.Imagen.replace(/:8080/, '') : imgDefault"
        alt="Product Image"
        class="w-full h-auto max-h-[300px] object-contain cursor-pointer"
        @click="openModal"
      />
    </figure>
    <div class="card-body lg:w-1/2 lg:pl-8">
      <h1 class="text-center text-2xl font-bold text-blue-950">{{ producto.CodProducto }}</h1>
      <h2 class="card-title text-center mt-2">{{ producto.Producto }}</h2>
      <p class="text-center">{{ producto.Descripcion }}</p>
      <div class="flex flex-col items-center">
        <p>{{ producto.Medida }}</p>
        <p>{{ findMarcasById(producto.CodMarca)?.Marca }}</p>
      </div>
      <h2 class="text-center font-semibold bg-orange-500 text-white my-2 px-4 py-2 rounded-lg">
        {{ producto.Stock }} {{ producto.Stock === 1 ? ' Unidad' : ' Unidades' }}
      </h2>
      <h2 class="text-blue-950 text-center font-semibold">
        {{ sucursalesInfo }}
      </h2>
      <div class="card-actions justify-center">
        <h2 class="text-3xl mt-4 font-bold text-blue-950">
          {{ formatPrice(producto.Precio) }}
        </h2>
      </div>
    </div>
    <div
      v-if="showModal"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50"
      @click="closeModal"
    >
      <img
        :src="producto.Imagen.replace(/:8080/, '')"
        alt="Product Image"
        class="max-w-[90%] max-h-[90%] object-contain"
        @click.stop
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductsResponse } from '../interfaces/products.response';
import { useSucursales } from '../../sucursales/composable/useSucursales';
import { useMarcas } from '../../marcas/composable/useMarcas';
import { formatPrice } from '../../../../common/helpers/formatPrice';
import { ref } from 'vue';

const { findSucursalById } = useSucursales();
const { findMarcasById } = useMarcas();
const producto = defineProps<ProductsResponse>();
const imgDefault = import.meta.env.VITE_BASE_URL.includes('localhost')
  ? import.meta.env.VITE_BASE_URL + 'src/assets/img/No_Image_Available.jpg'
  : 'https://abril.arielbernardo.com/assets/No_Image_Available.jpg';

const sucursalesInfo = producto.Sucursales.map((sucursal) => {
  const nombreSuc = findSucursalById(sucursal.CodSucursal)?.NombreSuc || 'Sucursal desconocida';
  return `${nombreSuc} (${sucursal.Cantidad})`;
}).join(', ');

const showModal = ref(false);

// Funciones para abrir y cerrar modal
const openModal = () => {
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
.small-text {
  font-size: 0.6rem;
}
.product-image {
  width: 100%;
  height: auto;
  max-width: 300px; /* Puedes ajustar este valor para limitar el tamaño máximo */
  object-fit: contain; /* Asegura que la imagen se ajuste bien dentro del contenedor */
}
</style>
