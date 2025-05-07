import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise';
import OwnerSuccessPage from '@/app/owner/[id]/billing/success/page';
import * as GymActions from '@/redux/actions/GymActions';
import * as nextRouter from 'next/navigation';

// Mock router params
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock getUserById action
jest.mock('@/redux/actions/GymActions', () => ({
  getUserById: jest.fn((id) => ({
    type: 'GET_USER',
    payload: Promise.resolve({
      user: {
        gym: {
          id,
          classes: [],
        },
      },
    }),
  })),
}));

const mockStore = configureStore([promiseMiddleware]);

describe('OwnerSuccessPage Integration Test', () => {
  beforeEach(() => {
    (nextRouter.useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
  });

  it('fetches user data and renders SuccessMessage', async () => {
    const store = mockStore({
      getUser: {
        user: {
          gym: {
            id: 'test-id',
            classes: [],
          },
        },
        success: true,
        error: null,
      },
      updateOwnerSettings: {},
    });

    render(
      <Provider store={store}>
        <OwnerSuccessPage />
      </Provider>
    );

    // Wait for SuccessMessage to render
    await waitFor(() => {
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });

    // Check if action was dispatched
    expect(GymActions.getUserById).toHaveBeenCalledWith('test-id');
  });
});
