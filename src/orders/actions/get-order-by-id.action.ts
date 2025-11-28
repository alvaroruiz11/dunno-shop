import { dunnoApi } from '@/api/dunno-api';
import type { Order } from '../interfaces/order.interface';

export const getOrderByIdAction = async (id: string): Promise<Order> => {
  try {
    const { data } = await dunnoApi.get<Order>(`/orders/${id}`);

    const { orderItems, ...order } = data;

    return {
      ...order,
      orderItems: orderItems.map((item) => ({
        ...item,
        images: item.images.map(
          (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
        ),
      })),
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting order with ID: ${id}`);
  }
};
