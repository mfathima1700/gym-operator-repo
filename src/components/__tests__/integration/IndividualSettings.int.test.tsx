import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IndividualSettings from '@/app/individual/[id]/settings/page'; // Adjust path based on your directory structure
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as GymActions from '@/redux/actions/GymActions';
import { AppDispatch, RootState } from '@/redux/store';

// Mocking useRouter from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = jest.requireMock('next/navigation').useRouter;

describe('IndividualSettings Page Integration Test', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore([])({
      getUser: {
        user: {
          id: '123',
          name: 'John Doe',
          email: 'johndoe@example.com',
          phoneNumber: '1234567890',
          country: 'USA',
          image: '',
          emailNotifications: 'everything',
          pushNotifications: 'everything',
          gym: { name: 'John\'s Gym' },
        },
        success: true,
        error: null,
      },
      updateUserSettings: { success: false, error: null },
      deleteAccount: { success: false, error: null },
    });

    // Mocking the behavior of useRouter for redirection
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renders the IndividualSettings page and displays user data', async () => {
    render(
      <Provider store={store}>
        <IndividualSettings />
      </Provider>
    );

    // Check if the user's current settings are displayed
    expect(screen.getByLabelText(/Name/)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/Email/)).toHaveValue('johndoe@example.com');
    expect(screen.getByLabelText(/Phone Number/)).toHaveValue('1234567890');
    expect(screen.getByLabelText(/Country/)).toHaveValue('USA');
    expect(screen.getByLabelText(/Gym/)).toHaveValue("John's Gym");
  });

  it('dispatches getUserById and updates state correctly', async () => {
    render(
      <Provider store={store}>
        <IndividualSettings />
      </Provider>
    );

    // Dispatch getUserById action to load user data
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'GET_USER_BY_ID', payload: '123' },
    ]);
  });

  it('handles form input changes and triggers updateUserSettings', async () => {
    render(
      <Provider store={store}>
        <IndividualSettings />
      </Provider>
    );

    // Simulate changing the email
    const emailInput = screen.getByLabelText(/Email/);
    fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });

    // Simulate saving changes
    const saveButton = screen.getByText(/Save/);
    fireEvent.click(saveButton);

    // Verify that the updateUserSettings action is dispatched with the updated data
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'UPDATE_USER_SETTINGS',
      payload: {
        email: 'newemail@example.com',
        name: 'John Doe',
        phoneNumber: '1234567890',
        country: 'USA',
        image: '',
        emailNotifications: 'everything',
        pushNotifications: 'everything',
      },
      userId: '123',
    });
  });

  it('redirects to the individual page after successful update', async () => {
    // Update the store state to simulate a successful update
    store = configureStore([])({
      getUser: {
        user: {
          id: '123',
          name: 'John Doe',
          email: 'johndoe@example.com',
          phoneNumber: '1234567890',
          country: 'USA',
          image: '',
          emailNotifications: 'everything',
          pushNotifications: 'everything',
          gym: { name: 'John\'s Gym' },
        },
        success: true,
        error: null,
      },
      updateUserSettings: { success: true, error: null },
      deleteAccount: { success: false, error: null },
    });

    render(
      <Provider store={store}>
        <IndividualSettings />
      </Provider>
    );

    // Simulate saving changes
    const saveButton = screen.getByText(/Save/);
    fireEvent.click(saveButton);

    // Check if the redirect happens to the correct URL
    await waitFor(() => {
      expect(mockUseRouter().push).toHaveBeenCalledWith('/individual/123');
    });
  });

  it('displays error message if update fails', async () => {
    // Simulate an update failure by setting error in store
    store = configureStore([])({
      getUser: {
        user: {
          id: '123',
          name: 'John Doe',
          email: 'johndoe@example.com',
          phoneNumber: '1234567890',
          country: 'USA',
          image: '',
          emailNotifications: 'everything',
          pushNotifications: 'everything',
          gym: { name: 'John\'s Gym' },
        },
        success: true,
        error: null,
      },
      updateUserSettings: { success: false, error: 'Failed to update settings' },
      deleteAccount: { success: false, error: null },
    });

    render(
      <Provider store={store}>
        <IndividualSettings />
      </Provider>
    );

    // Verify that the error message is displayed
    expect(screen.getByText(/Failed to update settings/)).toBeInTheDocument();
  });
});
