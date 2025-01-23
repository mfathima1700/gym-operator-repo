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

export function IndividualAccountCard() {
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
                <Input id="name" placeholder="Jane" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label  htmlFor="name">Last Name</Label>
                <Input id="name" placeholder="Doe" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label  htmlFor="name">DOB</Label>
                <InputOTPWithSeparator />
              </div>
              
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </CardFooter>
      </Card>
    )
}
