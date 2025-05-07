import { render, screen, fireEvent } from '@testing-library/react';
import { EndDateControl } from '@/components/gym/EndDateControl'; // Adjust the import path based on your file structure
import { Calendar } from '@/components/ui/calendar'; // Assuming Calendar is in this path

jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect }: any) => (
    <div data-testid="mock-calendar">
      <button onClick={() => onSelect(new Date(2025, 4, 7))}>Mock Calendar Button</button>
    </div>
  ),
}));

describe('EndDateControl', () => {
  let handleChange: jest.Mock;

  beforeEach(() => {
    handleChange = jest.fn();
  });

  it('should render the button with "Pick a date" when no date is passed', () => {
    render(<EndDateControl date={new Date(0)} handleChange={handleChange} isOwner={true} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Pick a date');
  });

  it('should render the button with the formatted date when a date is passed', () => {
    const date = new Date(2025, 4, 7); // May 7, 2025
    render(<EndDateControl date={date} handleChange={handleChange} isOwner={true} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('May 7, 2025'); // Check if date appears correctly
  });

  it('should disable the button when isOwner is false', () => {
    render(<EndDateControl date={new Date()} handleChange={handleChange} isOwner={false} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should enable the button when isOwner is true', () => {
    render(<EndDateControl date={new Date()} handleChange={handleChange} isOwner={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });

  it('should call handleChange when a date is selected from the calendar', () => {
    render(<EndDateControl date={new Date()} handleChange={handleChange} isOwner={true} />);
    const selectButton = screen.getByText('Mock Calendar Button'); // Look for the mock calendar button
    fireEvent.click(selectButton);

    // Create a date without a time component to avoid mismatches due to time
    const expectedDate = new Date(2025, 4, 7);
    // Strip the time portion for comparison
    expectedDate.setHours(0, 0, 0, 0);

    // Check that the callback was called with the correct date
    expect(handleChange).toHaveBeenCalledWith('endDate', expectedDate);
  });
});
