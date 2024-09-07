import { useQuery } from '@tanstack/vue-query';
import { getProducts } from '../services/actions';
import type { ProductsResponse } from '../interfaces/products.response';

interface Options {
  term: string;
}

export const useProducts = ({ term }: Options) => {
  const { isLoading, isError, data } = useQuery<ProductsResponse[]>({
    queryKey: ['producto', term],
    queryFn: () => getProducts({ term }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    retry: false,
  });

  // Asegurando que 'productos' siempre sea un array
  const productos = data ?? [];

  return {
    productos,
    isLoading,
    isError,
  };
};
