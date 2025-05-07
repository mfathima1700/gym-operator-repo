import { render, screen, fireEvent } from '@testing-library/react';
import DaySelector from '@/components/gym/DaySelector'; // Adjust path as needed

describe('DaySelector', () => {
  let toggleDay: jest.Mock;

  beforeEach(() => {
    toggleDay = jest.fn();
  });

  it('renders all 7 days with correct labels', () => {
    render(<DaySelector selectedDays={[]} toggleDay={toggleDay} isOwner={true} />);
    
    const dayButtons = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    dayButtons.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('disables buttons when isOwner is false', () => {
    render(<DaySelector selectedDays={[]} toggleDay={toggleDay} isOwner={false} />);
    
    const button = screen.getByText('Mon').closest('button');
    expect(button).toBeDisabled();
  });

  it('enables buttons when isOwner is true', () => {
    render(<DaySelector selectedDays={[]} toggleDay={toggleDay} isOwner={true} />);
    
    const button = screen.getByText('Mon').closest('button');
    expect(button).toBeEnabled();
  });

  it('calls toggleDay with correct value when a day is clicked', () => {
    render(<DaySelector selectedDays={[]} toggleDay={toggleDay} isOwner={true} />);
    
    const button = screen.getByText('Wed').closest('button');
    fireEvent.click(button!);
    
    expect(toggleDay).toHaveBeenCalledWith('wednesday');
  });

  it('applies "default" variant to selected days and "outline" to others', () => {
    const { rerender } = render(
      <DaySelector selectedDays={['friday']} toggleDay={toggleDay} isOwner={true} />
    );

    const fridayButton = screen.getByText('Fri').closest('button');
    const mondayButton = screen.getByText('Mon').closest('button');

    // The actual classNames are derived from Tailwind-based props. You can test classes like this:
    expect(fridayButton?.className).toContain('default');
    expect(mondayButton?.className).toContain('outline');

    // Alternatively, check visually: no strong logic in component for styles, but classes reflect variants
  });
});
