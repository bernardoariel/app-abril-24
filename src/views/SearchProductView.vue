<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-xs relative">
      <input
        type="text"
        placeholder="Ingrese un producto a buscar"
        class="input input-bordered w-full mb-1"
        v-model="productToSearch"
        @input="debouncedFilterOptions"
        @keydown.down.prevent="navigateOptions('down')"
        @keydown.up.prevent="navigateOptions('up')"
        @keydown.enter.prevent="selectActiveOption"
      />
      <ul
        v-if="filteredOptions.length > 0"
        class="absolute left-0 w-full bg-white border border-gray-300 z-10"
      >
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          @click="selectOption(option)"
          :class="{ 'bg-gray-200': index === activeIndex }"
          class="px-4 py-2 cursor-pointer hover:bg-gray-200"
        >
          {{ option }}
        </li>
      </ul>
      <button @click="searchProduct" class="btn btn-primary w-full mt-4">Buscar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/store/useProductStore';
import { ref } from 'vue';

const productToSearch = ref('');
const productStore = useProductStore();
const { fetchProducts } = productStore;

const options = ref<string[]>(['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4', 'Producto 5']);
const filteredOptions = ref<string[]>([]);
const activeIndex = ref(-1);
let debounceTimeout: ReturnType<typeof setTimeout> | undefined;

const filterOptions = () => {
  if (productToSearch.value.length >= 3) {
    filteredOptions.value = options.value
      .filter((option) => option.toLowerCase().includes(productToSearch.value.toLowerCase()))
      .slice(0, 3); 
    activeIndex.value = -1; 
  } else {
    filteredOptions.value = [];
  }
};

const debouncedFilterOptions = () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(() => {
    filterOptions();
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

const selectOption = (option: string) => {
  productToSearch.value = option;
  filteredOptions.value = [];
  activeIndex.value = -1; // Reiniciar el índice activo después de seleccionar una opción
};

const searchProduct = () => {
  fetchProducts(productToSearch.value);
};

</script>
