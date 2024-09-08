import { type Producto } from '../../../../interfaces/products.interface';
import { abrilApiData } from '@/api/abrilApiData';

interface GetProductsOptions {
  term: string;
}

export const getProducts = async ({ term }: GetProductsOptions): Promise<Producto[]> => {
  const { data } = await abrilApiData.get<Producto[]>(`productos/${term}`);
  return data;
};

export const getProductById = async (id: number): Promise<Producto> => {
  await sleep(2);
  try {
    const { data } = await abrilApiData.get<Producto>(`/productos/${id}`);
    if (!data) {
      throw new Error('Producto no encontrado');
    }
    return data;
  } catch (error) {
    console.error('Error fetching product by id: ', error);
    throw error;
  }
};

export const getProductByMarcas = async ({ term }: GetProductsOptions): Promise<Producto[]> => {
  try {
    console.log('Fetching marcas with term: ', term);
    const { data } = await abrilApiData.get<Producto[]>(`productos/${term}/marcas`);
    return data;
  } catch (error) {
    console.error('Error fetching products for marca:', error);
    throw error;
  }
};
export const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};
