import type { Producto } from '@/interfaces/products.interface';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore('useProductStore', () => {
  const productos = ref<Producto | Producto[]>([]);

  return {
    //* Props

    //* Getters

    //* Actions
    productos,
    setProducts(newProducts: Producto[]) {
      productos.value = newProducts;
    },
  };
});
