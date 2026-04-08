"use client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  ArrowLeft,
  ArrowRight,
  Columns,
  FileDown,
  Pencil,
  Search,
  Trash2,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { toast } from "sonner";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

export type Data = {
  id: string;
  collegeCode: string;
  photo: string;
  name: string;
  collegeName: string;
  usn: string;
  phone: string;
  email: string;
  blood: string; // used here as DOB per your original code
  gender: string;
  type: "Participant" | "";
  events: { eventName: string; role?: "Participant" }[];
  status: "Pending" | "Processing" | "Success" | "Failed";
};

//////////////////////////////
// College Mapping for Code Wise Export
//////////////////////////////
const collegeMapping = [
  {
    collegeName: "BGS COLLEGE OF ENGINEERING & TECHNOLOGY",
    collegeCode: "GA-001",
    studentStart: 1001,
  },
  {
    collegeName: "VIVEKANANDA COLLEGE OF ENGINEERING AND TECHNOLOGY",
    collegeCode: "GA-002",
    studentStart: 1051,
  },
  {
    collegeName: "ADICHUNCHANAGIRI INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-003",
    studentStart: 1101,
  },
  {
    collegeName: "GURU NANAK DEV ENGINEERING COLLEGE",
    collegeCode: "GA-004",
    studentStart: 1151,
  },
  {
    collegeName: "M.S.RAMAIAH INSTITUTE OF TECHNIOLOGY",
    collegeCode: "GA-005",
    studentStart: 1201,
  },
  {
    collegeName: "C.M.R INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-006",
    studentStart: 1251,
  },
  {
    collegeName: "JYOTHY INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-007",
    studentStart: 1301,
  },
  {
    collegeName: "DR. T THIMAIAH INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-008",
    studentStart: 1351,
  },
  {
    collegeName: "HIRASUGAR INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-009",
    studentStart: 1401,
  },
  {
    collegeName: "BLDEAS COLLEGE OF ENGINEERING",
    collegeCode: "GA-010",
    studentStart: 1451,
  },
  {
    collegeName: "KALPATARU INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-011",
    studentStart: 1501,
  },
  {
    collegeName: "SRI SAIRAM COLLEGE OF ENGINEERING",
    collegeCode: "GA-012",
    studentStart: 1551,
  },
  {
    collegeName: "R.L.JALAPPA INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-013",
    studentStart: 1601,
  },
  {
    collegeName: "ACHARAYA INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-014",
    studentStart: 1651,
  },
  {
    collegeName: "NATIONAL INSTITUTE OF ENGINEERING",
    collegeCode: "GA-015",
    studentStart: 1701,
  },
  {
    collegeName: "SEA COLLEGE OF ENGINEERING AND TECHNOLOGY",
    collegeCode: "GA-016",
    studentStart: 1751,
  },
  {
    collegeName: "BEARYS INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-017",
    studentStart: 1801,
  },
  {
    collegeName: "ALVAS INST. OF ENGG. AND TECHNOLOGY",
    collegeCode: "GA-018",
    studentStart: 1851,
  },
  {
    collegeName: "JAWAHARLAL NEHRU NATIONAL COLLEGE OF ENGINERING",
    collegeCode: "GA-019",
    studentStart: 1901,
  },
  {
    collegeName: "BMS INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-020",
    studentStart: 1951,
  },
  {
    collegeName: "RNS INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-021",
    studentStart: 2001,
  },
  {
    collegeName: "B.N.M.INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-022",
    studentStart: 2051,
  },
  {
    collegeName: "BELLARY ENGINEERING COLLEGE",
    collegeCode: "GA-023",
    studentStart: 2101,
  },
  {
    collegeName: "SAI VIDYA INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-024",
    studentStart: 2151,
  },
  {
    collegeName: "SJM INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-025",
    studentStart: 2201,
  },
  {
    collegeName: "VEMANA INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-026",
    studentStart: 2251,
  },
  {
    collegeName: "Sahyadri Institute of Tech. & Mgmt., Mangaluru",
    collegeCode: "GA-027",
    studentStart: 2301,
  },
  {
    collegeName: "PROUDADEVARAYA INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-028",
    studentStart: 2351,
  },
  {
    collegeName: "SAMBHRAM INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-029",
    studentStart: 2401,
  },
  {
    collegeName: "P.E.S COLLEGE OF ENGINEERING",
    collegeCode: "GA-030",
    studentStart: 2451,
  },
  {
    collegeName: "RAJARAJESWARI COLLEGE OF ENGINEERING",
    collegeCode: "GA-031",
    studentStart: 2501,
  },
  {
    collegeName: "JSS ACADEMY OF TECHNICIAL EDUCATION",
    collegeCode: "GA-032",
    studentStart: 2551,
  },
  {
    collegeName: "KNS INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-033",
    studentStart: 2601,
  },
  {
    collegeName: "ATRIA INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-034",
    studentStart: 2651,
  },
  {
    collegeName: "K.S.INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-035",
    studentStart: 2701,
  },
  {
    collegeName: "T. JOHN INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-036",
    studentStart: 2751,
  },
  {
    collegeName: "VIVEKANANDA INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-037",
    studentStart: 2801,
  },
  {
    collegeName: "SRINIVAS INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-038",
    studentStart: 2851,
  },
  {
    collegeName: "PES INSITUTE OF TECHNOLOGY AND MGMT.",
    collegeCode: "GA-039",
    studentStart: 2901,
  },
  {
    collegeName: "GOVT. ENGINEERING COLLEGE HASSAN",
    collegeCode: "GA-040",
    studentStart: 2951,
  },
  {
    collegeName: "GSSS INSTITUTE OF ENGINEERING AND TECHNOLOGY FOR WOMEN",
    collegeCode: "GA-041",
    studentStart: 3001,
  },
  {
    collegeName: "GOVT. ENGINEERING COLLEGE RAMNAGAR",
    collegeCode: "GA-042",
    studentStart: 3051,
  },
  {
    collegeName: "DAYANANDA SAGAR COLLEGE OF ENGINEERING",
    collegeCode: "GA-043",
    studentStart: 3101,
  },
  {
    collegeName: "S.J.C INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-044",
    studentStart: 3151,
  },
  {
    collegeName: "DON BOSCO INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-045",
    studentStart: 3201,
  },
  {
    collegeName: "SDM COLLEGE OF ENGINEERING AND TECHNOLOGY",
    collegeCode: "GA-046",
    studentStart: 3251,
  },
  {
    collegeName: "GLOBAL ACADEMY OF TECHNOLOGY",
    collegeCode: "GA-047",
    studentStart: 3301,
  },
  {
    collegeName: "NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-048",
    studentStart: 3351,
  },
  {
    collegeName: "BAPUJI INSTITUTE OF ENGINEERING AND TECHNOLOGY",
    collegeCode: "GA-049",
    studentStart: 3401,
  },
  {
    collegeName: "SRI VENKATESHWARA COLLEGE OF ENGINEERING",
    collegeCode: "GA-050",
    studentStart: 3451,
  },
  {
    collegeName: "BMS COLLEGE OF ENGINEERING",
    collegeCode: "GA-051",
    studentStart: 3501,
  },
  {
    collegeName: "KLS GOGTE INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-052",
    studentStart: 3551,
  },
  {
    collegeName: "ACHARYS NRV SCHOOL OF ARCHITECTURE",
    collegeCode: "GA-053",
    studentStart: 3601,
  },
  {
    collegeName: "SHRI MADHWA VADIRAJA INSTITUTE OF TECHNOLOGY& MANAGEMENT",
    collegeCode: "GA-054",
    studentStart: 3651,
  },
  {
    collegeName: "MVJ COLLEGE OF ENGINEERING",
    collegeCode: "GA-055",
    studentStart: 3701,
  },
  {
    collegeName: "R.V.COLLEGE OF ENGINEERING",
    collegeCode: "GA-056",
    studentStart: 3751,
  },
  {
    collegeName: "MANGALORE INSTITUTE OF TECHNOLOGY AND ENGINEERING",
    collegeCode: "GA-057",
    studentStart: 3801,
  },
  {
    collegeName: "SIDDAGANGA INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-058",
    studentStart: 3851,
  },
  {
    collegeName: "OXFORD COLLEGE OF ENGINEERING",
    collegeCode: "GA-059",
    studentStart: 3901,
  },
  {
    collegeName: "NAGARJUNA COLLEGE OF ENGINEERING AND TECHNOLOGY",
    collegeCode: "GA-060",
    studentStart: 3951,
  },
  {
    collegeName: "A.P.S COLLEGE OF ENGINEERING",
    collegeCode: "GA-061",
    studentStart: 4001,
  },
  {
    collegeName: "DAYANANDA SAGAR ACADEMY OF TECHNOLOGY AND MGMT.",
    collegeCode: "GA-062",
    studentStart: 4051,
  },
  {
    collegeName: "EAST WEST INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-063",
    studentStart: 4101,
  },
  {
    collegeName: "SRI DHARMASTHAL MANJUNATHESHWAR INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-064",
    studentStart: 4151,
  },
  {
    collegeName: "SRI TONTADARAYA COLLEGE OF ENGINEERING",
    collegeCode: "GA-065",
    studentStart: 4201,
  },
  {
    collegeName:
      "UBDT ENGINEERING COLLEGE DAVANAGERE ( Constituent College of VTU )",
    collegeCode: "GA-066",
    studentStart: 4251,
  },
  {
    collegeName: "YENEPOYA INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-067",
    studentStart: 4301,
  },
  {
    collegeName: "KLE INSTITUTE OF TECH HUBLI",
    collegeCode: "GA-068",
    studentStart: 4351,
  },
  {
    collegeName: "KLE COLLEGE OF ENG. AND TECHNOLOGY CHIKODI",
    collegeCode: "GA-069",
    studentStart: 4401,
  },
  {
    collegeName: "ACS COLLEGE OF ENGINEERING",
    collegeCode: "GA-070",
    studentStart: 4451,
  },
  {
    collegeName: "RV Institute of Technology and Management",
    collegeCode: "GA-071",
    studentStart: 4501,
  },
  {
    collegeName: "BASAVESHWARA ENGINERING COLLEGE",
    collegeCode: "GA-072",
    studentStart: 4551,
  },
  {
    collegeName: "CITY ENGINEERING COLLEGE",
    collegeCode: "GA-073",
    studentStart: 4601,
  },
  {
    collegeName: "SJB INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-074",
    studentStart: 4651,
  },
  {
    collegeName: "ST.Joseph ENGINEERING COLLEGE",
    collegeCode: "GA-075",
    studentStart: 4701,
  },
  {
    collegeName: "MALNAD COLLEGE OF ENGINEERING",
    collegeCode: "GA-076",
    studentStart: 4751,
  },
  {
    collegeName: "R R INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-077",
    studentStart: 4801,
  },
  {
    collegeName: "CHANNA BASAVESHWARA INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-078",
    studentStart: 4851,
  },
  {
    collegeName: "SHRIDEVI INSTITUTE OF ENGINEERING AND TECHNOLOGY",
    collegeCode: "GA-079",
    studentStart: 4901,
  },
  {
    collegeName: "MAHARAJA INSTITUTE OF TECH",
    collegeCode: "GA-080",
    studentStart: 4951,
  },
  {
    collegeName: "COORG INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-081",
    studentStart: 5051,
  },
  {
    collegeName: "AGM RURAL COLLEGE OF ENGINEERING &TECHNOLOGY",
    collegeCode: "GA-082",
    studentStart: 5101,
  },
  {
    collegeName: "BAHUBALI COLLEGE OF ENGINEERING",
    collegeCode: "GA-083",
    studentStart: 5151,
  },
  {
    collegeName: "V S M'S INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-084",
    studentStart: 5201,
  },
  {
    collegeName: "HKBK COLLEGE OF ENGINEERING",
    collegeCode: "GA-085",
    studentStart: 5251,
  },
  {
    collegeName: "GOVT. ENGINEERING COLLEGE MANDYA",
    collegeCode: "GA-086",
    studentStart: 5301,
  },
  {
    collegeName: "Government Engineering College Mosalehosahalli Hassan",
    collegeCode: "GA-087",
    studentStart: 5351,
  },
  {
    collegeName: "BANGALORE INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-088",
    studentStart: 5401,
  },
  {
    collegeName: "ACADEMY FOR TECHNICAL AND MANAGEMENT EXCELLENCE",
    collegeCode: "GA-089",
    studentStart: 5451,
  },
  {
    collegeName: "SIR M. VISVESVARAYA INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-090",
    studentStart: 5501,
  },
  {
    collegeName: "K.S SCHOOL OF ENGG & MGMT",
    collegeCode: "GA-091",
    studentStart: 5551,
  },
  {
    collegeName: "NEW HORIZON COLLEGE OF ENGINEERING",
    collegeCode: "GA-092",
    studentStart: 5601,
  },
  {
    collegeName: "BANGALORE TECHNOLOGICAL INSTITUTE",
    collegeCode: "GA-093",
    studentStart: 5651,
  },
  {
    collegeName: "BHEEMANNA KHANDRE INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-094",
    studentStart: 5701,
  },
  {
    collegeName: "VISHWANATHA RAO DESHPANDE RURAL INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-095",
    studentStart: 5751,
  },
  {
    collegeName: "DR. AMBEDKAR INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-096",
    studentStart: 5801,
  },
  {
    collegeName: "BMS SCHOOL OF ARCHITECTURE",
    collegeCode: "GA-097",
    studentStart: 5851,
  },
  {
    collegeName: "GOVERNMENT S.K.S.J.T. INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-098",
    studentStart: 5901,
  },
  {
    collegeName: "CAMBRIDGE INSTITUTE OF TECHNOLOGY",
    collegeCode: "GA-099",
    studentStart: 5951,
  },
  {
    collegeName: "Visveraya Technological University",
    collegeCode: "GA-100",
    studentStart: 6001,
  },
];

