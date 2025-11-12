import useStorage from '@/hooks/useStorage';
import {
  ProductsFilteringState,
  useProductsFilteringContext,
} from '../context/ProductsFilteringContext';
import { useEffect } from 'react';
import getFromStorage from '@/utils/storage';

export default function useFiltersFromStorage() {
  const [filtersStateStorage, setFiltersStateStorage] =
    useStorage<ProductsFilteringState>('products_filters');
  const { dispatch: filtersDispatch, state: filtersState } =
    useProductsFilteringContext();

  // on filters initial load - set the filters from the storage
  useEffect(() => {
    const filtersStateStorage =
      getFromStorage<ProductsFilteringState>('products_filters');

    if (filtersState.dataFromStoreLoaded) {
      return;
    }
    if (!filtersStateStorage) {
      filtersDispatch({
        type: 'SET_DATA_FROM_STORE_LOADED',
        payload: true,
      });
      return;
    }

    const {
      title,
      categoryId,
      priceMin,
      priceMax,
      paginationOffset,
      paginationLimit,
    } = filtersStateStorage as ProductsFilteringState;

    filtersDispatch({
      type: 'SET_FILTERS',
      payload: {
        title: title ? title : undefined,
        categoryId: categoryId ? categoryId : undefined,
        priceMin: priceMin ? priceMin : undefined,
        priceMax: priceMax ? priceMax : undefined,
        
      },
    });
    if (paginationOffset) {
      filtersDispatch({
        type: 'SET_PAGINATION_OFFSET',
        payload: paginationOffset,
      });
    }
    if (paginationLimit) {
      filtersDispatch({
        type: 'SET_PAGINATION_LIMIT',
        payload: paginationLimit,
      });
    }

    filtersDispatch({
      type: 'SET_DATA_FROM_STORE_LOADED',
      payload: true,
    });
  }, []);

  return {
    filtersFromStorageLoaded: filtersState.dataFromStoreLoaded,
    setFiltersInStorage: setFiltersStateStorage,
    filtersFromStorage: filtersStateStorage,
  };
}
