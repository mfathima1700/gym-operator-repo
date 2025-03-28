"use client"

import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type NutritionData = {
  name: string
  calories: string | number
  serving_size_g: string | number
  fat_total_g: number
  fat_saturated_g: number
  protein_g: string | number
  sodium_mg: number
  potassium_mg: number
  cholesterol_mg: number
  carbohydrates_total_g: number
  fiber_g: number
  sugar_g: number
}

export const columns: ColumnDef<NutritionData>[] = [
  {
    id: "select",
    header: ({ table }) => (
        <></>
    //   <Checkbox
    //     checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
    //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     aria-label="Select all"
    //   />
    ),
    cell: ({ row }) => (
        <></>
    //   <Checkbox
    //     checked={row.getIsSelected()}
    //     onCheckedChange={(value) => row.toggleSelected(!!value)}
    //     aria-label="Select row"
    //   />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Food Item",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
//   {
//     accessorKey: "calories",
//     header: "Calories",
//     cell: ({ row }) => (
//       <div className="text-left">
//         {typeof row.getValue("calories") === 'number' 
//           ? row.getValue("calories") 
//           : 'N/A'}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "serving_size_g",
//     header: "Serving (g)",
//     cell: ({ row }) => (
//       <div className="text-left">
//         {typeof row.getValue("serving_size_g") === 'number' 
//           ? row.getValue("serving_size_g") 
//           : 'N/A'}
//       </div>
//     ),
//   },
  {
    accessorKey: "fat_total_g",
    header: "Total Fat (g)",
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("fat_total_g")}</div>
    ),
  },
//   {
//     accessorKey: "protein_g",
//     header: "Protein (g)",
//     cell: ({ row }) => (
//       <div className="text-left">
//         {typeof row.getValue("protein_g") === 'number' 
//           ? row.getValue("protein_g") 
//           : 'N/A'}
//       </div>
//     ),
//   },
  {
    accessorKey: "carbohydrates_total_g",
    header: "Carbs (g)",
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("carbohydrates_total_g")}</div>
    ),
  },
  {
    accessorKey: "fiber_g",
    header: "Fibre (g)",
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("fiber_g")}</div>
    ),
  },
  {
    accessorKey: "potassium_mg",
    header: "Potassium (mg)",
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("potassium_mg")}</div>
    ),
  },
  {
    accessorKey: "sugar_g",
    header: "Sugar (g)",
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("sugar_g")}</div>
    ),
  },
  {
    accessorKey: "sodium_mg",
    header: "Sodium (mg)",
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("sodium_mg")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const nutrition = row.original

      return (
        <></>
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //     <DropdownMenuItem
        //       onClick={() => navigator.clipboard.writeText(nutrition.name)}
        //     >
        //       Copy food name
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      )
    },
  },
]

export function FoodTable({ nutritionData }: { nutritionData: NutritionData[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: nutritionData || [],
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter food items..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
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
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No nutrition data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        
       
      </div>
    </div>
  )
}