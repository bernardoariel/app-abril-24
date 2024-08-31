import { useQueryClient } from '@tanstack/vue-query';
import { abrilApiData } from '@/api/abrilApiData';
import type { ProductsResponse } from '../interfaces/products.response';

export const fetchProducts = async (term: string): Promise<ProductsResponse[]> => {
  if (!term) return [];
  const { data } = await abrilApiData.get<ProductsResponse[]>(`/productos/${term}`);
  return data;
};

export const useProductPrefetch = () => {
  const queryClient = useQueryClient();

  const prefetch = async (term: string) => {
    await queryClient.prefetchQuery(['products', term], () => fetchProducts(term), {
      staleTime: 1000 * 60 * 60, // 1 hora
    });
  };

  return { prefetch };
};
