// __tests__/LoginPage.int.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@/app/auth/login/page';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise';
import * as AuthActions from '@/redux/actions/AuthActions';

const mockStore = configureStore([promiseMiddleware]);

describe('Login Page Integration', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      signIn: {
        success: false,
        error: null,
        user: null,
      },
    });
  });

  it('dispatches signIn with correct email and password', async () => {
    const mockSignIn = jest.spyOn(AuthActions, 'signIn');

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /log in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'securePass123');
    await userEvent.click(loginButton);

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'securePass123',
    });
  });
});
