import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Sucursal } from '../interfaces/sucursal.interface';

export const useuseSucursalesStore = defineStore('useSucursalesStore', () => {
  const sucursales = ref<Sucursal[]>([]);
  const totalSucursales = computed(() => sucursales.value.length);

  return {
    //* Props
    sucursales,

    //* Getters
    totalSucursales,

    //* Actions
    setSucursales(newSucursales: Sucursal[]) {
      sucursales.value = newSucursales;
    },
  };
});