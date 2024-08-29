import { ref, watch } from 'vue';
import { useProductStore } from '@/store/useProductStore';
import type { Producto } from '@/interfaces/products.interface';
import { abrilApiData } from '@/api/abrilApiData';
import { storeToRefs } from 'pinia';
import { useQuery, useQueryClient } from '@tanstack/vue-query';

const fetchProducts = async (product: string) => {
  const { data } = await abrilApiData.get<Producto[]>(`/productos/${product}`);
  return data
};

export function useProduct() {
  const store = useProductStore();
  const queryClient = useQueryClient();
  const { products } = storeToRefs(store)
  const productToSearch = ref<string>('')

  const { isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(productToSearch.value)
  })

  watch(data, (newProducts) => {
    if (newProducts) {
      store.setProducts(newProducts);
    }
  });

  const triggerSearch = async () => {
    if (productToSearch.value.trim()) {
      // Ejecuta la consulta manualmente
      queryClient.invalidateQueries({ 
        queryKey: ['products', productToSearch.value] 
      });
      const resp = await fetchProducts(productToSearch.value)
      store.setProducts(resp);
    }
  };

  const findProductById = (id: string): Producto | undefined => {
    return products.value.find((product) => product.CodProducto === id);
  };


  return {
    isLoading,
    productToSearch,
    triggerSearch,
    products,
    findProductById
  };
}
