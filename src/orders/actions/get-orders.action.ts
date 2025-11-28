import { dunnoApi } from '@/api/dunno-api';
import type { OrdersResponse } from '../interfaces/orders-response.interface';

export const getOrdersAction = async (
  page: number = 1
): Promise<OrdersResponse> => {
  try {
    const { data } = await dunnoApi<OrdersResponse>('/orders', {
      params: {
        page: page,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting orders');
  }
};
