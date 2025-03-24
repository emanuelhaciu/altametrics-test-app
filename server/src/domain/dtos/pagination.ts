import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
   @IsOptional()
   @Type(() => Number)
   @IsNumber()
   @Min(1)
   page?: number = 1;

   @IsOptional()
   @Type(() => Number)
   @IsNumber()
   @Min(1)
   limit?: number = 10;
}

export class PaginatedResponseDto<T> {
   results: T[];
   meta: {
      totalItems: number;
      itemsPerPage: number;
      currentPage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
   };
   message: string;
}
