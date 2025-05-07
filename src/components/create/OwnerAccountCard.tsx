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
        <CardTitle>Gym Set Up</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="gymName">Gym Name</Label>
              <Input id="gymName" placeholder="Name of your gym"  name="gymName"
              value={createData.gymName}
              onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Jane" name="firstName"
              value={createData.firstName}
              onChange={handleChange}  />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" name="lastName"
              value={createData.lastName}
              onChange={handleChange}  />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Gym Description</Label>
              <Textarea name="description" id="description" placeholder="A gym description that encourages customers to join"
              value={createData.description}
              onChange={handleChange} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline" >Cancel</Button> */}
        <Button onClick={onSaveClick}>Create</Button>
      </CardFooter>
    </Card>
  );
}
