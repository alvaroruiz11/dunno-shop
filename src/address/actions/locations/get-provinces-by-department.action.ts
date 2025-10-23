import { dunnoApi } from '@/api/dunno-api';
// import { sleep } from '@/lib/sleep';
import type { Location } from '@/address/interfaces/location.interface';

export const getProvincesByDepartmentAction = async (
  departmentId: string
): Promise<Location[]> => {
  // await sleep(1);

  const { data } = await dunnoApi.get<Location[]>(
    `/locations/provinces/${departmentId}`
  );

  return data;
};
