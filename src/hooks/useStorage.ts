import { useEffect, useState } from 'react';

export default function useStorage<T>(key: string) {
  const [value, setValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) {
      setValue(JSON.parse(item) as T);
    }
  }, [key]);

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue] as [T, (value: T) => void];
}
