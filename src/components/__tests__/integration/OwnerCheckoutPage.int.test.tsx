// __tests__/OwnerCheckoutPage.int.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise';
import OwnerCheckoutPage from '@/app/owner/[id]/billing/checkout/page';
import * as BillingActions from '@/redux/actions/BillingActions';
import * as GymActions from '@/redux/actions/GymActions';
import * as nextRouter from 'next/navigation';
import * as stripeJs from '@stripe/stripe-js';

// Mocks
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn().mockResolvedValue({
    redirectToCheckout: jest.fn().mockResolvedValue({}),
  }),
}));

jest.mock('@/redux/actions/BillingActions', () => ({
  createCheckoutOwnerSession: jest.fn((id) => ({
    type: 'CREATE_SESSION',
    payload: Promise.resolve({ sessionId: 'mock-session' }),
  })),
}));

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

describe('OwnerCheckoutPage Integration (redux-promise)', () => {
  beforeEach(() => {
    (nextRouter.useParams as jest.Mock).mockReturnValue({ id: '123' });
  });

  it('dispatches actions and initiates Stripe checkout', async () => {
    const store = mockStore({
      getUser: {
        user: {
          gym: {
            id: '123',
            classes: [],
          },
        },
        success: true,
        error: null,
      },
      checkout: {
        sessionId: 'mock-session',
        error: null,
      },
      updateOwnerSettings: {},
    });

    render(
      <Provider store={store}>
        <OwnerCheckoutPage />
      </Provider>
    );

    expect(await screen.findByText(/checkout/i)).toBeInTheDocument();

    // Trigger checkout button
    const checkoutBtn = screen.getByRole('button', { name: /checkout/i });
    fireEvent.click(checkoutBtn);

    await waitFor(() => {
      expect(BillingActions.createCheckoutOwnerSession).toHaveBeenCalledWith('123');
    });

    await waitFor(() => {
      const stripe = (stripeJs.loadStripe as jest.Mock).mock.results[0].value;
      expect(stripe.redirectToCheckout).toHaveBeenCalledWith({ sessionId: 'mock-session' });
    });
  });
});
