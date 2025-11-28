import type { Order } from './order.interface';

export interface OrdersResponse {
  meta: Meta;
  data: Order[];
}

export interface Meta {
  count: number;
  page: number;
  totalPages: number;
}
