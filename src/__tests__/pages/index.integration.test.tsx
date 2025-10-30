import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductsPage from '../../pages/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../../hooks/useAuthToken', () => ({
  useAuthToken: () => ({ data: 'mock-token' }),
}));

jest.mock('../../services/products/useProducts');

jest.mock('next/router', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// configure the mocks
const mockUseProducts = jest.mocked(
  require('../../services/products/useProducts').useProducts
);

const mockPush = jest.fn();
const mockedRouter = jest.mocked(require('next/router')).default;
mockedRouter.push = mockPush;

// configure for react query client usage
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const withQueryClient = (Component: React.ComponentType) => {
  return (props: React.ComponentProps<typeof Component>) => (
    <QueryClientProvider client={createTestQueryClient()}>
      <Component {...props} />
    </QueryClientProvider>
  );
};

describe('Products page', () => {
  describe('when loading', () => {
    beforeEach(() => {
      mockUseProducts.mockClear();
      mockUseProducts.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      });
    });

    it('should render all parts of the page', () => {
      const WrappedProductsPage = withQueryClient(ProductsPage);
      render(<WrappedProductsPage />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Platzi Fake Store Products Catalog'
      );
      expect(screen.getByTestId('add-product-button')).toBeInTheDocument();
      expect(screen.getByTestId('products-loader')).toBeInTheDocument();
      expect(screen.getByTestId('products-filters')).toBeInTheDocument();
      expect(screen.getByTestId('products-pagination')).toBeInTheDocument();

      expect(screen.queryByTestId('products-error')).toBeNull();
      expect(screen.queryByTestId('products-list')).toBeNull();
    });
  });

  describe('when loaded', () => {
    beforeEach(() => {
      mockUseProducts.mockClear();
      mockUseProducts.mockReturnValue({
        data: [
          {
            id: 1,
            title: 'Test Product',
            description: 'Test description',
            category: { id: 1, name: 'Electronics' },
            price: 10.99,
          },
        ],
        isLoading: false,
        error: null,
      });
    });

    it('should render all parts of the page', () => {
      const WrappedProductsPage = withQueryClient(ProductsPage);
      render(<WrappedProductsPage />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Platzi Fake Store Products Catalog'
      );
      expect(screen.getByTestId('products-filters')).toBeInTheDocument();
      expect(screen.getByTestId('products-list')).toBeInTheDocument();
      expect(screen.getByTestId('products-pagination')).toBeInTheDocument();
      expect(screen.getByTestId('add-product-button')).toBeInTheDocument();

      expect(screen.queryByTestId('products-loader')).toBeNull();
      expect(screen.queryByTestId('products-error')).toBeNull();
    });
  });

  it('navigates on add product button click', () => {
    const WrappedProductsPage = withQueryClient(ProductsPage);
    render(<WrappedProductsPage />);

    const addButton = screen.getByText('Add product');
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(mockPush).toHaveBeenCalledWith('/products/new');
  });
});
