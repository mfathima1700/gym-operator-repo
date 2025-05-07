import { render, screen, fireEvent } from '@testing-library/react';
import { StartDateControl } from '@/components/gym/StartDateControl'; // Adjust the import path based on your file structure
import { Calendar } from '@/components/ui/calendar'; // Assuming Calendar is in this path

jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect, selected }: any) => (
    <div data-testid="mock-calendar">
      <button onClick={() => onSelect(new Date(2025, 4, 7))}>Select Date</button>
    </div>
  ),
}));

describe('StartDateControl', () => {
  let handleChange: jest.Mock;

  beforeEach(() => {
    handleChange = jest.fn();
  });

  it('should render the button with "Pick a date" when no date is passed', () => {
    render(<StartDateControl date={new Date(0)} handleChange={handleChange} isOwner={true} />); // Use a default Date here
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('should render the button with the formatted date when a date is passed', () => {
    const date = new Date(2025, 4, 7); // May 7, 2025
    render(<StartDateControl date={date} handleChange={handleChange} isOwner={true} />);
    expect(screen.getByText('May 7, 2025')).toBeInTheDocument();
  });

  it('should disable the button when isOwner is false', () => {
    render(<StartDateControl date={new Date()} handleChange={handleChange} isOwner={false} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should enable the button when isOwner is true', () => {
    render(<StartDateControl date={new Date()} handleChange={handleChange} isOwner={true} />);
    expect(screen.getByRole('button')).toBeEnabled();
  });

  it('should call handleChange when a date is selected from the calendar', () => {
    render(<StartDateControl date={new Date()} handleChange={handleChange} isOwner={true} />);
    const selectButton = screen.getByText('Select Date');
    fireEvent.click(selectButton);
    expect(handleChange).toHaveBeenCalledWith('startDate', new Date(2025, 4, 7));
  });
});
