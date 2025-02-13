import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { InputOTPWithSeparator } from "../ui/InputOTPWithSeparator"
import { DateInput } from "@/components/create/DateInput"

export function IndividualAccountCard({
  onSaveClick,
  createData,
  handleChange,
  //handleDateChange
}: {
  onSaveClick: any;
  createData: any;
  handleChange: any;
  //handleDateChange: any;
}) {
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Enter your details</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">First Name</Label>
                <Input id="name" placeholder="Jane" name="firstName"
              value={createData.firstName}
              onChange={handleChange}   />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label  htmlFor="name">Last Name</Label>
                <Input id="lastname" placeholder="Doe" name="lastName"
              value={createData.lastName}
              onChange={handleChange}  />
              </div>
              {/* <div className="flex flex-col space-y-1.5">
                <Label  htmlFor="name">Date of Birth</Label>
                <DateInput  handleDateChange={handleDateChange} value={createData.dob} handleChange={handleChange} />
              </div> */}
              
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={onSaveClick}>Save</Button>
        </CardFooter>
      </Card>
    )
}
