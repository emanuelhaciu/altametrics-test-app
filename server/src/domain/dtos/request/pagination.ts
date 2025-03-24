export interface RequestWithPagination extends Request {
   pagination?: {
      page: number;
      limit: number;
      skip: number;
   };
}
