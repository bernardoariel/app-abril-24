<template>
  <div class="card lg:card-side bg-base-100 shadow-xl">
    <h1 class="text-center text-2xl mt-4 font-bold text-blue-950">{{ producto.CodProducto }}</h1>
    <figure>
      <img :src="producto.Imagen || imgDefault" class="product-image" />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-center">{{ producto.Producto }}</h2>
      <p class="text-center">{{ producto.Descripcion }}</p>
      <div class="card-actions justify-start text-center">
        <p>{{ producto.Medida }}</p>
        <p>{{ findMarcasById(producto.CodMarca)?.Marca }}</p>
      </div>

      <h2 class="text-center font-semibold bg-orange-500 text-white">
        {{ producto.Stock }} {{ producto.Stock === 1 ? ' Unidad' : 'Unidades' }}
      </h2>
      <small class="text-blue-950 text-center small-text font-semibold">{{ sucursalesInfo }}</small>
      <div class="card-actions justify-center">
        <h2 class="text-2xl mt-4 font-bold text-blue-950">
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
console.log('import.meta.env.VITE_BASE_URL::: ', import.meta.env.VITE_BASE_URL);

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
