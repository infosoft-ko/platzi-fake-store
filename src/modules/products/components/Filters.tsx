import { useState, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  ProductsFilteringState,
  useProductsFilteringContext,
} from '../context/ProductsFilteringContext';
import useFiltersFromStorage from '../hooks/useFiltersFromStorage';

type Category = {
  id: number;
  name: string;
};

export default function Filters() {
  const { dispatch: filtersDispatch } =
    useProductsFilteringContext();
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { setFiltersInStorage, filtersFromStorage } = useFiltersFromStorage();

  const [titleFilter, setTitleFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');

  const searchEnabled = useMemo(() => {
    return titleFilter || categoryFilter || priceMin || priceMax;
  }, [titleFilter, categoryFilter, priceMin, priceMax]);

  const handleReset = useCallback(async () => {
    filtersDispatch({ type: 'RESET_FILTERS' });
    setFiltersInStorage({
      ...filtersFromStorage,
      title: undefined,
      categoryId: undefined,
      priceMin: undefined,
      priceMax: undefined,
    });
    setTitleFilter('');
    setCategoryFilter('');
    setPriceMin('');
    setPriceMax('');
  }, [filtersFromStorage, filtersDispatch, setFiltersInStorage]);

  const handleSetFilters = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const filtersState = {
        title: titleFilter ? titleFilter : undefined,
        categoryId: categoryFilter ? parseInt(categoryFilter) : undefined,
        priceMin: priceMin ? parseInt(priceMin) : undefined,
        priceMax: priceMax ? parseInt(priceMax) : undefined,
      } as ProductsFilteringState;

      filtersDispatch({
        type: 'SET_FILTERS',
        payload: filtersState,
      });
      setFiltersInStorage({
        ...filtersFromStorage,
        ...filtersState,
      });
    },
    [
      titleFilter,
      categoryFilter,
      priceMin,
      priceMax,
      filtersDispatch,
      filtersFromStorage,
      setFiltersInStorage,
    ]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://api.escuelajs.co/api/v1/categories'
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // on filters initial load - set the filters from the storage
  useEffect(() => {
    if (!filtersFromStorage) {
      return;
    }
    const { title, categoryId, priceMin, priceMax } = filtersFromStorage;

    setTitleFilter(title ?? '');
    setCategoryFilter(categoryId?.toString() ?? '');
    setPriceMin(priceMin?.toString() ?? '');
    setPriceMax(priceMax?.toString() ?? '');
  }, [filtersFromStorage]);

  return (
    <div className="w-full mb-6 bg-white p-6 border border-gray-200" data-testid="products-filters">
      <div className="flex justify-between items-center lg:mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          aria-label="Toggle filters"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      <form onSubmit={handleSetFilters}>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}
        >
          {/* Title Filter */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={titleFilter}
              onChange={e => setTitleFilter(e.target.value)}
              placeholder="Product title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              style={{
                height: '42px',
              }}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Min Filter */}
          <div>
            <label
              htmlFor="priceMin"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price Range Min
            </label>
            <input
              id="priceMin"
              type="number"
              value={priceMin}
              onChange={e => setPriceMin(e.target.value)}
              placeholder="Min price"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>

          {/* Price Max Filter */}
          <div>
            <label
              htmlFor="priceMax"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price Range Max
            </label>
            <input
              id="priceMax"
              type="number"
              value={priceMax}
              onChange={e => setPriceMax(e.target.value)}
              placeholder="Max price"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>

        {/* Buttons */}
        <div
          className={`flex gap-3 ${showFilters ? 'block' : 'hidden lg:flex'}`}
        >
          <button
            type="submit"
            disabled={!searchEnabled}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
