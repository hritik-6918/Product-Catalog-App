export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface PaginationRange {
  start: number;
  end: number;
  total: number;
}