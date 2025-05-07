import { render, screen, fireEvent } from '@testing-library/react';
import RoleTabs from '@/components/auth/RoleTabs'; // Adjust path as needed
import { GymRole } from '@prisma/client';

describe('RoleTabs Component', () => {
  let setUserData: jest.Mock;

  beforeEach(() => {
    setUserData = jest.fn();
  });

  it('renders both tabs with correct labels', () => {
    render(
      <RoleTabs
        userData={{ gymRole: GymRole.OWNER }}
        setUserData={setUserData}
      />
    );

    expect(screen.getByText('Gym Owner')).toBeInTheDocument();
    expect(screen.getByText('Gym Member')).toBeInTheDocument();
  });

  it('activates the correct tab based on userData.gymRole', () => {
    render(
      <RoleTabs
        userData={{ gymRole: GymRole.MEMBER }}
        setUserData={setUserData}
      />
    );

    const memberTab = screen.getByRole('tab', { name: 'Gym Member' });
    expect(memberTab).toHaveAttribute('aria-selected', 'true');

    const ownerTab = screen.getByRole('tab', { name: 'Gym Owner' });
    expect(ownerTab).toHaveAttribute('aria-selected', 'false');
  });

  it('calls setUserData with new role when a different tab is clicked', () => {
    render(
      <RoleTabs
        userData={{ gymRole: GymRole.OWNER }}
        setUserData={setUserData}
      />
    );

    const memberTab = screen.getByRole('tab', { name: 'Gym Member' });
    fireEvent.click(memberTab);

    expect(setUserData).toHaveBeenCalledWith(
      expect.any(Function)
    );

    // Simulate and test the callback
    const prevState = { gymRole: GymRole.OWNER };
    const updateFn = setUserData.mock.calls[0][0];
    const newState = updateFn(prevState);

    expect(newState).toEqual({ gymRole: GymRole.MEMBER });
  });
});
