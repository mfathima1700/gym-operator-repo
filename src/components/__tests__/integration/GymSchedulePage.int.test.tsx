import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import GymSchedule from '@/app/gym/[id]/schedule/page'; // Adjust import as per your directory structure
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as GymActions from '@/redux/actions/GymActions';
import * as ClassActions from '@/redux/actions/ClassActions';
import { AppDispatch, RootState } from '@/redux/store';

// Configure a mock store
const mockStore = configureStore([]);

describe('GymSchedule Component Integration Test', () => {
  let store: any;

  beforeEach(() => {
    // Mock store state with initial values
    store = mockStore({
      getUser: { user: { gym: { id: '123', classes: [], members: [] }, gymRole: 'OWNER' }, success: true, error: null },
      createClass: { success: false, error: null },
      updateClass: { success: false, error: null },
      deleteClass: { success: false, error: null },
    });
  });

  it('renders the GymSchedule page and calls dispatch to fetch user data', async () => {
    // Render the component with the mock store
    render(
      <Provider store={store}>
        <GymSchedule />
      </Provider>
    );

    // Check if the GymSchedule page renders
    expect(screen.getByText(/Gym Schedule/i)).toBeInTheDocument();

    // Wait for the GymWeekCalendar to appear (since it's populated via state)
    await waitFor(() => {
      expect(screen.getByText(/No classes scheduled/i)).toBeInTheDocument(); // Adjust based on actual UI
    });

    // Simulate fetching user data
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'GYM/FETCH_USER_REQUEST', payload: '123' },
    ]);
  });

  it('displays classes if user data includes gym classes', async () => {
    // Update the mock store state to include gym classes
    store = mockStore({
      getUser: { user: { gym: { id: '123', classes: ['Yoga', 'Zumba'], members: [] }, gymRole: 'OWNER' }, success: true, error: null },
      createClass: { success: false, error: null },
      updateClass: { success: false, error: null },
      deleteClass: { success: false, error: null },
    });

    // Re-render with updated store
    render(
      <Provider store={store}>
        <GymSchedule />
      </Provider>
    );

    // Check if the GymWeekCalendar now contains the classes
    await waitFor(() => {
      expect(screen.getByText(/Yoga/i)).toBeInTheDocument();
      expect(screen.getByText(/Zumba/i)).toBeInTheDocument();
    });
  });

  it('triggers class creation when appropriate action is dispatched', async () => {
    // Simulate the state change for class creation
    store = mockStore({
      getUser: { user: { gym: { id: '123', classes: [], members: [] }, gymRole: 'OWNER' }, success: true, error: null },
      createClass: { success: true, error: null },
      updateClass: { success: false, error: null },
      deleteClass: { success: false, error: null },
    });

    // Render component
    render(
      <Provider store={store}>
        <GymSchedule />
      </Provider>
    );

    // Simulate a user action that would trigger class creation
    const createClassButton = screen.getByText(/Create Class/i); // Adjust the button text as per your actual UI
    fireEvent.click(createClassButton);

    // Simulate the dispatch of the create class action
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'CLASS/CREATE_REQUEST', payload: { gymId: '123' } },
    ]);
  });

  it('handles state changes after class creation or update', async () => {
    // Simulate class creation success
    store = mockStore({
      getUser: { user: { gym: { id: '123', classes: ['Yoga'], members: [] }, gymRole: 'OWNER' }, success: true, error: null },
      createClass: { success: true, error: null },
      updateClass: { success: false, error: null },
      deleteClass: { success: false, error: null },
    });

    // Render the component
    render(
      <Provider store={store}>
        <GymSchedule />
      </Provider>
    );

    // Wait for the state change
    await waitFor(() => {
      expect(screen.getByText('Yoga')).toBeInTheDocument(); // Ensure that classes are displayed
    });

    // Check if class creation dispatch occurred
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'CLASS/CREATE_REQUEST', payload: { gymId: '123' } },
    ]);
  });
});
