import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthToken } from '@/hooks/useAuthToken';
import { Product, ProductsFilters } from './types';

export type UseProductsParams = {
  filters: ProductsFilters;
  enabled?: boolean;
};

const DATA_STALE_TIME_MILLIS = process.env.NEXT_PUBLIC_DATA_STALE_TIME_SECONDS
  ? parseInt(process.env.NEXT_PUBLIC_DATA_STALE_TIME_SECONDS) * 1000
  : 10 * 1000; // 10 seconds
const PRODUCTS_API_URL = process.env.NEXT_PUBLIC_PRODUCTS_API_URL;

if (!PRODUCTS_API_URL) {
  throw new Error(
    'Environment variable NEXT_PUBLIC_PRODUCTS_API_URL is not set'
  );
}

export function useProducts({ filters, enabled = true }: UseProductsParams) {
  const { data: token } = useAuthToken();

  return useQuery({
    queryKey: ['products', filters],
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
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return response.data;
    },
    enabled: enabled && token !== undefined,
    staleTime: DATA_STALE_TIME_MILLIS,
    gcTime: 5 * 60 * 1000, // for unused data in cache
    retry: 2,
    retryDelay: 1000,
  });
}
