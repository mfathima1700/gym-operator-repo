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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function GoogleForm({
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
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Account Setup</CardTitle>
          <CardDescription>Select a Role </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <RoleTabs setUserData={setUserData} userData={userData} />
              {userData.gymRole === GymRole.MEMBER ? (
                <>
                  <Label htmlFor="email">Gym Code</Label>
                  <div className="flex flex-col space-y-1.5">
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
                </>
              ) : (
                <></>
              )}
              {/* {userData.gymRole === GymRole.OWNER ? (
                <>
                  <Label htmlFor="email">Gym Name</Label>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="code"
                      className="col-span-3"
                      type="text"
                      name="gymName"
                      placeholder="Best Gym"
                      value={userData.gymName}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <></>
              )} */}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={signUp}>Get Started</Button>
        </CardFooter>
      </Card>
    </>
  );
}
