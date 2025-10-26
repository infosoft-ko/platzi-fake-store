import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type TokenResponse = {
  token?: string;
  error?: string;
};

export function useAuthToken() {
  return useQuery({
    queryKey: ['auth-token'],
    queryFn: async () => {
      const response = await axios.get<TokenResponse>('/api/auth/token');
      return response.data.token;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // TODO: Check if this is needed
  });
}
