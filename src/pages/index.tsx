import { Spinner } from '@/components';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Product[]>([]);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Platzi Fake Store Products Catalog
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Browse and manage your product inventory. Add, edit or delete products as needed.
            <br />
            Use filters for more detailed search.
          </p>
        </div>
        <div>
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm text-gray-900">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Price
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-left text-sm font-semibold">
                Description
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
                  <span className="md:hidden" title={item.title}>
                    {item.title.slice(0, 20)}
                    {item.title.length > 20 ? '...' : ''}
                  </span>
                  <span className="hidden md:inline">{item.title}</span>
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  ${item.price}
                </td>
                <td className="hidden md:table-cell px-4 py-3 text-sm">
                  {/*TODO: Add a tooltip to show the full description*/}
                  <span title={item.description}>
                    {item.description.slice(0, 50)}...
                    {item.description.length > 50 ? '...' : ''}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      className="p-2 md:px-4 md:py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                      aria-label="Edit product"
                      title="Edit"
                    >
                      <span className="md:hidden">✏️</span>
                      <span className="hidden md:inline">Edit</span>
                    </button>
                    <button
                      className="p-2 md:px-4 md:py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                      aria-label="Delete product"
                      title="Delete"
                    >
                      <span className="md:hidden">🗑️</span>
                      <span className="hidden md:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
