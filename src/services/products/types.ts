export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  images: string[];
  creationAt: string;
  updatedAt: string;
};

export type ProductsFilters = {
  title?: string;
  categoryId?: number;
  priceMin?: number;
  priceMax?: number;
  paginationOffset?: number;
  paginationLimit?: number;
};

export type UseProductsParams = {
  filters: ProductsFilters;
  enabled?: boolean;
};
