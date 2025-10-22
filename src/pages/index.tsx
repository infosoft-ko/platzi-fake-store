import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '@/components';
import Pagination from '@/modules/products/components/Pagination';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  images: string[];
  creationAt: string;
  updatedAt: string;
};

type Category = {
  id: number;
  name: string;
};

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [titleFilter, setTitleFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          'https://api.escuelajs.co/api/v1/products'
        );
        setItems(response.data);
        setIsLoading(false);
      } catch (error) {
        // TODO: Handle error
        console.error('Unexpected error:', error);
      }
    };
    fetchItems();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const params = new URLSearchParams();

      if (titleFilter) {
        params.append('title', titleFilter);
      }
      if (categoryFilter) {
        params.append('categoryId', categoryFilter);
      }
      if (priceMin) {
        params.append('price_min', priceMin);
      }
      if (priceMax) {
        params.append('price_max', priceMax);
      }

      const queryString = params.toString();
      const url = `https://api.escuelajs.co/api/v1/products${queryString ? `?${queryString}` : ''}`;

      const response = await axios.get(url);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    setTitleFilter('');
    setCategoryFilter('');
    setPriceMin('');
    setPriceMax('');
    setIsLoading(true);

    try {
      const response = await axios.get(
        'https://api.escuelajs.co/api/v1/products'
      );
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Platzi Fake Store Products Catalog
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Browse and manage your product inventory. Add, edit or delete products
          as needed.
          <br />
          Use filters for more detailed search.
        </p>
      </div>

      <div className="w-full mb-6 bg-white p-6 border border-gray-200">
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
        <form onSubmit={handleSearch}>
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
                Min Price
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
                Max Price
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
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
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

      <div>
        <div className="py-3 flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            Products
          </h2>
          <button
            type="button"
            className="p-2 px-4 lg:px-6 lg:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            aria-label="Add product"
          >
            <span className="lg:hidden">Add</span>
            <span className="hidden lg:inline">Add product</span>
          </button>
        </div>
        <table className="w-full bg-white border border-gray-200 text-gray-900">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Price
              </th>
              <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-semibold">
                Description
              </th>
              <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm">
                  <span className="lg:hidden" title={item.title}>
                    {item.title.slice(0, 20)}
                    {item.title.length > 20 ? '...' : ''}
                  </span>
                  <span className="hidden md:inline">{item.title}</span>
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  ${item.price}
                </td>
                <td className="hidden lg:table-cell px-4 py-3 text-sm">
                  {/*TODO: Add a tooltip to show the full description*/}
                  <span title={item.description}>
                    {item.description.slice(0, 50)}...
                    {item.description.length > 50 ? '...' : ''}
                  </span>
                </td>
                <td className="hidden lg:table-cell px-4 py-3 text-sm">
                  {item.category.name}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      className="p-2 lg:px-4 lg:py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                      aria-label="Edit product"
                      title="Edit"
                    >
                      <span className="lg:hidden"><PencilIcon aria-hidden="true" className="size-5" /></span>
                      <span className="hidden lg:inline">Edit</span>
                    </button>
                    <button
                      className="p-2 lg:px-4 lg:py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                      aria-label="Delete product"
                      title="Delete"
                    >
                      <span className="lg:hidden"><TrashIcon aria-hidden="true" className="size-5" /></span>
                      <span className="hidden lg:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <Pagination />
        </div>
      </div>
    </div>
  );
}
