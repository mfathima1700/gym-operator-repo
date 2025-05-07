import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OwnerForm from "@/components/settings/OwnerForm";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const initialState = {};
const store = mockStore(initialState);

describe("OwnerForm", () => {
  const mockHandleChange = jest.fn();
  const mockOnSaveClick = jest.fn();
  const mockHandleGymChange = jest.fn();
  const mockSetGymData = jest.fn();

  const ownerData = {
    email: "test@example.com",
    name: "John Doe",
    phoneNumber: "1234567890",
    city: "Test City",
    postcode: "12345",
    emailNotifications: "everything",
  };

  const gymData = {
    gymName: "Test Gym",
    gymCode: "00000000",
    description: "A test gym",
    logo: null,
    country: "us",
    state: "CA",
    streetAddress: "123 Test St",
  };

  it("renders the form with initial values", () => {
    render(
      <Provider store={store}>
        <OwnerForm
          handleChange={mockHandleChange}
          ownerData={ownerData}
          onSaveClick={mockOnSaveClick}
          gymData={gymData}
          handleGymChange={mockHandleGymChange}
          setGymData={mockSetGymData}
        />
      </Provider>
    );

    expect(screen.getByLabelText("Gym Name")).toHaveValue("Test Gym");
    expect(screen.getByLabelText("Email Address")).toHaveValue("test@example.com");
    expect(screen.getByLabelText("Name")).toHaveValue("John Doe");
    expect(screen.getByLabelText("Phone Number")).toHaveValue("1234567890");
  });

  it("calls onSaveClick when Save button is clicked", () => {
    render(
      <Provider store={store}>
        <OwnerForm
          handleChange={mockHandleChange}
          ownerData={ownerData}
          onSaveClick={mockOnSaveClick}
          gymData={gymData}
          handleGymChange={mockHandleGymChange}
          setGymData={mockSetGymData}
        />
      </Provider>
    );

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    expect(mockOnSaveClick).toHaveBeenCalled();
  });

  it("calls setGymData when regenerate is clicked", () => {
    render(
      <Provider store={store}>
        <OwnerForm
          handleChange={mockHandleChange}
          ownerData={ownerData}
          onSaveClick={mockOnSaveClick}
          gymData={gymData}
          handleGymChange={mockHandleGymChange}
          setGymData={mockSetGymData}
        />
      </Provider>
    );

    const regenerateButton = screen.getByRole("button", { name: /regenerate/i });
    fireEvent.click(regenerateButton);

    expect(mockSetGymData).toHaveBeenCalled();
  });

  it("calls handleChange on input field change", () => {
    render(
      <Provider store={store}>
        <OwnerForm
          handleChange={mockHandleChange}
          ownerData={ownerData}
          onSaveClick={mockOnSaveClick}
          gymData={gymData}
          handleGymChange={mockHandleGymChange}
          setGymData={mockSetGymData}
        />
      </Provider>
    );

    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    expect(mockHandleChange).toHaveBeenCalledWith("name", "Jane Doe");
  });
});
