<template>
  <div class="w-full h-full bg-orange-200">
    <div class="flex flex-col h-full justify-start items-center pt-10">
      <div class="relative w-full max-w-lg px-4">
        <!-- Ajusté los márgenes y los anchos -->
        <div class="flex items-center w-full bg-orange-200">
          <!-- Contenedor del input y loader -->
          <label
            class="input input-bordered flex items-center gap-2 grow h-12 relative w-full text-orange-900 bg-orange-300"
          >
            <input
              ref="searchInput"
              v-model="searchTerm"
              type="text"
              placeholder="Buscar"
              class="grow outline-none h-full pr-10 w-full"
              @keydown.down.prevent="handleKeyDown"
              @keydown.up.prevent="handleKeyUp"
              @keydown.enter.prevent="selectProduct"
            />
          </label>
        </div>

        <!-- Dropdown de resultados -->
        <p v-if="isLoading" class="text-orange-600 text-center mt-2">Cargando productos</p>
        <ul
          v-else-if="filteredProducts.length > 0"
          class="menu dropdown-content bg-base-100 rounded-box z-[1] w-100 p-2 shadow"
        >
          <li
            v-for="producto in filteredProducts"
            :key="producto.CodProducto"
            @click="handleProductClick(producto.CodProducto)"
          >
            <a>{{ producto.Producto }} - {{ producto.CodProducto }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useSucursales } from '../modules/sqlserver/sucursales/composable/useSucursales';
import { useFormaPago } from '../modules/sqlserver/forma-pago/composable/useFormaPago';
import { useMarcas } from '../modules/sqlserver/marcas/composable/useMarcas';
import { useProducts } from '../modules/sqlserver/products/composable/useProducts';

const { sucursales } = useSucursales();
const { tarjetas } = useFormaPago();
const { findMarcasById, marcas } = useMarcas();
const { productos, isLoading } = useProducts();

const router = useRouter();
const searchTerm = ref('');
// Índice para rastrear la opción seleccionada
const selectedIndex = ref(-1);
const filteredProducts = computed(() => {
  console.log('Término de búsqueda:', searchTerm.value);
  if (searchTerm.value.length >= 3) {
    const searchTerms = searchTerm.value.toLowerCase().split(' ');
    return productos.value.filter((producto) => {
      // Verifica si cada término de búsqueda coincide con el nombre o el código del producto
      return searchTerms.every(
        (term) =>
          producto.Producto?.toLowerCase().includes(term) ||
          producto.Descripcion?.toLowerCase().includes(term) ||
          producto.CodProducto.toString().includes(term),
      );
    });
  }
  return [];
});

const handleProductClick = (codProducto: number) => {
  console.log('Producto seleccionado:', codProducto);
  // Ejemplo: redirigir a una página de detalles del producto
  router.replace(`/product/${codProducto}`);
};

// Manejar las teclas "Down" (Abajo)
const handleKeyDown = () => {
  if (selectedIndex.value < filteredProducts.value.length - 1) {
    selectedIndex.value++;
  }
};

// Manejar las teclas "Up" (Arriba)
const handleKeyUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--;
  }
};

// Seleccionar producto con "Enter"
const selectProduct = () => {
  if (selectedIndex.value >= 0 && selectedIndex.value < filteredProducts.value.length) {
    handleProductClick(filteredProducts.value[selectedIndex.value].CodProducto);
  }
};
</script>

<style scoped>
.highlight {
  background-color: #ffff00; /* Un amarillo claro para resaltar */
  color: #000; /* Cambia el color del texto a negro */
  font-weight: bold; /* Mantén el texto en negrita */
  padding: 0 2px; /* Un pequeño relleno alrededor del texto resaltado */
  border-radius: 3px; /* Bordes ligeramente redondeados */
}
input::placeholder {
  color: #ffa07a; /* Color para el texto del placeholder */
  opacity: 1; /* Ajusta la opacidad si es necesario */
}
</style>
