import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddClassDialog from "@/components/gym/AddClassDialog";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { createClass } from "@/redux/actions/ClassActions";
import { useDispatch } from "react-redux";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

// Mocking the dispatch function directly
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const WrappedAddClassDialog = ({ gymId }: { gymId: string }) => (
    <Dialog>
      <DialogTrigger>
       Add Class {/* Match this label in your test */}
      </DialogTrigger>
      <AddClassDialog triggerRef={null} gymId={gymId} />
    </Dialog>
  );


describe("AddClassDialog", () => {
  const triggerRef = { current: { click: jest.fn() } };
  const gymId = "test-gym-id";

  it("renders correctly and interacts with the form", async () => {
    render(
        <Provider store={store}>
        <WrappedAddClassDialog gymId={gymId} />
      </Provider>
    );

    // Click the button that opens the dialog (adjust this selector to match your actual trigger label)
    const openButton = screen.getByRole("button", { name: /add class/i }); // Adjust to match the DialogTrigger label
    fireEvent.click(openButton);

    // Wait for dialog content to appear before interacting with it
    const classNameInput = await screen.findByLabelText(/Class Name/i);
    const instructorSelect = screen.getByLabelText(/Instructor/i);
    const descriptionInput = screen.getByLabelText(/Description/i);

    fireEvent.change(classNameInput, { target: { value: "Yoga Class" } });
    expect(classNameInput).toHaveValue("Yoga Class");

    fireEvent.change(instructorSelect, { target: { value: "us" } });
    expect(instructorSelect).toHaveValue("us");

    fireEvent.change(descriptionInput, { target: { value: "A relaxing yoga class" } });
    expect(descriptionInput).toHaveValue("A relaxing yoga class");

    // Simulate clicking the "Create" button inside the dialog
    const createButton = screen.getByRole("button", { name: /Create/i });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        createClass(expect.objectContaining({
          name: "Yoga Class",
          description: "A relaxing yoga class",
   //       instructorId: "us",
          startDate: expect.any(Date),
          endDate: expect.any(Date),
          capacity: "30",
          intensity: "LOW",
          recurrence: "WEEKLY",
          duration: "60",
          days: [],
          room: "",
          skillLevel: "BEGINNER",
          time: "08:00"
        }), gymId)
      );
    });
  });
});
