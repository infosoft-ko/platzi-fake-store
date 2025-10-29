import { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import { ConfirmationBox } from '@/components';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';

type Category = {
  id: number;
  name: string;
};

type NewProductFormProps = {
  categories: Category[];
};

type FormData = {
  title: string;
  description: string;
  price: string;
  categoryId: string;
};

type ValidationError = {
  message: string;
  field?: string;
};

type FormState = 'editing' | 'success' | 'error';

export default function NewProductForm({ categories }: NewProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] =
    useState<ValidationError | null>(null);
  const [formState, setFormState] = useState<FormState>('editing');

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    categoryId: '',
  });

  const validate = useCallback(() => {
    const validationErrors: ValidationError[] = [];

    const title = formData.title.trim();
    if (title.length < 5) {
      validationErrors.push({
        message: 'Title must be at least 5 characters long',
        field: 'title',
      });
    }

    const description = formData.description.trim();
    if (description.length < 10) {
      validationErrors.push({
        message: 'Description must be at least 10 characters long',
        field: 'description',
      });
    }

    const price = parseFloat(formData.price);
    if (price < 0) {
      validationErrors.push({
        message: 'Price must be greater than 0',
        field: 'price',
      });
    }

    return validationErrors;
  }, [formData]);

  const isFormValid =
    formData.title.trim() &&
    formData.description.trim() &&
    formData.price &&
    formData.categoryId;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setValidationError(
        validationErrors.length > 0 ? validationErrors[0] : null
      );
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    try {
      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId: parseInt(formData.categoryId),
        images: ['https://placehold.co/600x400'], // no image support for now
      };

      const response = await axios.post(
        'https://api.escuelajs.co/api/v1/products',
        productData
      );

      if (response.status === 201) {
        setFormState('success');
      }
    } catch (error: any) {
      // no API-side validation support for now
      //   if (error.response?.status === 400) {
      //     setValidationError({
      //       message:
      //         error.response.data?.message ||
      //         'Validation failed. Please check your input.',
      //       field: error.response.data?.field,
      //     });
      //   } else {
      setFormState('error');
      setValidationError({
        message:
          'An error occurred while creating the product. Please try again.',
      });
      //   }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      categoryId: '',
    });
    setValidationError(null);
    setFormState('editing');
  };

  const handleAddAnother = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      categoryId: '',
    });
    setValidationError(null);
    setFormState('editing');
  };

  const handleGoToList = () => {
    router.push('/');
  };

  const handleTryAgain = () => {
    setValidationError(null);
    setFormState('editing');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 border border-gray-200 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Add New Product
      </h2>

      {formState === 'success' && (
        <ConfirmationBox
          title="Product Created Successfully!"
          type="success"
          icon={<CheckIcon className="h-5 w-5 text-green-400" />}
          actionsSlot={
            <>
              <PrimaryButton onClick={handleAddAnother}>
                Add Another Product
              </PrimaryButton>
              <SecondaryButton onClick={handleGoToList}>
                Go to Product List
              </SecondaryButton>
            </>
          }
        />
      )}

      {formState === 'error' && (
        <ConfirmationBox
          title="Error Creating Product"
          type="error"
          icon={<ExclamationTriangleIcon className="h-5 w-5 text-red-400" />}
          actionsSlot={
            <>
              <PrimaryButton onClick={handleTryAgain}>Try Again</PrimaryButton>
              <SecondaryButton onClick={handleGoToList}>
                Go to Product List
              </SecondaryButton>
            </>
          }
        />
      )}

      {formState === 'editing' && validationError && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-orange-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-orange-800">
                {validationError.field
                  ? `Error in ${validationError.field}:`
                  : 'Validation Error'}
              </h3>
              <div className="mt-2 text-sm text-orange-700">
                {validationError.message}
              </div>
            </div>
          </div>
        </div>
      )}

      {formState === 'editing' && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Title Field */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Product title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              {/* Description Field */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Product description"
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-vertical"
                />
              </div>

              {/* Price Field */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              {/* Category Field */}
              <div>
                <label
                  htmlFor="categoryId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  style={{ height: '42px' }}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3 mt-8">
              <PrimaryButton
                type="submit"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Product'}
              </PrimaryButton>
              <SecondaryButton
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                Reset
              </SecondaryButton>
            </div>
          </form>

          <p className="mt-8 text-xs text-gray-500 text-left">
            Fields marked with <span className="text-red-500">*</span> are
            required
          </p>
        </>
      )}
    </div>
  );
}
