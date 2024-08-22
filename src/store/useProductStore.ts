import type { Producto } from '@/interfaces/products.interface';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useProductStore = defineStore('product', () => {
    const products = ref<any[]>([]);
    const details = ref<Producto>()
    const isLoading = ref(false);
    const isError = ref(false);
    const error = ref<Error | null>(null);
    const router = useRouter();

    const fetchProducts = async (product:string) => {
        isLoading.value = true;
        isError.value = false;
        error.value = null;

        try {
            const response = await fetch(`http://localhost:3000/productos/${product}`);
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const data = await response.json();
            products.value = Array.isArray(data) ? data : [data];
        } catch (err) {
            isError.value = true;
            error.value = err instanceof Error ? err : new Error('Unknown error');
        } finally {
            router.push('/home');
            isLoading.value = false;
        }
    };

    const productDetails = async (productID: string):Promise<Producto> => {
            const response = await fetch(`http://localhost:3000/productos/${productID}`);
            if (!response.ok) {
                throw new Error('Error al obtener el producto');
            }
            return await response.json();
    }


    return {
        products,
        isLoading,
        isError,
        error,
        fetchProducts,
        productDetails,
        details
    };
});
