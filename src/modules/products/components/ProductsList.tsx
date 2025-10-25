import { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Spinner } from '@/components';
import { useProductsFilteringContext } from '../context/ProductsFilteringContext';
import useFiltersFromStorage from '../hooks/useFiltersFromStorage';

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

export default function ProductsList() {
  const { state: filtersState } = useProductsFilteringContext();
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { filtersFromStorageLoaded } = useFiltersFromStorage();

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams();
        const {
          title,
          categoryId,
          priceMin,
          priceMax,
          paginationOffset,
          paginationLimit,
        } = filtersState;

        console.log(
          'products list filters',
          title,
          categoryId,
          priceMin,
          priceMax,
          paginationOffset,
          paginationLimit
        );

        if (title) {
          params.append('title', title);
        }
        if (categoryId) {
          params.append('categoryId', categoryId.toString());
        }
        if (priceMin || priceMax) {
          const priceMinValue = priceMin ? priceMin.toString() : '1'; // If we put 0 here - then the API will not take the filtering into account; this seems to be an undocumented behavior of the API.
          const priceMaxValue = priceMax ? priceMax.toString() : priceMinValue;
          params.append('price_min', priceMinValue);
          params.append('price_max', priceMaxValue);
        }

        if (paginationOffset) {
          params.append('offset', paginationOffset.toString());
        }
        if (paginationLimit) {
          params.append('limit', paginationLimit.toString());
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

    if (!filtersFromStorageLoaded) {
      return;
    }

    fetchItems();
  }, [filtersState, filtersFromStorageLoaded]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <table className="w-full bg-white border border-gray-200 text-gray-900">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
          <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
          <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-semibold">
            Description
          </th>
          <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-semibold">
            Category
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {items.map(item => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm">
              <span
                className="inline-block lg:hidden truncate max-w-3xs"
                title={item.title}
              >
                {item.title.slice(0, 10)}
                {item.title.length > 10 ? '...' : ''}
              </span>
              <span className="hidden lg:inline-block truncate max-w-xs">
                {item.title}
              </span>
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
                  <span className="lg:hidden">
                    <PencilIcon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="hidden lg:inline">Edit</span>
                </button>
                <button
                  className="p-2 lg:px-4 lg:py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                  aria-label="Delete product"
                  title="Delete"
                >
                  <span className="lg:hidden">
                    <TrashIcon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="hidden lg:inline">Delete</span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
