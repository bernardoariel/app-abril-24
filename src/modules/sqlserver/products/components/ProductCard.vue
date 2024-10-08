<template>
  <div class="card bg-base-100 shadow-xl p-4 lg:flex lg:flex-row lg:items-center mb-16">
    <figure class="lg:w-1/2 flex justify-center">
      <img
        :src="producto.Imagen || imgDefault"
        alt="Product Image"
        class="w-full h-auto max-h-[300px] object-contain"
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
      <small class="text-blue-950 text-center small-text font-semibold">
        {{ sucursalesInfo }}
      </small>
      <div class="card-actions justify-center">
        <h2 class="text-3xl mt-4 font-bold text-blue-950">
          {{ formatPrice(producto.Precio) }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductsResponse } from '../interfaces/products.response';
import { useSucursales } from '../../sucursales/composable/useSucursales';
import { useMarcas } from '../../marcas/composable/useMarcas';
import { formatPrice } from '../../../../common/helpers/formatPrice';

const { findSucursalById } = useSucursales();
const { findMarcasById } = useMarcas();
const producto = defineProps<ProductsResponse>();
const imgDefault = import.meta.env.VITE_BASE_URL + '/src/assets/img/No_Image_Available.jpg';

const sucursalesInfo = producto.Sucursales.map((sucursal) => {
  const nombreSuc = findSucursalById(sucursal.CodSucursal)?.NombreSuc || 'Sucursal desconocida';
  return `${nombreSuc} (${sucursal.Cantidad})`;
}).join(', ');
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
