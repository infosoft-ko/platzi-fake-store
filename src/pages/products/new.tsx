import { GetServerSideProps } from 'next';
import axios from 'axios';
import NewProductForm from '@/modules/products/components/NewProductForm';

type Category = {
  id: number;
  name: string;
};

type NewProductPageProps = {
  categories: Category[];
};

export default function NewProductPage({ categories }: NewProductPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewProductForm categories={categories} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get(
      'https://api.escuelajs.co/api/v1/categories'
    );
    return {
      props: {
        categories: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      props: {
        categories: [],
      },
    };
  }
};
