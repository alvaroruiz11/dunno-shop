export interface UsersResponse {
  meta: Meta;
  data: User[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  image: null;
  createdAt: Date;
  shopId: null;
  roles: string[];
}

export interface Meta {
  count: number;
  page: number;
  totalPages: number;
}
