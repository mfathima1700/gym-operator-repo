import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export type InvoiceRow = {
    id: string
    amount: number
    status: string
    date: string
    description: string
    invoiceUrl: string
  }

  
export const invoiceColumns: ColumnDef<InvoiceRow>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GBP",
      }).format(amount)

      return <div className=" font-medium">{formatted}</div>
    },
  },
  {
    id: "download",
    header: "Invoice",
    cell: ({ row }) => {
      const url = row.original.invoiceUrl
      return (
        <Button  onClick={() => window.open(url, "_blank")}>
          Download
        </Button>
      )
    },
  },
]
