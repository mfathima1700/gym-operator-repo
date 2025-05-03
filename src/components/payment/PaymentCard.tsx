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

export function PaymentCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Set Monthly Price</CardTitle>
        <CardDescription>-- a price for your gym members to pay.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Subscription Price</Label>
              <Input
                id="framework"
                className="mt-2"
                min={0.5}
                type="number"
                placeholder="Subscription Price"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Update</Button>
      </CardFooter>
    </Card>
  )
}
