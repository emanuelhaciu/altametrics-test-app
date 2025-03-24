"use client";
import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { InvoiceDetailsDialog } from "./dialog";
import { InvoiceTable } from "./table";
import { DashboardHeader } from "./header";
import { DashboardSidebar } from "./sidebar";
import { InvoiceDto } from "@/dtos/invoice";

export default function InvoiceDashboard() {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDto | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (invoice: InvoiceDto) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 p-4 bg-[linear-gradient(to_bottom,#e2e8ff,#d5ddff,#c6d4ff)] overflow-hidden">
          <SidebarInset className="flex flex-col bg-white rounded-2xl shadow-sm h-full overflow-hidden">
            <DashboardHeader />

            <main className="flex-1 p-12 overflow-hidden">
              <InvoiceTable onRowClick={handleRowClick} />
            </main>
          </SidebarInset>
        </div>
        <InvoiceDetailsDialog
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          invoice={selectedInvoice}
        />
      </div>
    </SidebarProvider>
  );
}
