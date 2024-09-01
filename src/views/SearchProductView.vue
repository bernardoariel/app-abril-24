<template>
  <div class="w-full h-full">
    <div class="flex flex-col h-full justify-start items-center pt-40">
      <div class="flex items-center w-3/4 max-w-lg">
        <!-- Ajustado a 3/4 del ancho con un máximo de 32rem -->
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Ingrese un producto a buscar"
          class="input input-bordered flex-grow"
          @input="debouncedFilterOptions"
          @keydown.down.prevent="navigateOptions('down')"
          @keydown.up.prevent="navigateOptions('up')"
          @keydown.enter.prevent="selectActiveOption"
        />
        <button @click="handleSearch" class="btn btn-primary ml-2">Buscar</button>
        <ul
          v-if="filteredOptions.length > 0"
          class="absolute left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-48 overflow-y-auto z-10"
        >
          <li
            v-for="(option, index) in filteredOptions"
            :key="option.CodProducto"
            @click="selectOption(option)"
            :class="{ 'bg-gray-200': index === activeIndex }"
            class="px-4 py-2 cursor-pointer hover:bg-gray-200"
          >
            {{ option.Producto }} - {{ option.Descripcion }} ({{ option.CodProducto }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getProducts } from '@/modules/sqlserver/products/services/actions';

const router = useRouter();
const searchTerm = ref('');
const filteredOptions = ref([]); // Aquí se guardarán las opciones filtradas
const activeIndex = ref(-1); // Índice para la navegación
let debounceTimeout: ReturnType<typeof setTimeout> | undefined;

const fetchProducts = async (term: string) => {
  try {
    const results = await getProducts({ term });
    console.log('results::: ', results);
    filteredOptions.value = results.slice(0, 5); // Limita a las primeras 5 opciones
    activeIndex.value = -1;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const debouncedFilterOptions = () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(() => {
    if (searchTerm.value.length >= 3) {
      fetchProducts(searchTerm.value);
    } else {
      filteredOptions.value = [];
    }
  }, 500);
};

const navigateOptions = (direction: 'up' | 'down') => {
  if (direction === 'down') {
    if (activeIndex.value < filteredOptions.value.length - 1) {
      activeIndex.value++;
    }
  } else if (direction === 'up') {
    if (activeIndex.value > 0) {
      activeIndex.value--;
    }
  }
};

const selectActiveOption = () => {
  if (activeIndex.value >= 0 && activeIndex.value < filteredOptions.value.length) {
    selectOption(filteredOptions.value[activeIndex.value]);
  }
};

const selectOption = (option: any) => {
  searchTerm.value = option.Producto;
  filteredOptions.value = [];
  activeIndex.value = -1;
  console.log('Option selected:', option);

  // Redirigir a la ruta con CodProducto
  router.replace(`/product/${option.CodProducto}`);
};

const handleSearch = async () => {
  const term = searchTerm.value.trim();
  if (!term) return;
  const isNumber = !isNaN(Number(term));

  if (isNumber) {
    // Redirige a la ruta del producto por ID
    router.replace(`/product/${term}`);
  } else {
    // Redirige a la ruta de la lista de productos
    router.replace({ name: 'productList', query: { search: term } });
  }
};

// Simulación para probar la búsqueda automática
setTimeout(() => {
  searchTerm.value = 'hela';
  debouncedFilterOptions();
}, 500);
</script>
