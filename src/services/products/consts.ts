const DATA_STALE_TIME_MILLIS = process.env.NEXT_PUBLIC_DATA_STALE_TIME_SECONDS
  ? parseInt(process.env.NEXT_PUBLIC_DATA_STALE_TIME_SECONDS) * 1000
  : 10 * 1000; // 10 seconds
const PRODUCTS_API_URL = process.env.NEXT_PUBLIC_PRODUCTS_API_URL;

if (!PRODUCTS_API_URL) {
  throw new Error(
    'Environment variable NEXT_PUBLIC_PRODUCTS_API_URL is not set'
  );
}

export { DATA_STALE_TIME_MILLIS, PRODUCTS_API_URL };