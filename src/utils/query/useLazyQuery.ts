import { useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query';

type UseLazyQueryReturnType<T> = {
  queryLazy: ReturnType<typeof useQuery<T>>['refetch'];
} & ReturnType<typeof useQuery<T>>;

export const useLazyQuery = <T>(
  options: UseQueryOptions<T>
): UseLazyQueryReturnType<T> => {
  const query = useQuery<T>({ ...options, enabled: false });

  return {
    ...query,
    queryLazy: query.refetch,
  };
};
