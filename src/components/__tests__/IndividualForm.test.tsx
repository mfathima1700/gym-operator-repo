import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IndividualForm from "@/components/settings/IndividualForm";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { deleteMember } from "@/redux/actions/AuthActions";
import { Account, Client } from "appwrite";

// Mock the entire Appwrite SDK
jest.mock("appwrite", () => ({
  Client: jest.fn().mockImplementation(() => ({
    setEndpoint: jest.fn().mockReturnThis(),
    setProject: jest.fn().mockReturnThis(),
  })),
  Account: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue({ $id: "session-123" }),
  })),
}));

// Mock the action properly with a type
jest.mock("@/redux/actions/AuthActions", () => ({
  deleteMember: jest.fn().mockImplementation(() => ({
    type: "DELETE_MEMBER",
    payload: {},
  })),
}));

describe("IndividualForm", () => {
  const userData = {
    id: "user-123",
    email: "janesmith@example.com",
    name: "Jane Smith",
    country: "us",
    phoneNumber: "123-456-7890",
    emailNotifications: "everything",
  };

  const gymName = "Gym XYZ";

  const handleChange = jest.fn();
  const onSaveClick = jest.fn((e) => e.preventDefault());

  const renderForm = () =>
    render(
      <Provider store={store}>
        <IndividualForm
          handleChange={handleChange}
          userData={userData}
          onSaveClick={onSaveClick}
          gymName={gymName}
        />
      </Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock pointer events which are not supported in JSDOM
    window.HTMLElement.prototype.hasPointerCapture = jest.fn();
    window.HTMLElement.prototype.releasePointerCapture = jest.fn();
  });

  it("renders form with user data", () => {
    renderForm();

    expect(screen.getByLabelText(/email address/i)).toHaveValue(userData.email);
    expect(screen.getByLabelText(/name/i)).toHaveValue(userData.name);
    expect(screen.getByLabelText(/gym/i)).toHaveValue(gymName);
    
    // Get the visible text content of the select component
    const countryDisplay = screen.getByRole("combobox");
    expect(countryDisplay).toHaveTextContent(/united states/i);
    
    expect(screen.getByLabelText(/phone number/i)).toHaveValue(userData.phoneNumber);
  });

  it("allows changing name", async () => {
    renderForm();
    const nameInput = screen.getByLabelText(/name/i);
    
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Jane Smith Updated", { delay: 1 });
    
    // Wait for all changes to complete
    await waitFor(() => {
      expect(handleChange).toHaveBeenLastCalledWith("name", "Jane Smith Updated");
    });
  });

  it("allows changing phone number", async () => {
    renderForm();
    const phoneInput = screen.getByLabelText(/phone number/i);
    
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, "987-654-3210", { delay: 1 });
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenLastCalledWith("phoneNumber", "987-654-3210");
    });
  });

  it("calls onSaveClick when save button is clicked", async () => {
    renderForm();
    const saveButton = screen.getByRole("button", { name: /save/i });
    
    await userEvent.click(saveButton);
    expect(onSaveClick).toHaveBeenCalled();
  });

  it("calls deleteMember when delete button is clicked", async () => {
    renderForm();
    const deleteButton = screen.getByRole("button", { name: /delete account/i });
    
    await userEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(Account).toHaveBeenCalled();
      expect(deleteMember).toHaveBeenCalledWith(userData.id, "session-123");
    });
  });

  it("handles country selection change", async () => {
    renderForm();
    
    // Get the select trigger button
    const selectTrigger = screen.getByRole("combobox");
    
    // Click to open the dropdown
    await userEvent.click(selectTrigger);
    
    // Find the Canada option by its value
    const canadaOption = await screen.findByText("Canada");
    
    // Select the option
    await userEvent.click(canadaOption);
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith("country", "ca");
    });
  });
});