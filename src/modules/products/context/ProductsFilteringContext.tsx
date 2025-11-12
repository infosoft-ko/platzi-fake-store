import { useContext, createContext, useReducer, Dispatch } from 'react';

export type ProductsFilteringState = {
  title: string | undefined;
  categoryId: number | undefined;
  priceMin: number | undefined;
  priceMax: number | undefined;
  paginationOffset: number;
  paginationLimit: number;
  dataFromStoreLoaded: boolean;
  dataLoadedItemsCount: number;
};

export type ProductsFilteringAction =
  | {
      type: 'SET_FILTERS';
      payload: Omit<
        ProductsFilteringState,
        'paginationOffset' | 'paginationLimit' | 'dataFromStoreLoaded'
      >;
    }
  | { type: 'SET_DATA_LOADED_ITEMS_COUNT'; payload: number }
  | { type: 'SET_PAGINATION_OFFSET'; payload: number }
  | { type: 'SET_PAGINATION_LIMIT'; payload: number }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_DATA_FROM_STORE_LOADED'; payload: boolean };

export type ProductsFilteringContextType = {
  state: ProductsFilteringState;
  dispatch: Dispatch<ProductsFilteringAction>;
};

export const initialState: ProductsFilteringState = {
  title: undefined,
  categoryId: undefined,
  priceMin: undefined,
  priceMax: undefined,
  paginationOffset: 0,
  paginationLimit: 20,
  dataFromStoreLoaded: false,
  dataLoadedItemsCount: 0,
};

export const productsFilteringReducer = (
  state: ProductsFilteringState,
  action: ProductsFilteringAction
): ProductsFilteringState => {
  switch (action.type) {
    case 'SET_FILTERS':
      return { ...state, ...action.payload };
    case 'SET_DATA_LOADED_ITEMS_COUNT':
      return { ...state, dataLoadedItemsCount: action.payload };
    case 'SET_PAGINATION_OFFSET':
      return { ...state, paginationOffset: action.payload };
    case 'SET_PAGINATION_LIMIT':
      return { ...state, paginationLimit: action.payload };
    case 'RESET_FILTERS':
      return { ...initialState, dataFromStoreLoaded: true };
    case 'SET_DATA_FROM_STORE_LOADED':
      return { ...state, dataFromStoreLoaded: action.payload };
    default:
      return state;
  }
};

const ProductsFilteringContext = createContext<
  ProductsFilteringContextType | undefined
>(undefined);

export const useProductsFilteringContext = () => {
  const context = useContext(ProductsFilteringContext);
  if (!context) {
    throw new Error(
      'useProductsFiltering must be used within a ProductsFilteringProvider'
    );
  }
  return context;
};

export const ProductsFilteringProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(productsFilteringReducer, initialState);

  return (
    <ProductsFilteringContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsFilteringContext.Provider>
  );
};
