import { axiosBase } from '../../../core/configs/axios.config.ts';
import type {
  Product,
  ProductsPaginated,
  UpdateProduct,
} from '../../models/types/product.types.ts';

export const ProductService = {
  async getAllProducts({ page, limit }: { page: number; limit: number }) {
    return await axiosBase.get<ProductsPaginated>('/products', {
      params: {
        page,
        limit,
      },
    });
  },

  async createProduct(product: Omit<Product, 'id'>) {
    return await axiosBase.post('/products', product);
  },

  async updateProducts({ id, product }: { id: number; product: UpdateProduct }) {
    return await axiosBase.put(`/products/${id}`, product);
  },

  async deleteProduct(id: number) {
    return await axiosBase.delete(`/products/${id}`);
  },
};
