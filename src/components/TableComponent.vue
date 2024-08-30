<template>
  <div class="p-5 w-full">
    <div class="overflow-x-auto w-full">
      <table class="min-w-full bg-white border border-gray-200 w-full">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.uid"
              :class="getColumnClass(column.name)"
              class="py-3 px-5 border-b text-left text-xs"
            >
              {{ column.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="items && items.length === 0">
            <td colspan="100%" class="text-center py-4 text-gray-500">
              No se encontraron productos.
            </td>
          </tr>
          <tr v-for="item in items" :key="item.CodProducto" class="border-b hover:bg-gray-100">
            <td class="py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
              <p class="text-default-800">{{ item.CodProducto }}</p>
            </td>
            <td class="py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
              <p
                class="text-default-800 cursor-pointer text-blue-500"
                @click="() => router.push(`/products/${item.CodProducto}`)"
              >
                {{ item.Producto }}
              </p>
            </td>
            <td class="hidden md:table-cell py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
              <p class="text-default-800">{{ item.Medida }}</p>
            </td>
            <td class="hidden md:table-cell py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
              <p class="text-default-800">{{ findMarcasById(item.CodMarca)?.Marca }}</p>
            </td>
            <td class="py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
              <span class="text-default-400 text-sm">{{ item.Descripcion }}</span>
            </td>
            <td class="py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 sm:table-cell hidden">
              <div class="relative flex align-middle items-center gap-2">
                <h3
                  @click="() => router.push(`/products/${item.CodProducto}`)"
                  class="cursor-pointer text-blue-500"
                >
                  Ver Detalle
                </h3>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="items && items.length > 0" class="flex items-center justify-center mt-4">
      <button
        class="px-4 py-2 border rounded"
        :class="{ hidden: page === 1 }"
        @click="setPage(page - 1)"
      >
        Previous
      </button>
      <span class="px-4 py-2">{{ page }}</span>
      <button
        class="px-4 py-2 border rounded"
        :class="{ hidden: page === pages }"
        @click="setPage(page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts } from '@/modules/sqlserver/products/composable/useProducts';
import { useMarcas } from '@/modules/sqlserver/marcas/composable/useMarcas';
import { columns } from './data.js';
import type { Producto } from '@/interfaces/products.interface.js';

const router = useRouter();
const { results:products } = useProducts();
const { findMarcasById } = useMarcas();

const filterValue = ref('');
const rowsPerPage = ref(3);
const page = ref(1);

const pages = computed(() => Math.ceil(products.value.length / rowsPerPage.value));
const hasSearchFilter = computed(() => Boolean(filterValue.value));

const filteredItems = computed(() => {
  let filteredProducts = [...products.value];

  if (hasSearchFilter.value) {
    filteredProducts = filteredProducts.filter(
      (product) => product.Producto.toLowerCase() === filterValue.value.toLowerCase(),
    );
  }

  return filteredProducts;
});

const items = ref<Producto[]>();

const updateItems = () => {
  const start = (page.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  items.value = filteredItems.value.slice(start, end);
};

watch([page, filteredItems], updateItems, { immediate: true });

const getColumnClass = (columnName: string) => {
  switch (columnName) {
    case 'Modelo':
    case 'Fabricante':
      return 'hidden md:table-cell';
    case 'Acciones':
      return 'hidden sm:table-cell';

    default:
      return '';
  }
};

const setPage = (newPage: number) => {
  if (newPage >= 1 && newPage <= pages.value) {
    page.value = newPage;
  }
};
</script>
