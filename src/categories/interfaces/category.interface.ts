export interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  parentCategory: ParentCategory | null;
  subCategories: SubCategory[];
}

export interface ParentCategory {
  id: string;
  name: string;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}
