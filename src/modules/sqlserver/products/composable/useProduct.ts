import { useQuery } from '@tanstack/vue-query';
import { getProductById } from '../services/actions';

interface Options {
  id: number;
}

export const useProduct = ({ id }: Options) => {
  const {
    isLoading,
    isError,
    error,
    data: producto,
    isFetching,
  } = useQuery({
    queryKey: ['producto', id],
    queryFn: () => getProductById(id),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 30,
  });
  return {
    error,
    isError,
    isFetching,
    isLoading,
    producto,
  };
};
