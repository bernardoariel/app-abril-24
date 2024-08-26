import { useQuery } from '@tanstack/vue-query';
import { abrilApiData } from '@/api/abrilApiData';
import { useMarcasStore } from '../store/useMarcasStore';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

interface MarcasResponse {
  CodMarca: number;
  Marca: string;
}
const fetchMarcas = async (): Promise<MarcasResponse[]> => {
  console.log('llamando api marcas');
  const { data } = await abrilApiData.get<MarcasResponse[]>('/prod-marca');
  return data;
};

export const useMarcas = () => {
  const store = useMarcasStore();
  const { marcas } = storeToRefs(store);

  const { isLoading, data } = useQuery({
    queryKey: ['marcas'],
    queryFn: () => fetchMarcas(),
    cacheTime: 1000 * 30, // 1 hora
    staleTime: 1000 * 30,
  });

  watch(data, (newMarcas) => {
    if (newMarcas) {
      store.setMarcas(newMarcas);
    }
  });

  return {
    isLoading,
    data,
    marcas,
  };
};
