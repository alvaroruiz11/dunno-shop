import { dunnoApi } from '@/api/dunno-api';
import type { Order } from '../interfaces/order.interface';

interface OrderItemLike {
  productVariantId: string;
  quantity: number;
}

interface AddressLike {
  firstName: string;
  lastName: string;
  email: string;
  ci: string;
  phone: string;
  address: string;
  reference?: string;
  cityId: string;
}

export const placeOrderAction = async (
  items: OrderItemLike[],
  address: AddressLike
) => {
  try {
    const { data } = await dunnoApi.post<Order>('/orders', { items, address });
    return {
      ok: true,
      order: data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Erro creating order',
    };
  }
};
