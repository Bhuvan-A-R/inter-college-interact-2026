"use client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  ArrowLeft,
  ArrowRight,
  Columns,
  FileDown,
  ListFilterIcon,
  Search,
} from "lucide-react";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export type Data = {
  id: string;
  collegeName: string;
  collegeCode: string | null;
  region: string;
  phone: string;
  email: string;
  paymentUrl: string | null;
  txnNumber: string | null;
  Amount: number | null;
  paymentVerified: string | null;
  events: number;
  registration: number;
};

export function DataTable({ data }: { data: Data[] }) {
  const router = useRouter();
  const [rows, setRows] = React.useState<Data[]>(data);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo<ColumnDef<Data>[]>(
    () => [
      {
        accessorKey: "slno",
        header: "SL No",
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "collegeName",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            College Name
            <ArrowUpDown className="p-1" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("collegeName")}</div>
        ),
      },
      {
        accessorKey: "collegeCode",
        header: "College Code",
        cell: ({ row }) => row.getValue("collegeCode"),
      },
      {
        accessorKey: "region",
        header: ({ column }) => {
          const filterCycle = [
            "",
            "Bengaluru Region (1)",
            "Belgavi Region (2)",
            "Kalaburgi Region (3)",
            "Mysuru Region (4)",
          ];
          const currentFilter = (column.getFilterValue() as string) ?? "";
          const currentIndex = filterCycle.indexOf(currentFilter);
          const nextIndex = (currentIndex + 1) % filterCycle.length;
          const nextFilter = filterCycle[nextIndex];

          const handleFilterChange = () => {
            if (nextFilter === "") {
              column.setFilterValue(undefined); // Clears the filter
            } else {
              column.setFilterValue(nextFilter);
            }
          };

          return (
            <Button variant="ghost" onClick={handleFilterChange}>
              Region <ListFilterIcon className="p-1" />{" "}
              {currentFilter !== "" ? `: ${currentFilter}` : ""}
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("region")}</div>
        ),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue === "") return true;

          const type = row.getValue(columnId);
          return type === filterValue;
        },
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => row.getValue("phone"),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => row.getValue("email"),
      },
      {
        accessorKey: "paymentUrl",
        header: ({ column }) => {
          const filterCycle = ["", "Paid", "Not Paid"];
          const currentFilter = (column.getFilterValue() as string) ?? "";
          const currentIndex = filterCycle.indexOf(currentFilter);
          const nextIndex = (currentIndex + 1) % filterCycle.length;
          const nextFilter = filterCycle[nextIndex];

          const handleFilterChange = () => {
            if (nextFilter === "") {
              column.setFilterValue(undefined); // Clears the filter
            } else {
              column.setFilterValue(nextFilter);
            }
          };

          return (
            <Button variant="ghost" onClick={handleFilterChange}>
              Payment URL <ListFilterIcon className="p-1" />{" "}
              {currentFilter !== "" ? `: ${currentFilter}` : ""}
            </Button>
          );
        },
        cell: ({ row }) => {
          const imageKey = row.getValue("paymentUrl");
          const imageUrl = `https://${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}.ufs.sh/f/${imageKey}`;
          return (
            <>
              {imageKey ? (
                <Link href={imageUrl} target="_blank">
                  <Button>Payment ScreenShot</Button>
                </Link>
              ) : (
                <span>Payment Screenshot not Uploaded/Payment Not Done</span>
              )}
            </>
          );
        },
        filterFn: (row, columnId, filterValue) => {
          const imageKey = row.getValue(columnId);
          if (filterValue === "Paid") {
            return !!imageKey;
          } else if (filterValue === "Not Paid") {
            return !imageKey;
          }
          return true;
        },
      },
      {
        accessorKey: "txnNumber",
        header: "Transaction Number",
        cell: ({ row }) => row.getValue("txnNumber") || "Payment Not Done",
      },
      {
        accessorKey: "Amount",
        header: ({ column }) => {
          const filterCycle = ["", "8000", "4000"];
          const currentFilter = (column.getFilterValue() as string) ?? "";
          const currentIndex = filterCycle.indexOf(currentFilter);
          const nextIndex = (currentIndex + 1) % filterCycle.length;
          const nextFilter = filterCycle[nextIndex];

          const handleFilterChange = () => {
            if (nextFilter === "") {
              column.setFilterValue(undefined); // Clears the filter
            } else {
              column.setFilterValue(nextFilter);
            }
          };

          return (
            <Button variant="ghost" onClick={handleFilterChange}>
              Amount <ListFilterIcon className="p-1" />{" "}
              {currentFilter !== "" ? `: ${currentFilter}` : ""}
            </Button>
          );
        },
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue === "") return true;

          const amount = row.getValue(columnId);
          return amount == filterValue;
        },
      },
      // {
      //     accessorKey: "paymentVerified",
      //     header: "Payment Verified",
      //     cell: ({ row }) => row.getValue("paymentVerified"),
      // },
      {
        accessorKey: "events",
        header: "Events",
        cell: ({ row }) => row.getValue("events"),
      },
      {
        accessorKey: "registration",
        header: "Registration",
        cell: ({ row }) => row.getValue("registration"),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: rows,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Use the final row model to get the filtered + sorted data
  const handleExportToPDF = () => {
    // Pull final rows from the table’s computed row model:
    const filteredSortedRows = table.getRowModel().rows;

    // Prepare data for PDF
    const exportData: (string | number)[][] = filteredSortedRows.map((row) => [
      String(row.getValue("collegeName")),
      String(row.getValue("collegeCode") ?? ""),
      String(row.getValue("region")),
      String(row.getValue("phone")),
      String(row.getValue("email")),
      String(row.getValue("txnNumber") || "Payment Not Done"),
      Number(row.getValue("Amount") || 0),
      Number(row.getValue("events")),
      Number(row.getValue("registration")),
    ]);

    // Column headers for PDF
    const headers = [
      [
        "College Name",
        "College Code",
        "Region",
        "Phone",
        "Email",
        "Transaction Number",
        "Amount",
        "Events",
        "Registration",
      ],
    ];

    // Initialize jsPDF
    const doc = new jsPDF();

    // Load the PNG template
    const img = document.createElement("img");
    img.src = "/images/gatformat.jpg"; // Replace with the actual template path

    img.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Add the template as a background
      doc.addImage(img, "PNG", 0, 0, pageWidth, pageHeight);

      // Add table
      autoTable(doc, {
        head: headers,
        body: exportData,
        startY: 80, // Adjust this to fit within the template
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [26, 188, 156] }, // #1abc9c in RGB
      });

      // Add signatures at the bottom
      doc.text("Principal's Signature", 14, pageHeight - 20);
      doc.text("Coordinator's Signature", pageWidth - 80, pageHeight - 20);

      // Save the PDF
      doc.save("registrants.pdf");
    };
  };

  const handleExportToExcel = () => {
    // Pull final rows from the table’s computed row model:
    const filteredSortedRows = table.getRowModel().rows;

    // Prepare data for Excel
    const exportData = filteredSortedRows.map((row) => ({
      collegeName: row.getValue("collegeName"),
      collegeCode: row.getValue("collegeCode"),
      region: row.getValue("region"),
      phone: row.getValue("phone"),
      email: row.getValue("email"),
      txnNumber: row.getValue("txnNumber") || "Payment Not Done",
      Amount: row.getValue("Amount") || 0,
      events: row.getValue("events"),
      registration: row.getValue("registration"),
    }));

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "college Details");

    // Write the workbook to a file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "collegeDetails.xlsx");
  };

  return (
    <div className="w-full px-5 rounded-xl my-12">
      <div className="flex items-center py-4 flex-wrap gap-3 ">
        <div className="relative max-w-sm ">
          <Search className="absolute left-2 top-3 h-4 w-5 text-muted-foreground " />
          <Input
            placeholder="Search name..."
            value={
              (table.getColumn("collegeName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("collegeName")?.setFilterValue(event.target.value)
            }
            className="pl-10 w-[26rem]"
          />
        </div>
        <Button
          variant="outline"
          className="ml-auto bg-[#00B140] text-white hover:scale-105 hover:bg-[#00B140] hover:text-white "
          onClick={handleExportToPDF}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Download current view as PDF
        </Button>
        <Button
          variant="outline"
          className="ml-auto bg-[#00B140] text-white hover:scale-105 hover:bg-[#00B140] hover:text-white "
          onClick={handleExportToExcel}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Download current view as Excel
        </Button>
        <Button
          variant="outline"
          className="ml-auto bg-[#00B140] text-white hover:scale-105 hover:bg-[#00B140] hover:text-white "
          onClick={() =>
            router.push("/registrationTeamDashboard/registrationdetails")
          }
        >
          Go To Registration List
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              <Columns className="mr-2 h-4 w-4" />
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-auto  min-h-[18rem]">
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
            {/* ${row.getValue('type') === 'Participant' ? 'text-blue-500' : row.getValue('type') === 'Accompanist'? 'text-teal-600': row.getValue('type')=== 'Team Manager'? 'text-violet-800':'text-rose-700'}` */}
          </TableHeader>
          <TableBody className="text-primary ">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={`hover:bg-blue-50 text-black `}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      // onClick={() => {
                      //     if (
                      //         cell.column.id === "usn" ||
                      //         cell.column.id === "name" ||
                      //         cell.column.id === "photo"
                      //     ) {
                      //         const cellValue =
                      //             row.getValue("usn");
                      //         router.push(
                      //             `/register/getregister/${cellValue}`
                      //         );
                      //     }
                      // }}
                    >
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
                  className="min-h-[18rem] text-3xl    text-center "
                >
                  No Registrations Are Done Yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
