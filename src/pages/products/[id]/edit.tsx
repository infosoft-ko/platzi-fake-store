import { GetServerSideProps } from 'next';
import axios from 'axios';
import NewProductForm from '@/modules/products/components/NewProductForm';
import router, { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/services/products/types';

type Category = {
  id: number;
  name: string;
};

type EditProductPageProps = {
  categories: Category[];
  product: Product | null;
};

export default function EditProductPage({
  categories,
  product,
}: EditProductPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewProductForm mode="edit" categories={categories} product={product} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params as { id: string };
  let product: Product | null = null;
  let categories: Category[] = [];

  // TODO: extract to a service
  try {
    const productResponse = await axios.get(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    product = productResponse.data;
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  // TODO: extract to a service
  try {
    const categoriesResponse = await axios.get(
      'https://api.escuelajs.co/api/v1/categories'
    );
    categories = categoriesResponse.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return {
    props: {
      categories,
      product: product ?? null,
    },
  };
};
