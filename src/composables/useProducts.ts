import { ref } from 'vue';
import { useProductStore } from '@/store/useProductStore';
import type { Producto } from '@/interfaces/products.interface';

export function useProduct() {
  const productToSearch = ref<string>('');
  const product = ref<Producto | null>(null);
  const productStore = useProductStore();
  const { fetchProducts, productDetails } = productStore;

  const triggerSearch = () => {
    fetchProducts(productToSearch.value);
  };

  const fetchProductDetails = async (productId: string) => {
    product.value = await productDetails(productId);
  };

  return {
    productToSearch,
    triggerSearch,
    product,
    fetchProductDetails
  };
}
