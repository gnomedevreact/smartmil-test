import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product, UpdateProduct } from '../../models/types/product.types.ts';
import { ProductService } from '../services/products.service.ts';

export const useProductMutations = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createProduct, isPending: isPendingCreate } = useMutation({
    mutationKey: ['create product'],
    mutationFn: (product: Omit<Product, 'id'>) => ProductService.createProduct(product),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const { mutateAsync: updateProduct, isPending: isPendingUpdate } = useMutation({
    mutationKey: ['update product'],
    mutationFn: (updateData: { id: number; product: UpdateProduct }) =>
      ProductService.updateProducts(updateData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const isPending = isPendingCreate || isPendingUpdate;

  return { createProduct, updateProduct, isPending };
};
