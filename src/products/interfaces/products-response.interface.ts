import type { Product } from './product.interface';

export interface ProductsResponse {
  meta: Meta;
  data: Product[];
}

export interface Meta {
  count: number;
  page: number;
  totalPages: number;
}