//////////////////////////
// College Name Filter
//////////////////////////
type CollegeNameFilterProps = {
  column: any;
  table: any;
};
const CollegeNameFilter: React.FC<CollegeNameFilterProps> = ({
  column,
  table,
}) => {
  const allRows = table.getPreFilteredRowModel().rows;
  const allColleges = allRows.map(
    (row: any) => row.original.collegeName as string,
  );
  const uniqueColleges = Array.from(new Set(allColleges)) as string[];
  const [searchQuery, setSearchQuery] = React.useState("");
  const filteredOptions = uniqueColleges.filter((college) =>
    college.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          College Name
          <ChevronDown className="ml-1 h-4 w-4" />
          {column.getFilterValue()
            ? `: ${column.getFilterValue() as string}`
            : ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 max-h-60 overflow-y-auto">
        <Input
          placeholder="Search college..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-2"
        />
        <DropdownMenuItem
          onClick={() => column.setFilterValue(undefined)}
          className="cursor-pointer"
        >
          All
        </DropdownMenuItem>
        {filteredOptions.map((college) => (
          <DropdownMenuItem
            key={college}
            onClick={() => column.setFilterValue(college)}
            className="cursor-pointer"
          >
            {college}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

//////////////////////////
// Type Column Filter
//////////////////////////
type TypeFilterProps = {
  column: any;
  table: any;
};
const TypeFilter: React.FC<TypeFilterProps> = ({ column, table }) => {
  const types = ["Participant"];
  const [searchQuery, setSearchQuery] = React.useState("");
  const filteredTypes = types.filter((t) =>
    t.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          Type
          <ChevronDown className="ml-1 h-4 w-4" />
          {column.getFilterValue() ? `: ${column.getFilterValue()}` : ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 max-h-60 overflow-y-auto">
        <Input
          placeholder="Search type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-2"
        />
        <DropdownMenuItem
          onClick={() => column.setFilterValue(undefined)}
          className="cursor-pointer"
        >
          All
        </DropdownMenuItem>
        {filteredTypes.map((t) => (
          <DropdownMenuItem
            key={t}
            onClick={() => column.setFilterValue(t)}
            className="cursor-pointer"
          >
            {t}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

//////////////////////////
// Modified Events Filter (for registrants view)
//////////////////////////
type EventFilterProps = {
  column: any;
  table: any;
};
const EventFilter: React.FC<EventFilterProps> = ({ column, table }) => {
  const allRows = table.getPreFilteredRowModel().rows;
  const eventMap = new Map<string, Set<string>>();
  allRows.forEach((row: any) => {
    const events = row.original.events as { eventName: string }[];
    const collegeName = row.original.collegeName;
    events.forEach((e) => {
      if (e.eventName) {
        if (!eventMap.has(e.eventName)) {
          eventMap.set(e.eventName, new Set());
        }
        eventMap.get(e.eventName)?.add(collegeName);
      }
    });
  });
  const options = Array.from(eventMap.entries()).map(([event, collegeSet]) => ({
    event,
    count: collegeSet.size,
  }));
  const [searchQuery, setSearchQuery] = React.useState("");
  const filteredOptions = options.filter((opt) =>
    opt.event.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          Filter Events
          <ChevronDown className="ml-1 h-4 w-4" />
          {column.getFilterValue() ? `: ${column.getFilterValue()}` : ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 max-h-60 overflow-y-auto">
        <Input
          placeholder="Search event..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-2"
        />
        <DropdownMenuItem
          onClick={() => column.setFilterValue(undefined)}
          className="cursor-pointer"
        >
          All
        </DropdownMenuItem>
        {filteredOptions
          .sort((a, b) => a.event.localeCompare(b.event))
          .map((opt) => (
            <DropdownMenuItem
              key={opt.event}
              onClick={() => column.setFilterValue(opt.event)}
              className="cursor-pointer"
            >
              {opt.event} ({opt.count})
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

//////////////////////////
// College Events Filter (Dynamic)
//////////////////////////
type CollegeEventFilterProps = {
  column: any;
  table: any;
  eventsList: string[];
};
const CollegeEventFilter: React.FC<CollegeEventFilterProps> = ({
  column,
  table,
  eventsList,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const filteredOptions = eventsList.filter((event) =>
    event.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <ChevronDown className="ml-1 h-4 w-4" />
          {column.getFilterValue() ? `: ${column.getFilterValue()}` : ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 max-h-60 overflow-y-auto">
        <Input
          placeholder="Search event..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-2"
        />
        <DropdownMenuItem
          onClick={() => column.setFilterValue(undefined)}
          className="cursor-pointer"
        >
          All
        </DropdownMenuItem>
        {filteredOptions.map((event) => (
          <DropdownMenuItem
            key={event}
            onClick={() => column.setFilterValue(event)}
            className="cursor-pointer"
          >
            {event}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

//////////////////////////
// DataTable
//////////////////////////
export function DataTable({ data }: { data: Data[] }) {
  const router = useRouter();
  const [rows, setRows] = React.useState<Data[]>(data);
  const [view, setView] = React.useState<"registrants" | "colleges">(
    "registrants",
  );

  const handleUpdate = React.useCallback(
    (id: string) => {
      const originId = id.split("#")[0];
      router.push(`/register/updateregister/${originId}`);
    },
    [router],
  );

  const handleRemove = React.useCallback(
    async (id: string) => {
      const originId = id.split("#")[0];
      const updatedRows = rows.filter((row) => row.id !== id);
      try {
        const response = await fetch("/api/deleteregister", {
          method: "DELETE",
          body: JSON.stringify({ registrantId: originId }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        toast.success(data.message);
        setRows(updatedRows);
      } catch (err: unknown) {
        toast.error("Failed to delete registrant");
        console.error(err);
      }
    },
    [rows],
  );

  const handleDeleteSelected = React.useCallback(
    async (providedRegistrants?: string[]) => {
      let registrantIds: string[] = [];
      if (providedRegistrants && providedRegistrants.length > 0) {
        registrantIds = providedRegistrants;
      } else {
        const selectedRows = table.getSelectedRowModel().rows;
        registrantIds = Array.from(
          new Set(
            selectedRows.map((r) => (r.original.id as string).split("#")[0]),
          ),
        );
      }
      if (!registrantIds.length) {
        toast.error("No rows selected");
        return;
      }
      try {
        const response = await fetch("/api/deleteregister", {
          method: "DELETE",
          body: JSON.stringify({ registrantIds }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        toast.success(data.message);
        setRows((prev) =>
          prev.filter(
            (row) => !registrantIds.includes((row.id as string).split("#")[0]),
          ),
        );
      } catch (error) {
        toast.error("Failed to delete registrants");
        console.error(error);
      }
    },
    [rows],
  );

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
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row, table }) => {
          const rowRegistrantId = (row.original.id as string).split("#")[0];
          const handleCheck = (checked: boolean) => {
            const matchingRows = table
              .getRowModel()
              .rows.filter(
                (r) =>
                  (r.original.id as string).split("#")[0] === rowRegistrantId,
              )
              .map((r) => r.id);
            table.setRowSelection((prev) => {
              const newSelection = { ...prev };
              matchingRows.forEach((idx) => {
                newSelection[idx] = checked;
              });
              return newSelection;
            });
          };
          return (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={handleCheck}
              aria-label="Select row"
            />
          );
        },
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "slno",
        header: "SL No",
        cell: ({ row, table }) => {
          const { pagination } = table.getState();
          return pagination.pageIndex * pagination.pageSize + row.index + 1;
        },
      },
      {
        accessorKey: "photo",
        header: "Photo",
        cell: ({ row }) => {
          const photoUrl = row.getValue("photo") as string;
          const imageUrl = getImageUrl(photoUrl);
          return (
            <Image
              src={imageUrl}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          );
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting((column.getIsSorted() as string) === "asc")
            }
          >
            Name <ArrowUpDown className="p-1" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="capitalize text-black">
            {row.getValue("name") as string}
          </div>
        ),
      },
      {
        accessorKey: "usn",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting((column.getIsSorted() as string) === "asc")
            }
          >
            USN <ArrowUpDown className="p-1" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="uppercase text-black">
            {row.getValue("usn") as string}
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => (
          <div className="text-black">{row.getValue("phone") as string}</div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="text-black">
            {((row.getValue("email") as string) || "").toLowerCase()}
          </div>
        ),
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => (
          <div className="text-black">{row.getValue("gender") as string}</div>
        ),
      },
      {
        accessorKey: "blood",
        header: "DOB",
        cell: ({ row }) => (
          <div className="text-black">{row.getValue("blood") as string}</div>
        ),
      },
      {
        accessorKey: "collegeName",
        header: ({ column, table }) => (
          <CollegeNameFilter column={column} table={table} />
        ),
        cell: ({ row }) => (
          <div className="capitalize text-black">
            {row.getValue("collegeName") as string}
          </div>
        ),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue) return true;
          return (row.getValue(columnId) as string) === filterValue;
        },
      },
      {
        accessorKey: "type",
        header: ({ column, table }) => (
          <TypeFilter column={column} table={table} />
        ),
        cell: ({ row }) => (
          <div className="capitalize text-black">
            {row.getValue("type") as string}
          </div>
        ),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue) return true;
          return (row.getValue(columnId) as string) === filterValue;
        },
      },
      {
        accessorKey: "events",
        header: ({ column, table }) => (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Events <ArrowUpDown className="p-1" />
            </Button>
            <EventFilter column={column} table={table} />
          </div>
        ),
        sortingFn: (rowA, rowB, columnId) => {
          const aStr = (rowA.getValue(columnId) as { eventName: string }[])
            .map((e) => e.eventName)
            .sort()
            .join(", ");
          const bStr = (rowB.getValue(columnId) as { eventName: string }[])
            .map((e) => e.eventName)
            .sort()
            .join(", ");
          return aStr.localeCompare(bStr);
        },
        cell: ({ row }) => {
          const events = row.getValue("events") as {
            eventName: string;
            role?: string;
          }[];
          return (
            <div className="capitalize text-black">
              {events.map((e) => e.eventName).join(", ")}
            </div>
          );
        },
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue) return true;
          const events = row.getValue(columnId) as { eventName: string }[];
          return events.some((e) => e.eventName === filterValue);
        },
      },
      {
        accessorKey: "Action",
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const data = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-black text-l">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleUpdate(data.id)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleDeleteSelected([(data.id as string).split("#")[0]])
                  }
                  className="text-red-500"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleUpdate, handleRemove],
  );

  const table = useReactTable({
    data: rows,
    columns,
    initialState: { pagination: { pageSize: 50 } },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  const totalRegistrants = table.getFilteredRowModel().rows.length;
  const clearAllFilters = () => {
    setColumnFilters([]);
    setSorting([]);
    table.resetColumnFilters();
    table.resetSorting();
  };

  //////////////////////////
  // Export Functions
  //////////////////////////

  // 1. Participants Export (assigning student codes)
  const handleExportParticipantsExcel = () => {
    const filteredRows = table.getRowModel().rows;
    const collegeData: Record<string, Data[]> = {};
    filteredRows.forEach((row) => {
      const collegeName = row.original.collegeName;
      if (!collegeData[collegeName]) {
        collegeData[collegeName] = [];
      }
      collegeData[collegeName].push(row.original);
    });
    const excelData: any[][] = [];
    Object.keys(collegeData).forEach((collegeName) => {
      const participants = collegeData[collegeName];
      // Find mapping entry (case-insensitive)
      const mappingEntry = collegeMapping.find(
        (m) => m.collegeName.toLowerCase() === collegeName.toLowerCase(),
      );
      const studentStart = mappingEntry ? mappingEntry.studentStart : 0;
      let codeCounter = studentStart;
      excelData.push([`College: ${collegeName}`]);
      excelData.push([
        "SL No",
        "Student Code",
        "Name",
        "USN",
        "Phone",
        "Gender",
        "DOB",
        "Email",
        "Events Participating In",
      ]);
      participants.forEach((participant, index) => {
        const eventsParticipating = Array.isArray(participant.events)
          ? participant.events.map((e) => e.eventName).join(", ")
          : "";
        excelData.push([
          index + 1,
          codeCounter,
          participant.name || "",
          participant.usn || "",
          participant.phone || "",
          participant.gender || "",
          participant.blood || "",
          (participant.email || "").toLowerCase(),
          eventsParticipating,
        ]);
        codeCounter++;
      });
      excelData.push([]);
    });
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    ws["!cols"] = [
      { wch: 8 },
      { wch: 15 },
      { wch: 25 },
      { wch: 15 },
      { wch: 20 },
      { wch: 12 },
      { wch: 15 },
      { wch: 30 },
      { wch: 30 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Participants");
    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "participants.xlsx",
    );
  };

  // 2. Events Export
  const handleExportEventsExcel = () => {
    const filteredRows = table.getRowModel().rows;
    const collegeEventsData: Record<string, any[]> = {};
    filteredRows.forEach((row) => {
      const collegeName = row.original.collegeName;
      if (
        Array.isArray(row.original.events) &&
        row.original.events.length > 0
      ) {
        if (!collegeEventsData[collegeName]) {
          collegeEventsData[collegeName] = [];
        }
        row.original.events.forEach(
          (event: { eventName: string; role?: string }) => {
            collegeEventsData[collegeName].push({
              studentName: row.original.name,
              usn: row.original.usn,
              eventName: event.eventName,
            });
          },
        );
      }
    });
    const excelData: any[][] = [];
    Object.keys(collegeEventsData).forEach((collegeName) => {
      const eventsArr = collegeEventsData[collegeName];
      excelData.push([`College: ${collegeName}`]);
      excelData.push(["SL No", "Student Name", "USN", "Event Name"]);
      eventsArr.forEach((entry, index) => {
        excelData.push([
          index + 1,
          entry.studentName,
          entry.usn,
          entry.eventName,
        ]);
      });
      excelData.push([]);
    });
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    ws["!cols"] = [{ wch: 8 }, { wch: 25 }, { wch: 15 }, { wch: 30 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Events");
    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "events.xlsx",
    );
  };

  // 3. Custom Excel Export
  const handleExportCustomExcel = () => {
    const filteredRows = table.getRowModel().rows;
    const collegeData: Record<string, { rows: Data[] }> = {};
    filteredRows.forEach((row) => {
      const collegeName = row.getValue("collegeName") as string;
      if (!collegeData[collegeName]) {
        collegeData[collegeName] = { rows: [] };
      }
      collegeData[collegeName].rows.push(row.original);
    });
    const excelData: any[][] = [];
    excelData.push([
      "Visvesvaraya Technological University in association with Global Academy of Technology",
    ]);
    excelData.push(["24th VTU Youth Fest @ GAT"]);
    excelData.push([]);
    Object.keys(collegeData).forEach((collegeName) => {
      const rowsForCollege = collegeData[collegeName].rows;
      const vtuCode = rowsForCollege[0].collegeCode || "N/A";
      const collegeAssignedCode = (rowsForCollege[0] as any).vtuCode || "N/A";
      excelData.push([`College: ${collegeName}`]);
      excelData.push([`College Assigned Code: ${collegeAssignedCode}`]);
      excelData.push([`VTU Code: ${vtuCode}`]);
      excelData.push([]);
      const participantRows = rowsForCollege;
      if (participantRows.length > 0) {
        excelData.push(["Participant Details"]);
        excelData.push([
          "SL No",
          "Name",
          "USN",
          "Email",
          "Events Participating In",
          "Candidate Signature",
        ]);
        participantRows.forEach((row, index) => {
          const email = (row.email || "").toLowerCase();
          const eventsParticipating = Array.isArray(row.events)
            ? row.events.map((e) => e.eventName).join(", ")
            : "";
          excelData.push([
            index + 1,
            row.name || "",
            row.usn || "",
            email,
            eventsParticipating,
            "",
          ]);
        });
        excelData.push([]);
      }
      excelData.push([]);
    });
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    ws["!cols"] = [
      { wch: 8 },
      { wch: 30 },
      { wch: 20 },
      { wch: 30 },
      { wch: 40 },
      { wch: 30 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrants");
    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "registrants_custom.xlsx",
    );
  };

  // 4. Code Wise Export
  const handleExportCodeWiseExcel = () => {
    const filteredRows = table.getRowModel().rows;
    const participantsByCollege: Record<string, Data[]> = {};
    filteredRows.forEach((row) => {
      const collegeName = row.original.collegeName;
      if (!participantsByCollege[collegeName]) {
        participantsByCollege[collegeName] = [];
      }
      participantsByCollege[collegeName].push(row.original);
    });
    const excelData: any[][] = [];
    collegeMapping.forEach((mapping) => {
      const { collegeName, collegeCode, studentStart } = mapping;
      const participants = participantsByCollege[collegeName] || [];
      if (participants.length > 0) {
        // Header row with college name in the first cell and college code in the last cell (11 cells total)
        excelData.push([
          `College: ${collegeName}`,
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          collegeCode,
        ]);
        // Table header row (11 columns)
        excelData.push([
          "SL No",
          "Student Code",
          "Name",
          "USN",
          "Phone",
          "Gender",
          "DOB",
          "Email",
          "Events Participating In",
        ]);
        let codeCounter = studentStart;
        participants.forEach((participant, index) => {
          const eventsParticipating = Array.isArray(participant.events)
            ? participant.events.map((e) => e.eventName).join(", ")
            : "";
          excelData.push([
            index + 1,
            codeCounter,
            participant.name || "",
            participant.usn || "",
            participant.phone || "",
            participant.gender || "",
            participant.blood || "",
            (participant.email || "").toLowerCase(),
            eventsParticipating,
          ]);
          codeCounter++;
        });
        excelData.push([]);
      }
    });
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    ws["!cols"] = [
      { wch: 8 },
      { wch: 15 },
      { wch: 25 },
      { wch: 15 },
      { wch: 20 },
      { wch: 12 },
      { wch: 15 },
      { wch: 30 },
      { wch: 15 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Code Wise Participants");
    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "code_wise_participants.xlsx",
    );
  };

  //////////////////////////
  // NEW EXPORT FUNCTIONS FOR COLLEGES VIEW
  //////////////////////////

  // 6. Colleges Excel Export – includes segregation of team managers by gender
  const handleExportCollegesExcel = () => {
    const excelData: any[][] = [];
    // Header row
    excelData.push([
      "College Name",
      "College Code",
      "Total Registrants",
      "Male Registrants",
      "Female Registrants",
    ]);

    // Loop over each college in your aggregated data
    collegesData.forEach((college) => {
      // Get all rows for this college from the full rows list
      const collegeRows = rows.filter(
        (row) => row.collegeName === college.collegeName,
      );
      excelData.push([
        college.collegeName,
        college.collegeCode,
        college.registrants,
        college.maleCount,
        college.femaleCount,
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    ws["!cols"] = [
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Colleges");
    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "colleges.xlsx",
    );
  };

  // 7. Updated Arrival Time Export – outputs college name, college code, an assigned code,
  // and counts for participants (male/female)
  const handleExportArrivalExcel = () => {
    const excelData: any[][] = [];
    // Updated header row with separate counts for participants and team managers
    excelData.push([
      "College Name",
      "College Code",
      "Assigned Code",
      "Participants (Male)",
      "Participants (Female)",
    ]);

    collegesData.forEach((college) => {
      // Find the corresponding mapping entry (case-insensitive match)
      const mappingEntry = collegeMapping.find(
        (m) =>
          m.collegeName.toLowerCase() === college.collegeName.toLowerCase(),
      );
      // Use the mapping's collegeCode as the assigned code (or "N/A" if not found)
      const assignedCode = mappingEntry ? mappingEntry.collegeCode : "N/A";

      // Get all rows for the current college
      const collegeRows = rows.filter(
        (row) => row.collegeName === college.collegeName,
      );
      let participantMale = 0;
      let participantFemale = 0;
      collegeRows.forEach((row) => {
        if (row.gender.toLowerCase() === "male") {
          participantMale++;
        } else if (row.gender.toLowerCase() === "female") {
          participantFemale++;
        }
      });

      excelData.push([
        college.collegeName,
        college.collegeCode,
        assignedCode,
        participantMale,
        participantFemale,
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    ws["!cols"] = [
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Arrival Time");
    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "colleges_arrival_time.xlsx",
    );
  };

  //////////////////////////
  // COLLEGES VIEW: Aggregate colleges from rows
  //////////////////////////
  const collegesData = React.useMemo(() => {
    const map = new Map<
      string,
      {
        collegeName: string;
        collegeCode: string;
        events: Set<string>;
        registrants: number;
        maleCount: number;
        femaleCount: number;
      }
    >();
    rows.forEach((row) => {
      const collegeName = row.collegeName;
      if (!map.has(collegeName)) {
        map.set(collegeName, {
          collegeName,
          collegeCode: row.collegeCode,
          events: new Set<string>(),
          registrants: 0,
          maleCount: 0,
          femaleCount: 0,
        });
      }
      const college = map.get(collegeName)!;
      college.registrants += 1;
      if (row.gender.toLowerCase() === "male") {
        college.maleCount += 1;
      } else if (row.gender.toLowerCase() === "female") {
        college.femaleCount += 1;
      }
      row.events.forEach((e) => {
        if (e.eventName) {
          college.events.add(e.eventName);
        }
      });
    });
    return Array.from(map.values()).map((college) => ({
      ...college,
      events: Array.from(college.events),
    }));
  }, [rows]);

  const allCollegeEvents = React.useMemo(() => {
    const eventSet = new Set<string>();
    collegesData.forEach((college) => {
      college.events.forEach((e) => eventSet.add(e));
    });
    return Array.from(eventSet).sort();
  }, [collegesData]);

  const [collegeSorting, setCollegeSorting] = React.useState<SortingState>([]);
  const [collegeColumnFilters, setCollegeColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const collegeColumns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "collegeName",
        header: "College Name",
        sortingFn: (a, b) => {
          const aVal = a.getValue("collegeName") as string;
          const bVal = b.getValue("collegeName") as string;
          return aVal.localeCompare(bVal);
        },
      },
      {
        accessorKey: "collegeCode",
        header: "College Code",
        sortingFn: (a, b) => {
          const aVal = a.getValue("collegeCode") as string;
          const bVal = b.getValue("collegeCode") as string;
          return aVal.localeCompare(bVal);
        },
      },
      {
        accessorKey: "events",
        header: ({ column, table }) => (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Events <ArrowUpDown className="p-1" />
            </Button>
            <CollegeEventFilter
              column={column}
              table={table}
              eventsList={allCollegeEvents}
            />
          </div>
        ),
        sortingFn: (a, b, columnId) => {
          const aValue = (a.getValue(columnId) as string[]).join(", ");
          const bValue = (b.getValue(columnId) as string[]).join(", ");
          return aValue.localeCompare(bValue);
        },
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue) return true;
          const eventsArray = row.getValue(columnId) as string[];
          return eventsArray.includes(filterValue);
        },
        cell: ({ row }) => (row.getValue("events") as string[]).join(", "),
      },
      {
        accessorKey: "numEvents",
        header: "No. of Events",
        cell: ({ row }) => (row.original.events as string[]).length,
        enableSorting: true,
      },
      {
        accessorKey: "registrants",
        header: "No. of Registrants",
        cell: ({ row }) => row.original.registrants,
        enableSorting: true,
      },
      {
        accessorKey: "maleCount",
        header: "Male Participants",
        cell: ({ row }) => row.original.maleCount,
        enableSorting: true,
      },
      {
        accessorKey: "femaleCount",
        header: "Female Participants",
        cell: ({ row }) => row.original.femaleCount,
        enableSorting: true,
      },
    ],
    [allCollegeEvents],
  );

  const collegeTable = useReactTable({
    data: collegesData,
    columns: collegeColumns,
    initialState: { pagination: { pageSize: 10 } },
    onSortingChange: setCollegeSorting,
    onColumnFiltersChange: setCollegeColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting: collegeSorting, columnFilters: collegeColumnFilters },
  });

  return (
    <div className="w-full px-5 rounded-xl my-12 text-black">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center gap-3 py-4">
        {view === "registrants" ? (
          <>
            <div className="relative max-w-sm">
              <Search className="absolute left-2 top-3 h-4 w-5 text-black" />
              <Input
                placeholder="Search name..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="pl-10 w-[26rem] text-black"
              />
            </div>
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="ml-2 text-black"
            >
              Clear Filters
            </Button>
            {/* Five Excel Download Buttons */}
            <Button
              variant="outline"
              className="ml-auto bg-primary text-white hover:scale-105 hover:text-white"
              onClick={handleExportParticipantsExcel}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download Participants Excel
            </Button>
            <Button
              variant="outline"
              className="ml-auto bg-secondary text-white hover:scale-105 hover:text-white"
              onClick={handleExportEventsExcel}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download Events Excel
            </Button>
            <Button
              variant="outline"
              className="ml-auto bg-orange-500 text-white hover:scale-105 hover:bg-orange-600 hover:text-white"
              onClick={handleExportCustomExcel}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download Custom Excel
            </Button>
            <Button
              variant="outline"
              className="ml-auto bg-green-500 text-white hover:scale-105 hover:bg-green-500 hover:text-white"
              onClick={handleExportCodeWiseExcel}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download Code Wise Excel
            </Button>
            <Button
              variant="outline"
              className="bg-red-500 text-white hover:scale-105 hover:bg-red-500 hover:text-primary-foreground ml-auto"
              onClick={() => handleDeleteSelected()}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          </>
        ) : (
          <>
            <div className="relative max-w-sm">
              <Search className="absolute left-2 top-3 h-4 w-5 text-black" />
              <Input
                placeholder="Search college name..."
                value={
                  (collegeTable
                    .getColumn("collegeName")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(e) =>
                  collegeTable
                    .getColumn("collegeName")
                    ?.setFilterValue(e.target.value)
                }
                className="pl-10 w-[26rem] text-black"
              />
            </div>
            {/* Two new buttons for the colleges view */}
            <Button
              variant="outline"
              className="ml-auto bg-primary text-white hover:scale-105 hover:text-white"
              onClick={handleExportCollegesExcel}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download Colleges Excel
            </Button>
            <Button
              variant="outline"
              className="ml-auto bg-red-500 text-white hover:scale-105 hover:bg-red-600 hover:text-white"
              onClick={handleExportArrivalExcel}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download Arrival Time Excel
            </Button>
          </>
        )}
        <Button
          variant="outline"
          className="ml-2 text-black"
          onClick={() =>
            setView(view === "registrants" ? "colleges" : "registrants")
          }
        >
          {view === "registrants"
            ? "Go to Colleges List"
            : "Back to Registrants"}
        </Button>
      </div>

      {view === "registrants" ? (
        <>
          <div className="mb-2 text-sm text-black">
            Total Registrants: {totalRegistrants}
          </div>
          <div className="rounded-md border overflow-auto min-h-[18rem] shadow-lg">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-black">
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
              <TableBody className="text-black">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      className="hover:bg-blue-50"
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
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
                      className="min-h-[18rem] text-3xl text-center"
                    >
                      No Registrations Are Done Yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between py-4">
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
                <option value={1000}>1000</option>
                <option value={5000}>5000</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
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
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-2 text-sm text-black">
            Total Colleges: {collegeTable.getFilteredRowModel().rows.length}
          </div>
          <div className="rounded-md border overflow-auto min-h-[18rem] shadow-lg">
            <Table>
              <TableHeader>
                {collegeTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-black">
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
              <TableBody className="text-black">
                {collegeTable.getRowModel().rows?.length ? (
                  collegeTable.getRowModel().rows.map((row) => (
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
                      colSpan={collegeColumns.length}
                      className="min-h-[18rem] text-3xl text-center"
                    >
                      No Colleges Found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={collegeTable.getState().pagination.pageSize}
                onChange={(e) =>
                  collegeTable.setPageSize(Number(e.target.value))
                }
                className="border rounded p-1 text-black"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={500}>100</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => collegeTable.previousPage()}
                disabled={!collegeTable.getCanPreviousPage()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <span>
                Page {collegeTable.getState().pagination.pageIndex + 1} of{" "}
                {collegeTable.getPageCount()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => collegeTable.nextPage()}
                disabled={!collegeTable.getCanNextPage()}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
