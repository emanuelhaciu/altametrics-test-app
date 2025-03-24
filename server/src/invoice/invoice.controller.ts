import {
   BadRequestException,
   Controller,
   Get,
   Param,
   Req,
   UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from 'src/infrastructure/security/guards/jwt-auth.guard';
import {
   GetInvoiceByidResponseDto,
   GetInvoicesResponseDto,
} from 'src/domain/dtos/invoice';
import { ApiResponse } from 'src/domain/dtos/api-response';
import { PaginatedResponseDto } from 'src/domain/dtos/pagination';
import { RequestWithPagination } from 'src/domain/dtos/request/pagination';

@Controller('invoice')
@UseGuards(JwtAuthGuard)
export class InvoiceController {
   constructor(private readonly invoiceService: InvoiceService) {}

   @Get()
   async getInvoices(
      @Req() request: RequestWithPagination
   ): Promise<PaginatedResponseDto<GetInvoicesResponseDto>> {
      try {
         // Get pagination data from the request object (added by middleware)
         const { page = 1, limit = 10 } = request.pagination || {};

         const paginatedInvoices = await this.invoiceService.getInvoices({
            page,
            limit,
         });
         return {
            ...paginatedInvoices,
            message: 'Invoices fetched successfully',
         };
      } catch (error) {
         throw new BadRequestException(error.message);
      }
   }

   @Get(':id')
   async getInvoiceById(
      @Param('id') id: string
   ): Promise<ApiResponse<GetInvoiceByidResponseDto>> {
      try {
         const invoice = await this.invoiceService.getInvoiceById(id);
         return {
            data: invoice,
            message: 'Invoice fetched successfully',
         };
      } catch (error) {
         throw new BadRequestException(error.message);
      }
   }
}
