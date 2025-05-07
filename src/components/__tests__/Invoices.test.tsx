import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Invoices from '@/components/invoices/Invoices';

const mockInvoices = [
  {
    id: 'inv_001',
    amount_due: 5000,
    amount_paid: 5000,
    created: 1680912000,
    invoice_pdf: 'https://example.com/invoice/inv_001.pdf',
    status: 'paid',
    lines: {
      data: [{ description: 'Monthly gym membership' }]
    }
  },
  {
    id: 'inv_002',
    amount_due: 3000,
    amount_paid: 3000,
    created: 1680998400,
    invoice_pdf: 'https://example.com/invoice/inv_002.pdf',
    status: 'paid',
    lines: {
      data: [{ description: 'Yoga class subscription' }]
    }
  }
];

describe('Invoices component', () => {
  beforeEach(() => {
    // Mock window.open so it doesn't actually open anything
    window.open = jest.fn();
  });

  it('renders invoice rows correctly', () => {
    render(<Invoices invoices={mockInvoices} />);

    expect(screen.getByText('inv_001')).toBeInTheDocument();
    expect(screen.getByText('Monthly gym membership')).toBeInTheDocument();
    expect(screen.getByText('inv_002')).toBeInTheDocument();
    expect(screen.getByText('Yoga class subscription')).toBeInTheDocument();
  });

  it('opens PDF on Download button click', () => {
    render(<Invoices invoices={mockInvoices} />);
    
    const downloadButtons = screen.getAllByRole('button', { name: /download/i });
    fireEvent.click(downloadButtons[0]);

    expect(window.open).toHaveBeenCalledWith('https://example.com/invoice/inv_001.pdf', '_blank');
  });

  it('shows total revenue if isPayments is true', () => {
    render(<Invoices invoices={mockInvoices} isPayments={true} />);
    
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$80.00')).toBeInTheDocument(); // 5000 + 3000 = 8000 cents => $80.00
  });

  it('does not show total revenue if isPayments is false', () => {
    render(<Invoices invoices={mockInvoices} isPayments={false} />);
    
    expect(screen.queryByText('Total Revenue')).not.toBeInTheDocument();
  });
});
