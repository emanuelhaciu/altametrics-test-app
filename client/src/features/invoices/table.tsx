import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchInvoicesAction } from "@/api/actions/invoices";
import { InvoiceDto } from "@/dtos/invoice";
import { TableSkeleton } from "./loaders";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/dtos/pagination-meta";
import React from "react";
import { queryClient } from "@/providers/react-query/query-client";

interface InvoiceTableProps {
  onRowClick: (invoice: InvoiceDto) => void;
}

export function InvoiceTable({ onRowClick }: InvoiceTableProps) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const {
    data: invoices,
    isLoading,
    isFetching,
    isPlaceholderData,
  } = useQuery<PaginatedResponse<InvoiceDto>, Error>({
    queryKey: ["invoices", page, limit],
    queryFn: () => fetchInvoicesAction(page, limit),
    placeholderData: keepPreviousData,
  });

  // Prefetch the next page!
  React.useEffect(() => {
    if (!isPlaceholderData && invoices?.meta?.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ["invoices", page + 1],
        queryFn: () => fetchInvoicesAction(page + 1, limit),
      });
    }
  }, [invoices, isPlaceholderData, page, queryClient]);

  const handlePreviousPage = () => {
    if (invoices?.meta?.hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (invoices?.meta?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  console.log(invoices);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-auto rounded-2xl border-2 border-gray-200">
        <div className="min-w-[950px] rounded-2xl">
          <Table className="w-full table-fixed">
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "28%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <TableHeader className="bg-[#a8b8f0] sticky top-0">
              <TableRow>
                <TableHead className="p-4">
                  <Checkbox className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" />
                </TableHead>
                <TableHead className="text-white border-r-1 border-r-gray-400 text-sm md:text-base">
                  Date
                </TableHead>
                <TableHead className="text-white border-r-1 border-r-gray-400  text-sm md:text-base">
                  Payee
                </TableHead>
                <TableHead className="text-white border-r-1 border-r-gray-400 text-sm md:text-base">
                  Description
                </TableHead>
                <TableHead className="text-white border-r-1 border-r-gray-400  text-sm md:text-base">
                  Due Date
                </TableHead>
                <TableHead className="text-white border-r-1 border-r-gray-400  text-sm md:text-base">
                  Amount
                </TableHead>
                <TableHead className="text-white border-r-1 border-r-gray-400 text-sm md:text-base">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(invoices?.results) &&
                invoices.results.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    onClick={() => onRowClick(invoice)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 md:p-4"
                    >
                      <Checkbox className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" />
                    </TableCell>
                    <TableCell className="text-start border-r-1 border-gray-400 p-2 md:p-4 text-sm md:text-base truncate">
                      {invoice.created_at}
                    </TableCell>
                    <TableCell className="text-start border-r-1 border-gray-400 p-2 md:p-4 text-sm md:text-base truncate">
                      {invoice.vendor_name}
                    </TableCell>
                    <TableCell className="text-start border-r-1 border-gray-400 p-2 md:p-4 text-sm md:text-base truncate">
                      {invoice.description}
                    </TableCell>
                    <TableCell className="text-start border-r-1 border-gray-400 p-2 md:p-4 text-sm md:text-base truncate">
                      {invoice.due_date}
                    </TableCell>
                    <TableCell className="text-start border-r-1 border-gray-400 p-2 md:p-4 text-sm md:text-base">
                      {invoice.amount ? `$ ${invoice.amount.toFixed(2)}` : ""}
                    </TableCell>
                    <TableCell className="text-start p-2 md:p-4">
                      <Badge
                        variant={
                          invoice.paid === true ? "outline" : "secondary"
                        }
                        className={
                          invoice.paid === true
                            ? "border-blue-300 text-blue-500"
                            : "bg-blue-100 text-blue-500"
                        }
                      >
                        {invoice.paid ? "Paid" : "Open"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination controls */}
      {invoices?.meta && (
        <div className="flex justify-between items-center mt-4 px-4">
          <div className="text-sm text-gray-500">
            Showing{" "}
            {invoices.meta.itemsPerPage * (invoices.meta.currentPage - 1) + 1}{" "}
            to{" "}
            {Math.min(
              invoices.meta.itemsPerPage * invoices.meta.currentPage,
              invoices.meta.totalItems
            )}{" "}
            of {invoices.meta.totalItems} invoices
          </div>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              onClick={handlePreviousPage}
              disabled={!invoices.meta.hasPreviousPage || isFetching}
              className="hover:bg-gray-200"
            >
              Previous
            </Button>
            {isFetching && (
              <span className="text-sm text-gray-500">Loading...</span>
            )}
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={!invoices?.meta?.hasNextPage || isFetching}
              className="hover:bg-gray-200"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
