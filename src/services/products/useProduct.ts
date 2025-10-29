import axios from 'axios';
import { useAuthToken } from '@/hooks/useAuthToken';
import { Product } from './types';
import { DATA_STALE_TIME_MILLIS, PRODUCTS_API_URL } from './consts';
import { useLazyQuery } from '@/utils/query';

export type UseProductParams = {
  productId: number | null;
};

export function useProductLazy({ productId }: UseProductParams) {
  const { data: token } = useAuthToken();

  return useLazyQuery<Product>({
    queryKey: ['product', productId],
    queryFn: async () => {
      const url = `${PRODUCTS_API_URL}/${productId}`;

      const response = await axios.get<Product>(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return response.data;
    },
    staleTime: DATA_STALE_TIME_MILLIS,
    gcTime: 5 * 60 * 1000,
  });
}
