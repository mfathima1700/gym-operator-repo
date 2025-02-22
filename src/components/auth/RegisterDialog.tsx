import { GymRole } from "@prisma/client";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import RoleTabs from "./RoleTabs";

export default function RegisterDialog({
  signUp,
  userData,
  setUserData,
  handleChange,
}: {
  signUp: any;
  userData: any;
  setUserData: any;
  handleChange: any;
}) {
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          {/* Make sure that x closes dialog and changes state*/}
          <DialogDescription>
            Select your role. If you are a gym member, you will need to enter a code. 
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RoleTabs setUserData={setUserData} userData={userData} />
          {userData.gymRole === GymRole.MEMBER ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">Gym Code</Label>
              <Input
                id="code"
                className="col-span-3"
                type="text"
                name="gymCode"
                placeholder="0A7D78F03M"
                value={userData.gymCode}
                onChange={handleChange}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={signUp}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
