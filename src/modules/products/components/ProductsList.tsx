import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Spinner } from '@/components';
import { useProductsFilteringContext } from '../context/ProductsFilteringContext';
import useFiltersFromStorage from '../hooks/useFiltersFromStorage';
import { useProducts } from '../../../services/products/useProducts';

export default function ProductsList() {
  const { state: filtersState } = useProductsFilteringContext();
  const { filtersFromStorageLoaded } = useFiltersFromStorage();

  // Use the custom React Query hook
  const { data: items = [], isLoading, error } = useProducts({
    filters: filtersState,
    enabled: filtersFromStorageLoaded, // Only fetch when filters are loaded from storage
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-600">Error loading products. Please try again.</p>
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
