import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "@/components/auth/LoginForm";

describe("LoginForm", () => {
  const loginData = {
    email: "test@example.com",
    password: "password123",
  };

  const mockLoginAction = jest.fn((e) => e.preventDefault());
  const mockHandleChange = jest.fn();
  const mockHandleGoogle = jest.fn();

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

  it("renders email and password inputs with correct values", () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue(loginData.email);

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue(loginData.password);
  });

  it("calls handleChange when typing in inputs", () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "new@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "newpassword" } });

    expect(mockHandleChange).toHaveBeenCalledTimes(2);
  });

  it("calls LoginAction when clicking 'Sign in' button", () => {
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.click(signInButton);

    expect(mockLoginAction).toHaveBeenCalledTimes(1);
  });

  it("calls handleGoogle when clicking 'Login with Google' button", () => {
    const googleButton = screen.getByRole("button", { name: /login with google/i });

    fireEvent.click(googleButton);

    expect(mockHandleGoogle).toHaveBeenCalledTimes(1);
  });

  it("has links to register and forgot password pages", () => {
    expect(screen.getByText(/forgot your password/i)).toHaveAttribute("href", "/auth/forget-password");
    expect(screen.getByText(/sign up/i)).toHaveAttribute("href", "/auth/register");
  });
});
