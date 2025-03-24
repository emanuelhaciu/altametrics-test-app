import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
const InvoiceDashboard = lazy(() => import("@/features/invoices/dashboard"));

export default function InvoicesPage() {
  return (
    <div className='w-full'>
      <Suspense fallback={
        <div className="flex justify-center items-center h-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }>
        <InvoiceDashboard />
      </Suspense>
    </div>
  );
}