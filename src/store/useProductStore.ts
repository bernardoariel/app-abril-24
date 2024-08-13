import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

export const useProductStore = defineStore('product', () => {
    const product = ref('');
    const products = ref<any[]>([]);
    const router = useRouter();

    const fetchProduct = async () => {
        const response = await fetch(`https://api.example.com/products?search=${product.value}`);
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        return response.json();
    };

    const { isLoading, isError, error, data, refetch } = useQuery({
        queryKey: ['products', product],
        queryFn: fetchProduct,
        enabled: false,
    });

    // Watch para redirigir cuando los datos sean obtenidos
    watch(data, (newData) => {
        if (newData) {
            products.value = newData;
            router.push('/home'); 
        }
    });

    const searchProduct = () => {
        refetch();
    };

    return {
        product,
        products,
        isLoading,
        isError,
        error,
        searchProduct,
    };
});
