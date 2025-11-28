export interface Order {
  id: string;
  subTotal: number;
  totalTax: number;
  totalAmount: number;
  totalItems: number;
  isPaid: boolean;
  paidAt: null;
  isOnlineSale: boolean;
  status: string;
  paymentMethod: string;
  transactionId: null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  couponId: string | null;
  shopId: string | null;
  Coupon: string | null;
  user: User | null;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  size: string;
  color: null;
  sku: string;
  title: string;
  salePrice: null;
  category: string;
  images: string[];
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}
