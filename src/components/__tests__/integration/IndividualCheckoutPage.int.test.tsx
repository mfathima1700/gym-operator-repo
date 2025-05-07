import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IndividualCheckoutPage from '@/app/individual/[id]/billing/checkout/page'; // Adjust the import path according to your structure
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise';
import * as BillingActions from '@/redux/actions/BillingActions';
import * as GymActions from '@/redux/actions/GymActions';
import { AppDispatch, RootState } from '@/redux/store';

const mockStore = configureStore([promiseMiddleware]);

describe('IndividualCheckoutPage Integration Test', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      getUser: { user: { gym: { id: '123', classes: [] }, name: 'John Doe' }, success: true, error: null },
      checkout: { sessionId: 'session123', error: null },
      updateOwnerSettings: { error: null },
    });
  });

  it('renders the checkout page and handles checkout', async () => {
    render(
      <Provider store={store}>
        <IndividualCheckoutPage />
      </Provider>
    );

    // Check if the page loads and contains expected text
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to Stripe/i)).toBeInTheDocument(); // Assuming the button text in OrderSummary is this

    // Check if the correct user name is displayed
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();

    // Mock checkout session dispatch
    const handleCheckoutButton = screen.getByText(/Go to Stripe/i); // Adjust to match the button text
    fireEvent.click(handleCheckoutButton);

    // Simulate dispatch and check if the action was triggered
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'BILLING/CREATE_CHECKOUT_INDIVIDUAL_SESSION', payload: '123' },
    ]);

    // Simulate redirect to Stripe
    await waitFor(() => {
      expect(window.location.href).toBe(`https://checkout.stripe.com/pay/${'session123'}`);
    });
  });

  it('displays error message if checkout session creation fails', async () => {
    store = mockStore({
      getUser: { user: { gym: { id: '123', classes: [] }, name: 'John Doe' }, success: true, error: null },
      checkout: { sessionId: null, error: { message: 'Session creation failed' } },
      updateOwnerSettings: { error: null },
    });

    render(
      <Provider store={store}>
        <IndividualCheckoutPage />
      </Provider>
    );

    // Check if the error message is displayed in the OrderSummary component
    expect(screen.getByText(/Session creation failed/i)).toBeInTheDocument();
  });
});
