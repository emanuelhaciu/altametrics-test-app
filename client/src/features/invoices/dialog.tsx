import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InvoiceDto } from "@/dtos/invoice"
import { fetchInvoiceByIdAction } from "@/api/actions/invoices"
import { useQueryWithToast } from "@/providers/react-query/user-query-with-toast"
import { Skeleton } from "@/components/ui/skeleton"

interface InvoiceDetailsDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  invoice: InvoiceDto | null
}

export function InvoiceDetailsDialog({ isOpen, onOpenChange, invoice }: InvoiceDetailsDialogProps) {
  if (!invoice) return null
  
  const { 
    data: detailedInvoice, 
    isLoading, 
    error 
  } = useQueryWithToast({
    queryKey: ['invoice', invoice.id],
    queryFn: () => fetchInvoiceByIdAction(invoice.id as string),
    // Only fetch when dialog is open
    enabled: isOpen && !!invoice.id,
  });

  // Use the detailed invoice data if available, otherwise fall back to the passed invoice
  const invoiceData = detailedInvoice?.data || invoice;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Invoice Details</DialogTitle>
          <DialogDescription>
            Full information about the selected invoice.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="grid grid-cols-2 items-center gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </>
          ) : error ? (
            <div className="text-red-500">
              Error loading invoice details. Please try again.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Date:</span>
                <span>{invoiceData.due_date}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Payee:</span>
                <span>{invoiceData.vendor_name}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Description:</span>
                <span>{invoiceData.description}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Due Date:</span>
                <span>{invoiceData.due_date}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Amount:</span>
                <span>{invoiceData.amount ? `$${invoiceData.amount.toFixed(2)}` : ""}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Status:</span>
                <Badge
                  variant={invoiceData.paid ? "outline" : "secondary"}
                  className={
                    invoiceData.paid ? "border-blue-300 text-blue-500" : "bg-blue-100 text-blue-500"
                  }
                >
                  {invoiceData.paid ? "Paid" : "Open"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Created By:</span>
                <span>{invoiceData.created_by}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Created At:</span>
                <span>{invoiceData.created_at}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Updated At:</span>
                <span>{invoiceData.updated_at}</span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}