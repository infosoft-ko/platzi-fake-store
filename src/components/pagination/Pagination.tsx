import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export type PaginationProps = {
  totalItems?: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  testId?: string;
};

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  testId,
}: PaginationProps) {
  const currentPageItemsStart = currentPage * itemsPerPage + 1;
  const currentPageItemsEnd = currentPage * itemsPerPage + itemsPerPage;
  const isFirstPage = currentPage === 0;

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    e.preventDefault();
    if (isFirstPage && page < 0) {
      return;
    }
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-between border-t border-white/10 px-2 py-3 sm:px-3" data-testid={testId}>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing items{' '}
            <span className="font-medium">{currentPageItemsStart}</span> to{' '}
            <span className="font-medium">{currentPageItemsEnd}</span>
            {totalItems && `of ${totalItems}`}
          </p>
        </div>
      </div>

      <nav
        aria-label="Pagination"
        className="isolate flex flex-1 -space-x-px justify-between lg:justify-end"
      >
        <a
          href="#"
          onClick={e => {
            handlePageChange(e, currentPage - 1);
          }}
          className={`relative inline-flex items-center border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-700 ${
            isFirstPage
              ? 'opacity-50 cursor-not-allowed pointer-events-none'
              : 'hover:bg-white/10'
          }`}
          aria-disabled={isFirstPage}
        >
          <ChevronLeftIcon aria-hidden="true" className="size-5" />
          Previous
        </a>
        <a
          href="#"
          onClick={e => handlePageChange(e, currentPage + 1)}
          className="relative ml-3 inline-flex items-center border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white/10"
        >
          Next
          <ChevronRightIcon aria-hidden="true" className="size-5" />
        </a>
      </nav>
    </div>
  );
}
