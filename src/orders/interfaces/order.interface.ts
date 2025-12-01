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
  userId: null;
  couponId: null;
  shopId: null;
  Coupon: null;
  user: User | null;
  invoice: Invoice | null;
  orderItems: OrderItem[];
}

export interface Invoice {
  id: string;
  documentType: string;
  invoiceNumber: string;
  invoiceUrl: string;
  socialReason: string;
  nitNumber: string;
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
