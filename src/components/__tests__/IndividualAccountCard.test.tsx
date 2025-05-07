import { render, screen, fireEvent } from "@testing-library/react";
import { IndividualAccountCard } from "@/components/create/IndividualAccountCard";

describe("IndividualAccountCard", () => {
  let mockOnSaveClick: jest.Mock;
  let mockHandleChange: jest.Mock;

  beforeEach(() => {
    // Initialize mocks before each test
    mockOnSaveClick = jest.fn();
    mockHandleChange = jest.fn();
  });

  it("renders form fields correctly", () => {
    const createData = { firstName: "Jane", lastName: "Doe" };
  
    render(
      <IndividualAccountCard
        onSaveClick={mockOnSaveClick}
        createData={createData}
        handleChange={mockHandleChange}
      />
    );
  
    // Check if inputs are rendering the correct values
    expect(screen.getByLabelText(/First Name/i)).toHaveValue("Jane");
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue("Doe");
  });
  

  it("calls onSaveClick when Save button is clicked", () => {
    const createData = { firstName: "Jane", lastName: "Doe" };

    render(
      <IndividualAccountCard
        onSaveClick={mockOnSaveClick}
        createData={createData}
        handleChange={mockHandleChange}
      />
    );

    // Click on the "Save" button
    fireEvent.click(screen.getByText(/Save/i));

    // Check if the mock function was called
    expect(mockOnSaveClick).toHaveBeenCalledTimes(1);
  });

  it("calls handleChange when input values are changed", () => {
    const createData = { firstName: "Jane", lastName: "Doe" };
  
    render(
      <IndividualAccountCard
        onSaveClick={mockOnSaveClick}
        createData={createData}
        handleChange={mockHandleChange}
      />
    );
  
    // Simulate a change event on the 'firstName' input field
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
  
    // Check if the mock handleChange function was called
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  
    // Check if the correct data was passed to the mock function
    expect(mockHandleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ name: "firstName", value: "John" }),
      })
    );
  });  
});
