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
import { Button } from "@/components/ui/button"
import { DataTable } from '../ui/data-table';
import { invoiceColumns } from './InvoiceColumns';

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
    const data = invoices.map((invoice) => ({
      id: invoice.id,
      amount: invoice.amount_paid / 100,
      status: invoice.status,
      date: new Date(invoice.created * 1000).toLocaleDateString(),
      description: invoice.lines?.data[0]?.description ?? "No description",
      invoiceUrl: invoice.invoice_pdf,
    }))
    
  return (
    <>
    <DataTable
      data={data}
      columns={invoiceColumns}
      filterColumn="description"
      caption=""
    />
    </>
  )
}