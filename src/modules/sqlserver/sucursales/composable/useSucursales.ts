import { abrilApiData } from '@/api/abrilApiData';
import { useQuery } from '@tanstack/vue-query';
import { useuseSucursalesStore } from '../store/useSucursalesStore';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import type { SucursalResponse } from '../interfaces/sucursal.interface';

const getSucursales = async (): Promise<SucursalResponse[]> => {
  const { data } = await abrilApiData.get<SucursalResponse[]>('/prod-sucursal');
  return data;
};

export const useSucursales = () => {
  const store = useuseSucursalesStore();

  const { sucursales } = storeToRefs(store); // []

  const { isLoading, data } = useQuery({
    queryKey: ['sucursales'],
    queryFn: () => getSucursales(),
    cacheTime: 1000 * 60 * 60, // 1 hora
    staleTime: 1000 * 30,
  });

  watch(data, (newSucursales) => {
    if (newSucursales) store.setSucursales(newSucursales);
  });

  const findSucursalById = (id: number): SucursalResponse | undefined => {
    return sucursales.value.find((sucursal) => sucursal.CodSucursal === id);
  };

  return {
    sucursales,
    isLoading,
    getSucursales,
    findSucursalById,
  };
};