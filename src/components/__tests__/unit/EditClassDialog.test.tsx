import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import EditClassDialog from '@/components/gym/EditClassDialog';
import store from '@/redux/store';
import { bookClass, cancelClass, deleteClass, updateClass } from '@/redux/actions/ClassActions';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { sendDeleteEmail } from '@/redux/actions/EmailActions';

// Mock the Redux actions
jest.mock('@/redux/actions/ClassActions', () => ({
  bookClass: jest.fn(),
  cancelClass: jest.fn(),
  deleteClass: jest.fn(),
  updateClass: jest.fn(),
}));

jest.mock('@/redux/actions/EmailActions', () => ({
  sendDeleteEmail: jest.fn(),
}));

// Mock the UI components
jest.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <select value={value} onChange={(e) => onValueChange(e.target.value)} data-testid="select">
      {children}
    </select>
  ),
  SelectTrigger: ({ children }: any) => (
    <button data-testid="select-trigger">{children}</button>
  ),
  SelectContent: ({ children }: any) => (
    <div data-testid="select-content">{children}</div>
  ),
  SelectItem: ({ children, value }: any) => (
    <option value={value} data-testid={`select-item-${value}`}>
      {children}
    </option>
  ),
  SelectValue: ({ placeholder }: any) => (
    <span data-testid="select-value">{placeholder}</span>
  ),
}));

jest.mock('@/components/gym/SelectInstructor', () => () => <div>SelectInstructor Mock</div>);
jest.mock('@/components/gym/DaySelector', () => ({ selectedDays, toggleDay }: any) => (
  <div>
    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
      <button 
        key={day} 
        onClick={() => toggleDay(day)}
        data-testid={`day-${day}`}
        data-selected={selectedDays.includes(day)}
      >
        {day}
      </button>
    ))}
  </div>
));
jest.mock('@/components/gym/StartDateControl', () => ({ date, handleChange }: any) => (
  <input 
    type="date" 
    value={date.toISOString().split('T')[0]} 
    onChange={(e) => handleChange('startDate', new Date(e.target.value))}
    data-testid="start-date"
  />
));
jest.mock('@/components/gym/EndDateControl', () => ({ date, handleChange }: any) => (
  <input 
    type="date" 
    value={date.toISOString().split('T')[0]} 
    onChange={(e) => handleChange('endDate', new Date(e.target.value))}
    data-testid="end-date"
  />
));

