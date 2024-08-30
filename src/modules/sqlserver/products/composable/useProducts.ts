import { abrilApiData } from "@/api/abrilApiData";
import { useQuery } from "@tanstack/vue-query";
import type { ProductsResponse } from "../interfaces/products.response";
import { ref, watch } from "vue";

const fetchProducts = async (term: string | number): Promise<ProductsResponse[]> => {
    if (!term) return [];
    const { data } = await abrilApiData.get<ProductsResponse[]>(`/productos/${term}`);
    return data;
};
export const useProducts = () => {

    const searchTerm = ref('');
    const results = ref<ProductsResponse[]>([]);

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['products', searchTerm],
        queryFn: () => fetchProducts(searchTerm.value),
        staleTime: 1000 * 60 * 60, 
        enabled: false, 
    });

    watch(data, (newData) => {
        if (!newData) return;
        if (newData) {
            results.value = newData;
        }
    });


    return{
        isLoading,
        data,
        refetch,
        searchTerm,
        results
    }
}
