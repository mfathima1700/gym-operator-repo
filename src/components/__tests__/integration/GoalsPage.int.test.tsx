import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Goals from '@/app/individual/[id]/goals/page'; // Adjust path based on your directory structure
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

// Mocking useRouter from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = jest.requireMock('next/navigation').useRouter;

// Mock the Dialog component
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: any) => <div>{children}</div>,
  DialogTrigger: ({ children }: any) => <button>{children}</button>,
}));

describe('Goals Page Integration Test', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore([])({
      getUser: {
        user: {
          id: '123',
          name: 'Owner Name',
          goals: [
            { id: '1', title: 'Goal 1', completed: false, targetDate: new Date() },
            { id: '2', title: 'Goal 2', completed: true, targetDate: new Date() },
          ],
        },
        success: true,
        error: null,
      },
      createGoal: { success: false, error: null },
      editGoal: { success: false, error: null },
      deleteGoal: { success: false, error: null },
    });

    // Mocking the behavior of useRouter for navigation
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renders the Goals page and displays user data', () => {
    render(
      <Provider store={store}>
        <Goals />
      </Provider>
    );

    // Check if the in-progress goal is displayed
    expect(screen.getByText(/Goal 1/)).toBeInTheDocument();
    expect(screen.getByText(/Goal 2/)).toBeInTheDocument();
    expect(screen.getByText('In Progress Goals')).toBeInTheDocument();
    expect(screen.getByText('Completed Goals')).toBeInTheDocument();
  });

  it('renders No Incomplete Goals if no in-progress goals are available', () => {
    // Adjust store to simulate no in-progress goals
    store = configureStore([])({
      getUser: {
        user: {
          id: '123',
          name: 'Owner Name',
          goals: [{ id: '2', title: 'Goal 2', completed: true, targetDate: new Date() }],
        },
        success: true,
        error: null,
      },
      createGoal: { success: false, error: null },
      editGoal: { success: false, error: null },
      deleteGoal: { success: false, error: null },
    });

    render(
      <Provider store={store}>
        <Goals />
      </Provider>
    );

    // Check that "No Incomplete Goals" is displayed
    expect(screen.getByText('No Incomplete Goals')).toBeInTheDocument();
  });

  it('opens the dialog when clicking the Add Goal button', async () => {
    render(
      <Provider store={store}>
        <Goals />
      </Provider>
    );

    const addGoalButton = screen.getByText('Add Goal');
    fireEvent.click(addGoalButton);

    // Wait for the AddGoalDialog to open
    await waitFor(() => {
      expect(screen.getByText('Add Goal Dialog')).toBeInTheDocument(); // This assumes 'Add Goal Dialog' text is in the dialog.
    });
  });

  it('dispatches create goal action when a new goal is added', async () => {
    // Simulate the goal creation process
    store = configureStore([])({
      getUser: {
        user: {
          id: '123',
          name: 'Owner Name',
          goals: [{ id: '1', title: 'Goal 1', completed: false, targetDate: new Date() }],
        },
        success: true,
        error: null,
      },
      createGoal: { success: true, error: null },
      editGoal: { success: false, error: null },
      deleteGoal: { success: false, error: null },
    });

    render(
      <Provider store={store}>
        <Goals />
      </Provider>
    );

    // Simulate opening the dialog and adding a new goal
    const addGoalButton = screen.getByText('Add Goal');
    fireEvent.click(addGoalButton);

    // Simulate goal creation action (mock the action that should happen inside the dialog)
    // Here we assume AddGoalDialog contains an input and a submit button.
    const goalTitleInput = screen.getByPlaceholderText('Goal Title'); // Adjust placeholder text based on your component
    fireEvent.change(goalTitleInput, { target: { value: 'New Goal' } });

    const saveButton = screen.getByText('Save'); // Assuming there is a Save button in the dialog
    fireEvent.click(saveButton);

    // Verify that the createGoal action is dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'CREATE_GOAL',
      payload: { title: 'New Goal', completed: false, targetDate: expect.any(Date) }, // Adjust payload as needed
    });
  });

  it('displays No Completed Goals if no completed goals are available', () => {
    // Adjust store to simulate no completed goals
    store = configureStore([])({
      getUser: {
        user: {
          id: '123',
          name: 'Owner Name',
          goals: [{ id: '1', title: 'Goal 1', completed: false, targetDate: new Date() }],
        },
        success: true,
        error: null,
      },
      createGoal: { success: false, error: null },
      editGoal: { success: false, error: null },
      deleteGoal: { success: false, error: null },
    });

    render(
      <Provider store={store}>
        <Goals />
      </Provider>
    );

    // Check that "No Completed Goals" is displayed
    expect(screen.getByText('No Completed Goals')).toBeInTheDocument();
  });
});