describe('EditClassDialog', () => {
  const mockGymClass = {
    id: 'class-123',
    name: 'Yoga Class',
    description: 'Beginner yoga class',
    instructorId: 'instructor-1',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
    capacity: '20',
    intensity: 'MODERATE',
    recurrence: 'WEEKLY',
    duration: '60',
    days: ['Monday', 'Wednesday'],
    room: 'Studio 1',
    skillLevel: 'BEGINNER',
    time: '09:00',
    bookings: [],
  };

  const mockUser = {
    id: 'user-123',
    email: 'user@example.com',
    name: 'Test User',
    gym: {
      name: 'Test Gym'
    }
  };

  const mockEditTriggerRef = {
    current: {
      click: jest.fn()
    }
  };

  const WrappedAddClassDialog = ({  isOwner }: { isOwner: boolean }) => (
    <Dialog>
      <DialogTrigger>
       Add Class {/* Match this label in your test */}
      </DialogTrigger>
      <EditClassDialog
          gymClass={mockGymClass}
          editTriggerRef={mockEditTriggerRef}
          gymId="gym-123"
          today={new Date()}
          isOwner={isOwner}
          user={mockUser}
          bookings={[]}
        />
    </Dialog>
  );

  const renderComponent = (isOwner = true) => {
    return render(
      <Provider store={store}>
        <WrappedAddClassDialog  isOwner={isOwner} />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('renders all form fields with initial values', () => {
    renderComponent();

    expect(screen.getByLabelText('Class Name')).toHaveValue(mockGymClass.name);
    expect(screen.getByLabelText('Description')).toHaveValue(mockGymClass.description);
    expect(screen.getByTestId('select-value')).toHaveTextContent('Beginner');
    expect(screen.getByLabelText('Time')).toHaveValue(mockGymClass.time);
    expect(screen.getByLabelText('Capacity')).toHaveValue(mockGymClass.capacity);
    expect(screen.getByLabelText('Room')).toHaveValue(mockGymClass.room);
    expect(screen.getByTestId('start-date')).toHaveValue('2023-01-01');
    expect(screen.getByTestId('end-date')).toHaveValue('2023-12-31');
  });

  it('allows editing class name when isOwner is true', async () => {
    renderComponent();
    const classNameInput = screen.getByLabelText('Class Name');
    
    await userEvent.clear(classNameInput);
    await userEvent.type(classNameInput, 'Advanced Yoga');
    
    expect(classNameInput).toHaveValue('Advanced Yoga');
  });

  it('disables editing fields when isOwner is false', () => {
    renderComponent(false);
    
    expect(screen.getByLabelText('Class Name')).toBeDisabled();
    expect(screen.getByLabelText('Description')).toBeDisabled();
    expect(screen.getByLabelText('Time')).toBeDisabled();
    expect(screen.getByLabelText('Capacity')).toBeDisabled();
  });

  it('handles day selection', async () => {
    renderComponent();
    const mondayButton = screen.getByTestId('day-Monday');
    const tuesdayButton = screen.getByTestId('day-Tuesday');
    
    // Monday is already selected
    expect(mondayButton).toHaveAttribute('data-selected', 'true');
    
    // Click Monday to deselect
    await userEvent.click(mondayButton);
    expect(mondayButton).toHaveAttribute('data-selected', 'false');
    
    // Click Tuesday to select
    await userEvent.click(tuesdayButton);
    expect(tuesdayButton).toHaveAttribute('data-selected', 'true');
  });

  it('calls updateClass when Update button is clicked (owner)', async () => {
    renderComponent();
    const updateButton = screen.getByRole('button', { name: 'Update' });
    
    await userEvent.click(updateButton);
    
    expect(updateClass).toHaveBeenCalledWith(mockGymClass, mockGymClass.id);
    expect(mockEditTriggerRef.current.click).toHaveBeenCalled();
  });

  it('calls deleteClass and sendDeleteEmail when Delete button is clicked (owner)', async () => {
    renderComponent();
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    
    await userEvent.click(deleteButton);
    
    expect(deleteClass).toHaveBeenCalledWith(mockGymClass.id);
    expect(sendDeleteEmail).toHaveBeenCalledWith({
      email: mockUser.email,
      name: mockUser.name,
      gymName: mockUser.gym.name,
      className: mockGymClass.name
    });
    expect(mockEditTriggerRef.current.click).toHaveBeenCalled();
  });

  it('calls bookClass when Book button is clicked', async () => {
    renderComponent(false); // Not owner
    const bookButton = screen.getByRole('button', { name: 'Book' });
    
    await userEvent.click(bookButton);
    
    expect(bookClass).toHaveBeenCalledWith(mockGymClass.id, mockUser.id);
    expect(mockEditTriggerRef.current.click).toHaveBeenCalled();
  });

  it('handles intensity selection change', async () => {
    renderComponent();
    const intensitySelect = screen.getByTestId('select');
    
    fireEvent.change(intensitySelect, { target: { value: 'EXTREME' } });
    
    // Verify the select value changed
    expect(intensitySelect).toHaveValue('EXTREME');
  });

  it('handles date changes', async () => {
    renderComponent();
    const startDateInput = screen.getByTestId('start-date');
    const endDateInput = screen.getByTestId('end-date');
    
    fireEvent.change(startDateInput, { target: { value: '2023-02-01' } });
    fireEvent.change(endDateInput, { target: { value: '2023-11-30' } });
    
    expect(startDateInput).toHaveValue('2023-02-01');
    expect(endDateInput).toHaveValue('2023-11-30');
  });
});