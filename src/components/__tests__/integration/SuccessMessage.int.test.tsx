import { render, screen, fireEvent } from '@testing-library/react';
import SuccessMessage from '@/components/billing/SuccessMessage';  // Adjust the import according to your file structure
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher

describe('SuccessMessage Component', () => {
  it('renders success message for owner', () => {
    const id = 'owner-id';
    const owner = true;

    render(<SuccessMessage id={id} owner={owner} />);

    // Check if the success message text is displayed
    expect(screen.getByText(/Payment successful/i)).toBeInTheDocument();
    expect(screen.getByText(/Thank you for your purchase! Your payment for the Gym Owner Subscription has been successfully processed./i)).toBeInTheDocument();
    expect(screen.getByText(/Go back to dashboard/i)).toBeInTheDocument();
    
    // Verify the link is correct based on owner
    const button = screen.getByText(/Go back to dashboard/i);
    fireEvent.click(button);
    
    expect(window.location.href).toBe(`/${owner ? "owner" : "individual"}/${id}/`);
  });

  it('renders success message for individual (non-owner)', () => {
    const id = 'individual-id';
    const owner = false;

    render(<SuccessMessage id={id} owner={owner} />);

    // Check if the success message text is displayed for non-owner
    expect(screen.getByText(/Payment successful/i)).toBeInTheDocument();
    expect(screen.getByText(/Thank you for your purchase! Your payment for the Gym Member Subscription has been successfully processed./i)).toBeInTheDocument();
    expect(screen.getByText(/Go back to dashboard/i)).toBeInTheDocument();

    // Verify the link is correct based on non-owner
    const button = screen.getByText(/Go back to dashboard/i);
    fireEvent.click(button);

    expect(window.location.href).toBe(`/${owner ? "owner" : "individual"}/${id}/`);
  });
});
