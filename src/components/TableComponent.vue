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
              class="py-3 px-5 border-b text-left"
            >
              {{ column.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="border-b hover:bg-gray-100">
            <td class="py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
              <p class="text-default-800">{{ item.CodProducto }}</p>
            </td>
            <td class="py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
              <p
                class="text-default-800 cursor-pointer text-blue-500"
                @click="() => router.push(`/products/${item.id}`)"
              >
                {{ item.producto }}
              </p>
            </td>
            <td class="hidden md:table-cell py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
              <p class="text-default-800">{{ item.modelo }}</p>
            </td>
            <td class="hidden md:table-cell py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
              <p class="text-default-800">{{ item.fabricante }}</p>
            </td>
            <td class="py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
              <span class="text-default-400 text-sm">{{ item.description }}</span>
            </td>
            <td class="py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 sm:table-cell hidden">
              <div class="relative flex align-middle items-center gap-2">
                <h3
                  @click="() => router.push(`/products/${item.id}`)"
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
    <div class="flex items-center">
      <button
        class="px-4 py-2 border rounded"
        :class="{ hidden: page === 1 }"
        @click="() => setPage(page - 1)"
      >
        Previous
      </button>
      <span class="px-4 py-2">{{ page }}</span>
      <button
        class="px-4 py-2 border rounded"
        :class="{ hidden: page === pages }"
        @click="() => setPage(page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { columns, productsData } from './data.js'; // Asegúrate de importar correctamente los datos

const router = useRouter();
const filterValue = ref('');
const rowsPerPage = ref(10);
const page = ref(1);

const pages = computed(() => Math.ceil(productsData.length / rowsPerPage.value));
const hasSearchFilter = computed(() => Boolean(filterValue.value));

const filteredItems = computed(() => {
  let filteredProducts = [...productsData];

  if (hasSearchFilter.value) {
    filteredProducts = filteredProducts.filter((product) =>
      product.producto.toLowerCase().includes(filterValue.value.toLowerCase()),
    );
  }

  return filteredProducts;
});

const items = computed(() => {
  const start = (page.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredItems.value.slice(start, end);
});

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
  page.value = newPage;
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
