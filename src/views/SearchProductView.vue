<template>
  <div class="w-full h-full">
    <!-- Cambié de w-28 a w-full -->
    <div class="flex flex-col h-full justify-start items-center pt-40">
      <div class="relative w-3/4 max-w-lg">
        <div class="flex items-center">
          <!-- Contenedor del input y loader -->
          <label class="input input-bordered flex items-center gap-2 grow h-12 relative">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Ingrese un producto a buscar"
              class="grow outline-none h-full pr-10"
              @input="debouncedFilterOptions"
              @keydown.down.prevent="navigateOptions('down')"
              @keydown.up.prevent="navigateOptions('up')"
              @keydown.enter.prevent="selectActiveOption"
              style="min-width: 0"
            />
            <div
              v-if="isLoading"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-full w-full opacity-70 animate-spin"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                ></circle>
                <path d="M8 2a6 6 0 0 1 6 6H8V2z" fill="currentColor"></path>
              </svg>
            </div>
          </label>
          <button @click="handleSearch" class="btn btn-primary ml-2 h-12">Buscar</button>
        </div>
        <!-- Lista de sugerencias -->
        <ul
          v-if="filteredOptions.length > 0"
          class="absolute left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-48 overflow-y-auto z-20"
          style="top: 100%"
        >
          <li
            v-for="(option, index) in filteredOptions"
            :key="option.CodProducto"
            @click="selectOption(option)"
            :class="{ 'bg-gray-200': index === activeIndex }"
            class="px-4 py-2 cursor-pointer hover:bg-gray-200"
          >
            {{ option.Producto }} - ({{ option.CodProducto }}) -
            <span class="font-semibold">{{ formatPrice(option.Precio) }} </span>
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
import { formatPrice } from '../common/helpers/formatPrice';

const router = useRouter();
const searchTerm = ref('');
const filteredOptions = ref([]); // Aquí se guardarán las opciones filtradas
const activeIndex = ref(-1); // Índice para la navegación
const isLoading = ref(false); // Indicador de carga
let debounceTimeout: ReturnType<typeof setTimeout> | undefined;

const fetchProducts = async (term: string) => {
  try {
    isLoading.value = true;
    const results = await getProducts({ term });
    filteredOptions.value = results.slice(0, 5); // Limita a las primeras 5 opciones
    activeIndex.value = -1;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
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
  }, 500); // Espera de 500ms después de que el usuario deja de escribir
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
  router.replace(`/product/${option.CodProducto}`);
};

const handleSearch = async () => {
  const term = searchTerm.value.trim();
  if (!term) return;
  const isNumber = !isNaN(Number(term));

  if (isNumber) {
    router.replace(`/product/${term}`);
  } else {
    router.replace({ name: 'productList', query: { search: term } });
  }
};
</script>
