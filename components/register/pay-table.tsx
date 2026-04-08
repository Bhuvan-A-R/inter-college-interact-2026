"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

// Define the type for a payment screenshot record
export type PaymentScreenshotData = {
  id: string;
  collegeName: string;
  paymentUrl: string;
};

export function PaymentScreenshotTable({
  data,
}: {
  data: PaymentScreenshotData[];
}) {
  const router = useRouter();
  const [rows] = React.useState<PaymentScreenshotData[]>(data);

  // Define the table columns
  const columns = React.useMemo<ColumnDef<PaymentScreenshotData>[]>(
    () => [
      {
        accessorKey: "slno",
        header: "SL No",
        cell: ({ row, table }) => {
          const { pagination } = table.getState();
          return pagination.pageIndex * pagination.pageSize + row.index + 1;
        },
      },
      {
        accessorKey: "collegeName",
        header: "College Name",
        cell: ({ row }) => {
          return (
            <div className="capitalize">
              {row.getValue("collegeName") as string}
            </div>
          );
        },
      },
      {
        accessorKey: "paymentUrl",
        header: "Payment Screenshot",
        cell: ({ row }) => {
          // Create an image URL based on your upload service
          const paymentUrl = row.getValue("paymentUrl") as string;
          const imageUrl = getImageUrl(paymentUrl);
          return (
            <Image
              src={imageUrl}
              alt="Payment Screenshot Thumbnail"
              width={80}
              height={80}
              className="rounded object-cover"
            />
          );
        },
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
          const payment = row.original;
          return (
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/admin/payment-screenshots/${payment.id}`)
              }
            >
              View
            </Button>
          );
        },
      },
    ],
    [router],
  );

  // Initialize the table with pagination
  const table = useReactTable({
    data: rows,
    columns,
    initialState: { pagination: { pageSize: 10 } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full px-5 rounded-xl my-12">
      {/* Table */}
      <div className="rounded-md border overflow-auto shadow-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-10"
                >
                  No Payment Screenshots Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="border rounded p-1 text-black"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
