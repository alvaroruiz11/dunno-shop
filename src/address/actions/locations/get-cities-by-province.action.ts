import { dunnoApi } from '@/api/dunno-api';
import type { Location } from '@/address/interfaces/location.interface';


export const getCitiesByProvinceAction = async (
  provinceId: string
): Promise<Location[]> => {
  // await sleep(1);

  const { data } = await dunnoApi.get<Location[]>(
    `/locations/cities/${provinceId}`
  );

  return data;
};
