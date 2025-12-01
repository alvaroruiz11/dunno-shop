import { dunnoApi } from '@/api/dunno-api';
import type { Order } from '../interfaces/order.interface';

export const getOrdersByIUserAction = async () => {
  try {
    const { data } = await dunnoApi.get<Order[]>('/orders/by-user');
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting order by User');
  }
};
