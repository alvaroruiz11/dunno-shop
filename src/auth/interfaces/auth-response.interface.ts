export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  image: string | null;
  createdAt: Date;
  shopId: string | null;
  roles: string[];
}
