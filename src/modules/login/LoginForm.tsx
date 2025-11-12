import { ConfirmationBox } from '@/components';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import router from 'next/router';
import { useState } from 'react';

type FormState = 'editing' | 'success' | 'error';

export default function LoginForm() {
  const [formState, setFormState] = useState<FormState>('editing');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const login = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await axios.post(
        '/api/authenticate',
        { login, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      router.push('/');
    } catch (error) {
      let errorMessage;
      if (axios.isAxiosError(error)) {
        errorMessage =
          'Authentication failed:' +
          (error.response?.data?.error || error.message);
        console.error(errorMessage);
      } else {
        errorMessage = 'Unexpected error:' + error;
        console.error(errorMessage);
      }

      setFormState('error');
      setErrorMessage('Authentication failed');
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {formState === 'error' && (
            <div className="mb-6">
              <ConfirmationBox
                title={errorMessage || 'Error logging in'}
                type="error"
                icon={
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                }
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="john@mail.com"
                  className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-700"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Forgot password?
                    </a>
                  </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
