import {
  Pagination,
  Filters,
  ProductsFilteringProvider,
  ProductsList,
} from '@/modules/products';

export default function ProductsPage() {
  return (
    <ProductsFilteringProvider>
      <div className="container mx-auto px-4 py-8 bg-gray-50">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Platzi Fake Store Products Catalog
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Browse and manage your product inventory. Add, edit or delete
            products as needed.
            <br />
            Use filters for more detailed search.
          </p>
        </div>

        <Filters />

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
          <ProductsList />
          <div className="mt-4">
            <Pagination />
          </div>
        </div>
      </div>
    </ProductsFilteringProvider>
  );
}
