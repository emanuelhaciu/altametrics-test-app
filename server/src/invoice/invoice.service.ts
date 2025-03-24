import { Injectable, NotFoundException } from '@nestjs/common';
import {
   GetInvoiceByidResponseDto,
   GetInvoicesResponseDto,
} from 'src/domain/dtos/invoice';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { formatDate } from 'src/util/format-date';
@Injectable()
export class InvoiceService {
   constructor(private readonly prisma: PrismaService) {}

   async getInvoices({ page = 1, limit = 10 }): Promise<{
      results: GetInvoicesResponseDto[];
      meta: {
         totalItems: number;
         itemsPerPage: number;
         currentPage: number;
         totalPages: number;
         hasNextPage: boolean;
         hasPreviousPage: boolean;
      };
   }> {
      // Calculate skip value for pagination
      const skip = (page - 1) * limit;

      // Get total count for pagination metadata
      const totalItems = await this.prisma.invoice.count();

      // Get paginated data
      const invoices = await this.prisma.invoice.findMany({
         select: {
            id: true,
            vendor_name: true,
            due_date: true,
            description: true,
            paid: true,
            amount: true,
            createdAt: true,
         },
         skip,
         take: limit,
         orderBy: {
            createdAt: 'desc',
         },
      });

      if (!invoices.length && totalItems > 0) {
         throw new NotFoundException('No invoices found for this page');
      }

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalItems / limit);

      return {
         results: invoices.map((invoice) => ({
            ...invoice,
            due_date: formatDate(invoice.due_date.toISOString()),
            created_at: formatDate(invoice.createdAt.toISOString()),
         })),
         meta: {
            totalItems,
            itemsPerPage: limit,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
         },
      };
   }

   async getInvoiceById(id: string): Promise<GetInvoiceByidResponseDto> {
      const invoice = await this.prisma.invoice.findUnique({
         where: { id },
         select: {
            id: true,
            vendor_name: true,
            due_date: true,
            description: true,
            paid: true,
            amount: true,
            createdAt: true,
            updatedAt: true,
            user: {
               select: {
                  name: true,
               },
            },
         },
      });

      if (!invoice) {
         throw new NotFoundException(`Invoice with ID ${id} not found`);
      }
      const { user, ...invoiceData } = invoice;
      return {
         ...invoiceData,
         created_by: invoice.user.name,
         due_date: formatDate(invoice.due_date.toISOString()),
         created_at: formatDate(invoice.createdAt.toISOString()),
         updated_at: formatDate(invoice.updatedAt.toISOString()),
      };
   }
}
