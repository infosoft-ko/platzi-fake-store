import { useCallback } from 'react';
import { useProductsFilteringContext } from '../context/ProductsFilteringContext';
import { Pagination } from '@/components';
import useFiltersFromStorage from '../hooks/useFiltersFromStorage';

export default function ProductsPagination() {
  const { state: filtersState, dispatch: filtersDispatch } =
    useProductsFilteringContext();
  const { setFiltersInStorage, filtersFromStorage } = useFiltersFromStorage();

  const { paginationOffset, paginationLimit, dataLoadedItemsCount } =
    filtersState;

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

  const currentPage = paginationOffset / paginationLimit;

  return (
    <Pagination
      testId="products-pagination"
      itemsPerPage={paginationLimit}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      totalPages={
        dataLoadedItemsCount === paginationLimit ? currentPage + 1 : currentPage
      }
    />
  );
}
