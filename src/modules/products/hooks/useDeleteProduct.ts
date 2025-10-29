import { useCallback, useEffect, useState } from 'react';
import { useDeleteProductLazy, useProductLazy } from '@/services/products';

export function useDeleteProduct() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDeleteText, setProductToDeleteText] = useState<string | null>(
    null
  );
  const [productToDeleteId, setProductToDeleteId] = useState<number | null>(
    null
  );
  const { queryLazy: loadProductLazy } = useProductLazy({
    productId: productToDeleteId,
  });
  const { queryLazy: deleteProductLazy } = useDeleteProductLazy({
    productId: productToDeleteId,
  });

  useEffect(() => {
    if (!productToDeleteId) {
      return;
    }

    const loadProduct = async () => {
      const { data: product, error: productError } = await loadProductLazy();

      if (productError) {
        console.error(productError);
        return null;
      }

      return product;
    };

    loadProduct().then(product => {
      if (product) {
        setProductToDeleteText(`${product.title} (ID: ${product.id})`);
      }
    });
  }, [productToDeleteId, loadProductLazy]);

  const handleDeleteProduct = useCallback(
    async (productId: number) => {
      setProductToDeleteId(productId);
      setIsDeleteDialogOpen(true);
    },
    [loadProductLazy]
  );

  const handleConfirmDeleteProduct = useCallback(async () => {
    if (productToDeleteId) {
      await deleteProductLazy();
    }
    setIsDeleteDialogOpen(false);
    setProductToDeleteId(null);
    setProductToDeleteText(null);
  }, [productToDeleteId, deleteProductLazy]);

  const handleCancelDeleteProduct = useCallback(async () => {
    setIsDeleteDialogOpen(false);
    setProductToDeleteId(null);
    setProductToDeleteText(null);
  }, []);

  return {
    isDeleteProductDialogOpen: isDeleteDialogOpen && !!productToDeleteText,
    productToDeleteText,
    handleDeleteProduct,
    handleConfirmDeleteProduct,
    handleCancelDeleteProduct,
  };
}
