import { useCallback } from 'react';
import { useProductsFilteringContext } from '../context/ProductsFilteringContext';
import { Pagination } from '@/components';
import useFiltersFromStorage from '../hooks/useFiltersFromStorage';

export default function ProductsPagination() {
  const { state: filtersState, dispatch: filtersDispatch } =
    useProductsFilteringContext();
  const { setFiltersInStorage, filtersFromStorage } = useFiltersFromStorage();

  const { paginationOffset, paginationLimit } = filtersState;

  const handlePageChange = useCallback(
    (page: number) => {
      filtersDispatch({
        type: 'SET_PAGINATION_OFFSET',
        payload: page * paginationLimit,
      });
      setFiltersInStorage({
        ...filtersFromStorage,
        paginationOffset: page * paginationLimit,
        paginationLimit: paginationLimit,
      });
    },
    [paginationLimit, filtersDispatch, filtersFromStorage, setFiltersInStorage]
  );

  return (
    <Pagination
      testId="products-pagination"
      itemsPerPage={paginationLimit}
      currentPage={paginationOffset / paginationLimit}
      onPageChange={handlePageChange}
    />
  );
}
