export interface Category {
  id: string;
  name: string;
  slug: string;
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
