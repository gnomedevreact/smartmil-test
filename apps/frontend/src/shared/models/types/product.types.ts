export type Product = {
  id: number;
  name: string;
  article: string;
  price: number;
  quantity: number;
};

export type ProductsPaginated = {
  data: Product[];
  total: number;
};

export type UpdateProduct = Pick<Product, 'article' | 'name' | 'price' | 'quantity'>;
