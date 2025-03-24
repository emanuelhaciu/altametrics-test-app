export interface PaginationMeta {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }

  export interface PaginatedResponse<T> {
    results: T[];
    meta: PaginationMeta;
  }