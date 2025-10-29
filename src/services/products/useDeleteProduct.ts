import axios from 'axios';
import { useAuthToken } from '@/hooks/useAuthToken';
import { Product } from './types';
import { PRODUCTS_API_URL } from './consts';
import { useLazyQuery } from '@/utils/query';
import { useQueryClient } from '@tanstack/react-query';
import { PRODUCTS_MAIN_QUERY_KEY } from './useProducts';

export type UseDeleteProductParams = {
  productId?: number | null;
};

export function useDeleteProductLazy({ productId }: UseDeleteProductParams) {
  const queryClient = useQueryClient();
  const { data: token } = useAuthToken();

  return useLazyQuery({
    queryKey: ['delete-product', productId],
    queryFn: async () => {
      const url = `${PRODUCTS_API_URL}/${productId}`;

      await axios.delete<Product>(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      queryClient.invalidateQueries({ queryKey: [PRODUCTS_MAIN_QUERY_KEY] });

      return true;
    },
    retry: 2,
    retryDelay: 1000,
  });
}
