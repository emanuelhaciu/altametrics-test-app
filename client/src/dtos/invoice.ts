import {z} from 'zod'
import { ApiResponse } from './api-response';


// Define a base invoice schema
const InvoiceSchema = z.object({
  id: z.string(),
  vendor_name: z.string(),
  due_date: z.string(), 
  description: z.string(),
  amount: z.number(),
  paid: z.boolean(),
  created_at: z.string(),
  updated_at: z.string().optional(),
  created_by: z.string().optional(),
})

export type InvoiceDto = z.infer<typeof InvoiceSchema>;

export type FetechInvoiceResponse = ApiResponse<InvoiceDto>;
export type FetechInvoicesResponse = ApiResponse<InvoiceDto[]>;