import { dunnoApi } from '@/api/dunno-api';
import type { Location } from '@/address/interfaces/location.interface';


export const getDepartmentsAction = async (): Promise<Location[]> => {
  const { data } = await dunnoApi.get<Location[]>('/locations/departments');

  return data;
};
