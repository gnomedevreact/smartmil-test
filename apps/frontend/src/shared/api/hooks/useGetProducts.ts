import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../services/products.service.ts';

export const useGetProducts = (page: number, limit: number = 1) => {
  const {
    data: products,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['products', page],
    queryFn: () => ProductService.getAllProducts({ page, limit }),
    select: ({ data }) => data,
  });

  return { products, isLoading, isFetching };
};
