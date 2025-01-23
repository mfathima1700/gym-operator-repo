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
import { Textarea } from "@/components/ui/textarea"


export function OwnerAccountCard() {
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
              <Input id="name" placeholder="Name of your gym" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label  htmlFor="name">First Name</Label>
              <Input id="name" placeholder="Jane" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label  htmlFor="name">Last Name</Label>
              <Input id="name" placeholder="Doe" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Gym Address</Label>
              <Textarea />

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
