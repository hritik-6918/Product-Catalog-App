import { useState, useCallback } from 'react';
import { PaginationState, PaginationRange } from '../types/pagination';

export function usePagination(initialTotal: number = 0, initialPageSize: number = 12) {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
    total: initialTotal,
  });

  const getPaginationRange = useCallback((): PaginationRange => {
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return {
      start,
      end,
      total: pagination.total,
    };
  }, [pagination]);

  const setPage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  const setTotal = useCallback((total: number) => {
    setPagination(prev => ({ ...prev, total }));
  }, []);

  return {
    pagination,
    getPaginationRange,
    setPage,
    setTotal,
  };
}