import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from 'react-day-picker'


interface Invoice {
  id: string;
  amount_due: number;
  amount_paid: number;
  created: number;
  invoice_pdf: string;
  status: string;
  lines: {
    data: {
      description: string;
    }[]; // <-- Use a regular array, not a tuple
  };
}

  export default function Invoices({invoices, isPayments}: {invoices: Invoice[], isPayments?: boolean}) {

    const totalRevenue = invoices.reduce((sum, invoice) => sum + (invoice.amount_paid / 100), 0);
    
  return (
    <>
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice Id</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Invoice</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.created}</TableCell>
            <TableCell>{invoice.lines.data[0]?.description}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.amount_paid}</TableCell>
            <TableCell className="text-right">
                
                <Button onClick={(e) => window.open(invoice.invoice_pdf, '_blank')}>
                    Download
                </Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>

        {
          isPayments ?
          <TableRow>
          <TableCell colSpan={3}>Total Revenue</TableCell>
          <TableCell className="text-right"> ${totalRevenue.toFixed(2)}</TableCell>
        </TableRow> :
        <></>
        }
       
      </TableFooter>
    </Table>
    </>
  )
}