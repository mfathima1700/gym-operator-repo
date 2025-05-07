import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { OwnerAccountCard } from "@/components/create/OwnerAccountCard";

describe("OwnerAccountCard", () => {
  const mockOnSaveClick = jest.fn();
  const mockHandleChange = jest.fn();

  const mockCreateData = {
    gymName: "Iron Paradise",
    firstName: "Jane",
    lastName: "Doe",
    description: "The ultimate gym for strength training",
  };

  beforeEach(() => {
    render(
      <OwnerAccountCard
        onSaveClick={mockOnSaveClick}
        handleChange={mockHandleChange}
        createData={mockCreateData}
      />
    );
  });

  it("renders input fields with provided values", () => {
    expect(screen.getByLabelText(/gym name/i)).toHaveValue("Iron Paradise");
    expect(screen.getByLabelText(/first name/i)).toHaveValue("Jane");
    expect(screen.getByLabelText(/last name/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/gym description/i)).toHaveValue(
      "The ultimate gym for strength training"
    );
  });

  it("calls handleChange when input values change", () => {
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("calls onSaveClick when 'Create' button is clicked", () => {
    fireEvent.click(screen.getByText(/create/i));
    expect(mockOnSaveClick).toHaveBeenCalled();
  });
});
