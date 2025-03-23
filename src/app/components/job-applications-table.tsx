"use client"

import { useState } from "react"
import { api } from "~/trpc/react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, PencilIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { EditApplicationDialog } from "@/components/edit-application-dialog"
import { DeleteApplicationDialog } from "@/components/delete-application-dialog"

// Sample data for the table
export type JobApplication = {
  id: string
  company: string
  notes?: string
  position: string
  location: string
  status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN"
  dateApplied: Date
  lastUpdated: Date
}

// const data: JobApplication[] = [
//   {
//     id: "1",
//     company: "Acme Inc",
//     position: "Frontend Developer",
//     location: "San Francisco, CA",
//     status: "Interview",
//     dateApplied: "2025-02-15",
//     lastUpdated: "2025-03-01",
//   },
//   {
//     id: "2",
//     company: "Globex Corporation",
//     position: "Full Stack Engineer",
//     location: "Remote",
//     status: "Applied",
//     dateApplied: "2025-02-20",
//     lastUpdated: "2025-02-20",
//   },
//   {
//     id: "3",
//     company: "Stark Industries",
//     position: "UI/UX Designer",
//     location: "New York, NY",
//     status: "Offer",
//     dateApplied: "2025-01-10",
//     lastUpdated: "2025-03-05",
//   },
//   {
//     id: "4",
//     company: "Wayne Enterprises",
//     position: "Product Manager",
//     location: "Chicago, IL",
//     status: "Rejected",
//     dateApplied: "2025-02-01",
//     lastUpdated: "2025-02-28",
//   },
//   {
//     id: "5",
//     company: "Umbrella Corporation",
//     position: "Backend Developer",
//     location: "Seattle, WA",
//     status: "Applied",
//     dateApplied: "2025-03-01",
//     lastUpdated: "2025-03-01",
//   },
//   {
//     id: "6",
//     company: "Cyberdyne Systems",
//     position: "DevOps Engineer",
//     location: "Austin, TX",
//     status: "Interview",
//     dateApplied: "2025-02-10",
//     lastUpdated: "2025-03-02",
//   },
//   {
//     id: "7",
//     company: "Initech",
//     position: "Software Engineer",
//     location: "Remote",
//     status: "Withdrawn",
//     dateApplied: "2025-01-20",
//     lastUpdated: "2025-02-15",
//   },
// ]

export function JobApplicationsTable({ filterStatus }: { filterStatus?: string[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null)
  const [deletingApplication, setDeletingApplication] = useState<JobApplication | null>(null)

  const {
    data: jobApplications,
    isLoading,
    isError,
    error,
  } = api.jobApplication.getJobApps.useQuery(undefined, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
	});
  
  const jobApplicationsData = jobApplications?.data ?? [];

  // Filter data based on status if filterStatus is provided
  /* eslint-disable */
  const filteredData = filterStatus
   ? jobApplicationsData.filter((item) => filterStatus.includes(item.status))
   : jobApplicationsData;

  const columns: ColumnDef<typeof jobApplicationsData[number]>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() ?? (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "company",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Company
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("company")}</div>,
    },
    {
      accessorKey: "position",
      header: "Position",
      cell: ({ row }) => <div>{row.getValue("position")}</div>,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <div>{row.getValue("location")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string

        return (
          <Badge
            variant={
              status === "APPLIED"
                ? "outline"
                : status === "INTERVIEW"
                  ? "secondary"
                  : status === "OFFER"
                    ? "success"
                    : status === "REJECTED"
                      ? "destructive"
                      : status === "WITHDRAWN"
                        ? "outline"
                        : "default"
            }
          >
            {status}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "dateApplied",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date Applied
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = row.getValue("dateApplied");

        const formattedDate = date instanceof Date
          ? date.toLocaleDateString() 
          : typeof date === "string" && date.trim() !== ""
          ? new Date(date).toLocaleDateString() 
          : "N/A";
        
        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      cell: ({ row }) => {
        const date = row.getValue("lastUpdated");

        const formattedDate = date instanceof Date
          ? date.toLocaleDateString() 
          : typeof date === "string" && date.trim() !== ""
          ? new Date(date).toLocaleDateString() 
          : "N/A";
        return <div>{formattedDate}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const application = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(application.id)}>Copy ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => 
                setEditingApplication({
                  ...application,
                  lastUpdated: application.lastUpdated,
                })
              }>
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeletingApplication({
                ...application,
                lastUpdated: application.lastUpdated,
              })} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: filteredData,
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
  })


  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading</p>
      </div>
    )
  }
  
  if (isError) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center text-red-500">
        <p>Error loading data: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter companies..."
          value={(table.getColumn("company")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("company")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuItem
                    key={column.id}
                    className="capitalize"
                    onClick={() => column.toggleVisibility(!column.getIsVisible())}
                  >
                    <Checkbox checked={column.getIsVisible()} className="mr-2" />
                    {column.id}
                  </DropdownMenuItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>

      {/* Edit Dialog */}
      {editingApplication && (
        <EditApplicationDialog
          application={editingApplication}
          open={!!editingApplication}
          onOpenChange={(open) => {
            if (!open) setEditingApplication(null)
          }}
        />
      )}

      {/* Delete Dialog */}
      {deletingApplication && (
        <DeleteApplicationDialog
          application={deletingApplication}
          open={!!deletingApplication}
          onOpenChange={(open) => {
            if (!open) setDeletingApplication(null)
          }}
        />
      )}
    </div>
  )
}

