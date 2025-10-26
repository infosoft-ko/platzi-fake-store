import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const DATA_STALE_TIME_MILLIS = process.env.NEXT_PUBLIC_DATA_STALE_TIME_SECONDS
  ? parseInt(process.env.NEXT_PUBLIC_DATA_STALE_TIME_SECONDS) * 1000
  : 10 * 1000; // 10 seconds

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DATA_STALE_TIME_MILLIS,
      gcTime: 5 * 60 * 1000, // for unused data in cache
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
