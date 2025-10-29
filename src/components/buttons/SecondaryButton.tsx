import { ButtonHTMLAttributes } from 'react';

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function SecondaryButton({
  children,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
    >
      {children}
    </button>
  );
}
