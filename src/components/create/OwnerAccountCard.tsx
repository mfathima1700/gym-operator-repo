import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { create } from "domain";

export function OwnerAccountCard({
  onSaveClick,
  createData,
  handleChange,
}: {
  onSaveClick: any;
  createData: any;
  handleChange: any;
}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Gym</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Gym Name</Label>
              <Input id="name" placeholder="Name of your gym"  name="gymName"
              value={createData.gymName}
              onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">First Name</Label>
              <Input id="name" placeholder="Jane" name="firstName"
              value={createData.firstName}
              onChange={handleChange}  />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Last Name</Label>
              <Input id="name" placeholder="Doe" name="lastName"
              value={createData.lastName}
              onChange={handleChange}  />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Gym Address</Label>
              <Textarea name="address" placeholder="123 Main St, Anytown, USA"
              value={createData.address}
              onChange={handleChange} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" >Cancel</Button>
        <Button onClick={onSaveClick}>Create</Button>
      </CardFooter>
    </Card>
  );
}
