import { type Producto } from '../../../../interfaces/products.interface';
import { abrilApiData } from '@/api/abrilApiData';
interface GetProductsOptions {
  term: string;
}
export const getProducts = async ({ term }: string): Promise<Producto[]> => {
  console.log('term::: ', term);
  const { data } = await abrilApiData.get<Producto[]>(`productos/${term}`);
  return data;
};

export const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};
export const getProductById = async (id: number): Promise<Product> => {
  await sleep(2);
  try {
    const { data } = await abrilApiData.get<Product>(`/productos/${id}`);
    if (!data) {
      throw new Error('Producto no encontrado');
    }
    return data;
  } catch (error) {
    console.error('Error fetching product by id: ', error);
    throw error;
  }

  // await sleep(2);
};
