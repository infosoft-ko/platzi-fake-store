import { useEffect } from 'react';
import axios from 'axios';
import { useAuthToken } from './useAuthToken';

export function useAxiosAuthInterceptor() {
  const { data: token, isError, error } = useAuthToken();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      config => {
        if (token) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      requestError => {
        console.error('Axios request error', requestError);
        return Promise.reject(requestError);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      responseError => {
        if (axios.isAxiosError(responseError)) {
          console.error('Axios response error', {
            status: responseError.response?.status,
            data: responseError.response?.data,
            message: responseError.message,
          });
        } else {
          console.error('Unexpected axios error', responseError);
        }

        return Promise.reject(responseError);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  useEffect(() => {
    if (isError) {
      console.error('Failed to retrieve auth token', error);
    }
  }, [isError, error]);
}
