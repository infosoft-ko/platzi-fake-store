import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthToken } from '@/hooks/useAuthToken';
import { Product, ProductsFilters } from './types';
import { DATA_STALE_TIME_MILLIS, PRODUCTS_API_URL } from './consts';

export type UseProductsParams = {
  filters: ProductsFilters;
  enabled?: boolean;
};

export const PRODUCTS_MAIN_QUERY_KEY = 'products';

export const getProductsQueryKey = (filters: ProductsFilters) => {
  return [PRODUCTS_MAIN_QUERY_KEY, filters];
};

export function useProducts({ filters, enabled = true }: UseProductsParams) {
  // this is not needed any more because this is handled by the axios interceptor
  // const { data: token } = useAuthToken();

  return useQuery({
    queryKey: getProductsQueryKey(filters),
    queryFn: async () => {
      const params = new URLSearchParams();
      const {
        title,
        categoryId,
        priceMin,
        priceMax,
        paginationOffset,
        paginationLimit,
      } = filters;

      // Build query parameters
      if (title) params.append('title', title);
      if (categoryId) params.append('categoryId', categoryId.toString());
      if (priceMin || priceMax) {
        const priceMinValue = priceMin ? priceMin.toString() : '1';
        const priceMaxValue = priceMax ? priceMax.toString() : priceMinValue;
        params.append('price_min', priceMinValue);
        params.append('price_max', priceMaxValue);
      }
      if (Number.isFinite(paginationOffset))
        params.append('offset', paginationOffset!.toString());
      if (Number.isFinite(paginationLimit))
        params.append('limit', paginationLimit!.toString());

      const queryString = params.toString();
      const url = `${PRODUCTS_API_URL}${queryString ? `?${queryString}` : ''}`;

      const response = await axios.get<Product[]>(url, {
        // this is not needed any more because this is handled by the axios interceptor
        // headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return response.data;
    },
    // enabled: enabled && token !== undefined,
    enabled: enabled,
    staleTime: DATA_STALE_TIME_MILLIS,
    gcTime: 5 * 60 * 1000, // for unused data in cache
    retry: 2,
    retryDelay: 1000,
  });
}
