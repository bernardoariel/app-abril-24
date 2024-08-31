import { type Producto } from '../../../../interfaces/products.interface';
import { abrilApiData } from '@/api/abrilApiData';

interface GetProductsOptions {
  filterKey?: string;
}
/* export const getProducts = async ({ filterKey }: GetProductsOptions): Promise<Producto[]> => {
  // await sleep(2);

  const filterUrl = filterKey ? `category=${filterKey}` : '';

  const { data } = await productsApi.get<Product[]>(`/productos?${filterUrl}`);
  return data;
}; */

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const { data } = await abrilApiData.get<Product>(`/productos/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching product by id: ', error);
    throw error;
  }

  // await sleep(2);
};
