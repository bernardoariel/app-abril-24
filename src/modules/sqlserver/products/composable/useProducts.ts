import { useQuery } from '@tanstack/vue-query';
import { getProducts, getProductByMarcas } from '../services/actions';
import type { ProductsResponse } from '../interfaces/products.response';

interface Options {
  term: string;
  searchByMarcas?: boolean;
}

export const useProducts = ({ term, searchByMarcas = false }: Options) => {
  console.log('searchByMarcas in useProducts: ', searchByMarcas);
  const { isLoading, isError, error, data } = useQuery<ProductsResponse[]>({
    queryKey: ['producto', term, searchByMarcas ? 'marcas' : 'productos'],
    queryFn: () => (searchByMarcas ? getProductByMarcas({ term }) : getProducts({ term })),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    retry: false,
    onError: (err) => {
      console.error('Error in useProducts:', err);
    },
  });

  // Asegurando que 'productos' siempre sea un array
  const productos = data ?? [];

  return {
    productos,
    isLoading,
    isError,
    error,
  };
};
