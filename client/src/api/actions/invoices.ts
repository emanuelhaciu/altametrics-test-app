import { apiService } from "../api-service/apiService";
import { apiRoutes } from "../api-service/apiRoutes";
import { FetechInvoiceResponse, InvoiceDto } from "@/dtos/invoice";
import { ApiResponse } from "@/dtos/api-response";
import { PaginatedResponse } from "@/dtos/pagination-meta";

export async function fetchInvoicesAction(page: number, limit: number): Promise<PaginatedResponse<InvoiceDto>> {
    try {
        const response = await apiService.get<PaginatedResponse<InvoiceDto>>(apiRoutes.invoices.getAll, {
            params: {
                page,
                limit
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching invoices:', error);   
        throw error;
    }
}

export async function fetchInvoiceByIdAction(id: string): Promise<ApiResponse<InvoiceDto>> {
    try {
        const response = await apiService.get<FetechInvoiceResponse>(
            apiRoutes.invoices.getById.replace(':id', id)
        );
        return response;
    } catch (error) {
        console.error(`Error fetching invoice ${id}:`, error);
        throw error;
    }
}