import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductService } from '../services/products.service.ts';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct } = useMutation({
    mutationKey: ['delete product'],
    mutationFn: (id: number) => ProductService.deleteProduct(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return { deleteProduct };
};
