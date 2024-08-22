import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useProductStore = defineStore('product', () => {
    const products = ref<any[]>([]);
    const isLoading = ref(false);
    const isError = ref(false);
    const error = ref<Error | null>(null);
    const router = useRouter();

    const fetchProduct = async (product:string) => {
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
            console.log(data)
            router.push('/home');
        } catch (err) {
            isError.value = true;
            error.value = err as Error;
        } finally {
            isLoading.value = false;
        }
    };


    return {
        products,
        isLoading,
        isError,
        error,
        fetchProduct,
    };
});
