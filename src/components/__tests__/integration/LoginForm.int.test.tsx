// LoginForm.int.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '@/components/auth/LoginForm';

describe('LoginForm Integration', () => {
  const mockLoginAction = jest.fn((e) => e.preventDefault());
  const mockHandleChange = jest.fn();
  const mockHandleGoogle = jest.fn();

  const loginData = {
    email: 'test@example.com',
    password: 'password123',
  };

  beforeEach(() => {
    render(
      <LoginForm
        LoginAction={mockLoginAction}
        loginData={loginData}
        handleChange={mockHandleChange}
        handleGoogle={mockHandleGoogle}
      />
    );
  });

  it('renders form inputs and buttons', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login with google/i })).toBeInTheDocument();
  });

  it('fills in email and password inputs', () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

    expect(mockHandleChange).toHaveBeenCalledTimes(2);
  });

  it('calls LoginAction on submit button click', () => {
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInButton);
    expect(mockLoginAction).toHaveBeenCalled();
  });

  it('calls handleGoogle on "Login with Google" click', () => {
    const googleButton = screen.getByRole('button', { name: /login with google/i });
    fireEvent.click(googleButton);
    expect(mockHandleGoogle).toHaveBeenCalled();
  });
});
