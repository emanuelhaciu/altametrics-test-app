import { InvoiceDto } from "@/dtos/invoice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InvoiceState {
    invoice: InvoiceDto | null;
    invoices: InvoiceDto[] | null;
    isLoading: boolean;
}

const initialState: InvoiceState = {
    invoice: null,
    invoices: [],
    isLoading: false
}

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setInvoice: (state, action: PayloadAction<InvoiceDto>) => {
            state.invoice = action.payload;
        },
        setInvoices: (state, action: PayloadAction<InvoiceDto[]>) => {
            state.invoices = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
})

export const { setInvoice, setInvoices, setIsLoading } = invoiceSlice.actions;
export default invoiceSlice.reducer;