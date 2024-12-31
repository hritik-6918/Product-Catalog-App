import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationState } from '../types/pagination';

interface PaginationProps {
  pagination: PaginationState;
  onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { page, pageSize, total } = pagination;
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(p => 
    p === 1 || 
    p === totalPages || 
    (p >= page - 1 && p <= page + 1)
  );

  return (
    <nav className="flex items-center justify-center space-x-1 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {visiblePages.map((p, i) => {
        const prevPage = visiblePages[i - 1];
        if (prevPage && p - prevPage > 1) {
          return (
            <React.Fragment key={p}>
              <span className="px-2 text-gray-500">...</span>
              <button
                onClick={() => onPageChange(p)}
                className={`px-3 py-1 rounded-md ${
                  p === page
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {p}
              </button>
            </React.Fragment>
          );
        }
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-md ${
              p === page
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
}