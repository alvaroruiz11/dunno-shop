import type { Category } from './category.interface';

export interface CategoriesResponse {
  mata: Mata;
  data: Category[];
}

export interface Mata {
  count: number;
  page: number;
  totalPages: number;
}
