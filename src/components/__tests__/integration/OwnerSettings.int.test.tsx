import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OwnerSettings from '@/app/owner/[id]/settings/page'; // Adjust path based on your directory structure
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as GymActions from '@/redux/actions/GymActions';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

// Mocking useRouter from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = jest.requireMock('next/navigation').useRouter;

describe('OwnerSettings Page Integration Test', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore([])({
      getUser: {
        user: {
          id: '123',
          name: 'Owner Name',
          email: 'owner@example.com',
          phoneNumber: '1234567890',
          image: '',
          emailNotifications: 'everything',
          pushNotifications: 'everything',
          ownedGym: {
            id: 'gym123',
            country: 'USA',
            city: 'New York',
            postcode: '10001',
            streetAddress: '123 Gym St',
            state: 'NY',
            description: 'A great gym!',
            name: 'Gym Name',
            logo: '',
            gymCode: 'XYZ123',
          },
        },
        success: true,
        error: null,
      },
      updateOwnerSettings: { success: false, error: null },
      deleteAccount: { success: false, error: null },
    });

    // Mocking the behavior of useRouter for redirection
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renders the OwnerSettings page and displays user data', () => {
    render(
      <Provider store={store}>
        <OwnerSettings />
      </Provider>
    );

    // Check if the user's current settings are displayed
    expect(screen.getByLabelText(/Name/)).toHaveValue('Owner Name');
    expect(screen.getByLabelText(/Email/)).toHaveValue('owner@example.com');
    expect(screen.getByLabelText(/Phone Number/)).toHaveValue('1234567890');
    expect(screen.getByLabelText(/Gym Name/)).toHaveValue('Gym Name');
    expect(screen.getByLabelText(/Street Address/)).toHaveValue('123 Gym St');
  });

  it('dispatches getUserById action to load user data', () => {
    render(
      <Provider store={store}>
        <OwnerSettings />
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'GET_USER_BY_ID', payload: '123' },
    ]);
  });

  it('handles form input changes and triggers updateOwnerSettings', async () => {
    render(
      <Provider store={store}>
        <OwnerSettings />
      </Provider>
    );

    // Simulate changing the gym name
    const gymNameInput = screen.getByLabelText(/Gym Name/);
    fireEvent.change(gymNameInput, { target: { value: 'New Gym Name' } });

    // Simulate saving changes
    const saveButton = screen.getByText(/Save/);
    fireEvent.click(saveButton);

    // Verify that the updateOwnerSettings action is dispatched with the updated data
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'UPDATE_OWNER_SETTINGS',
      payload: {
        ownerData: expect.any(Object), // Owner data object
        gymData: expect.objectContaining({
          gymName: 'New Gym Name',
        }),
      },
      userId: '123',
    });
  });

  it('redirects to the owner page after successful update', async () => {
    // Update the store state to simulate a successful update
    store = configureStore([])({
      getUser: {
        user: {
          id: '123',
          name: 'Owner Name',
          email: 'owner@example.com',
          phoneNumber: '1234567890',
          image: '',
          emailNotifications: 'everything',
          pushNotifications: 'everything',
          ownedGym: {
            id: 'gym123',
            country: 'USA',
            city: 'New York',
            postcode: '10001',
            streetAddress: '123 Gym St',
            state: 'NY',
            description: 'A great gym!',
            name: 'Gym Name',
            logo: '',
            gymCode: 'XYZ123',
          },
        },
        success: true,
        error: null,
      },
      updateOwnerSettings: { success: true, error: null },
      deleteAccount: { success: false, error: null },
    });

    render(
      <Provider store={store}>
        <OwnerSettings />
      </Provider>
    );

    // Simulate saving changes
    const saveButton = screen.getByText(/Save/);
    fireEvent.click(saveButton);

    // Check if the redirect happens to the correct URL
    await waitFor(() => {
      expect(mockUseRouter().push).toHaveBeenCalledWith('/owner/123');
    });
  });

  it('displays error message if update fails', async () => {
    // Simulate an update failure by setting error in store
    store = configureStore([])({
      getUser: {
        user: {
          id: '123',
          name: 'Owner Name',
          email: 'owner@example.com',
          phoneNumber: '1234567890',
          image: '',
          emailNotifications: 'everything',
          pushNotifications: 'everything',
          ownedGym: {
            id: 'gym123',
            country: 'USA',
            city: 'New York',
            postcode: '10001',
            streetAddress: '123 Gym St',
            state: 'NY',
            description: 'A great gym!',
            name: 'Gym Name',
            logo: '',
            gymCode: 'XYZ123',
          },
        },
        success: true,
        error: null,
      },
      updateOwnerSettings: { success: false, error: 'Failed to update settings' },
      deleteAccount: { success: false, error: null },
    });

    render(
      <Provider store={store}>
        <OwnerSettings />
      </Provider>
    );

    // Verify that the error message is displayed
    expect(screen.getByText(/Failed to update settings/)).toBeInTheDocument();
  });
});
