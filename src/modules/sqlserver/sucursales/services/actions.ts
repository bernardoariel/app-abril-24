import { type SucursalResponse } from '../interfaces/sucursal.interface';
import { abrilApiData } from '@/api/abrilApiData';

export const getSucursales = async (): Promise<SucursalResponse[]> => {
  consle.log('hola');
  const { data } = await abrilApiData.get<SucursalResponse[]>('/prod-sucursal');
  return data;
};
