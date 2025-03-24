import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TableSkeleton() {
    // Create 5 skeleton rows
    const skeletonRows = Array(15).fill(0);
  
    return (
      <div className="w-full h-full overflow-auto rounded-2xl border-2 border-gray-200">
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
                <TableHead className="!text-center p-2 md:p-4">
                  <div className="h-4 w-4 rounded bg-white/30" />
                </TableHead>
                <TableHead className="text-white border-r-1 border-r-gray-400 p-2 md:p-4 text-sm md:text-base">
                  Date
                </TableHead>
                <TableHead className="text-white border-r-1 border-r-gray-400 p-2 md:p-4 text-sm md:text-base">
                  Payee
                </TableHead>
                <TableHead className="text-white border-r-1 border-r-gray-400 p-2 md:p-4 text-sm md:text-base">
                  Description
                </TableHead>
                <TableHead className="text-white border-r-1 border-r-gray-400 p-2 md:p-4 text-sm md:text-base">
                  Due Date
                </TableHead>
                <TableHead className="text-white border-r-1 border-r-gray-400 p-2 md:p-4 text-sm md:text-base">
                  Amount
                </TableHead>
                <TableHead className="text-white border-r-1 border-r-gray-400 p-2 md:p-4 text-sm md:text-base">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skeletonRows.map((_, index) => (
                <TableRow key={index} className="animate-pulse">
                  <TableCell className="p-2 md:p-4">
                    <div className="h-4 w-4 rounded bg-gray-200" />
                  </TableCell>
                  <TableCell className="text-start border-r-1 border-gray-400 p-2 md:p-4">
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                  </TableCell>
                  <TableCell className="text-start border-r-1 border-gray-400 p-2 md:p-4">
                    <div className="h-4 w-5/6 rounded bg-gray-200" />
                  </TableCell>
                  <TableCell className="text-start border-r-1 border-gray-400 p-2 md:p-4">
                    <div className="h-4 w-11/12 rounded bg-gray-200" />
                  </TableCell>
                  <TableCell className="text-start border-r-1 border-gray-400 p-2 md:p-4">
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                  </TableCell>
                  <TableCell className="text-start border-r-1 border-gray-400 p-2 md:p-4">
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                  </TableCell>
                  <TableCell className="text-start p-2 md:p-4">
                    <div className="h-6 w-16 rounded-full bg-gray-200" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }