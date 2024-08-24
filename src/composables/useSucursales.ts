import { ref } from 'vue';
import { useSucursalesStore } from '@/store/useSucursalesStore';
import type { Sucursales } from '@/interfaces/sucursales.interface';

export function useProduct() {
  const { fetchAllSucursales, sucursales} = useSucursalesStore();

  const fetchSucursales = () => {
    fetchAllSucursales();
  };
  return {
    fetchSucursales,
    sucursales
  };
}
