export interface Product {
  id: string;
  title: string;
  slug: string;
  gender: string;
  costPrice: number;
  price: number;
  salePrice: number | null;
  createdAt: Date;
  tags: string[];
  description: string;
  variants: Variant[];
  category: Category;
  images: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Variant {
  id: string;
  size: string;
  stock: number;
  sku: string;
  color: string | null;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
  productVariantId: string;
}
