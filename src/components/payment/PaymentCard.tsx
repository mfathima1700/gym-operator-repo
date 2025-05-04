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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PaymentCard({
  handleUpdatePricing,
  price,
  setPrice,
  currentPrice,
}: {
  handleUpdatePricing: any;
  price: number;
  setPrice: any;
  currentPrice?: number;
}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Set Monthly Price</CardTitle>
        <CardDescription>
          Determine a price for your gym members to pay.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            {currentPrice ? (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Current Subscription Price</Label>
                  <Input id="name" disabled value={currentPrice ?? 0} />
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework"> New Subscription Price</Label>
              <Input
                id="framework"
                className="mt-2"
                min={0.5}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="30"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleUpdatePricing}>Update</Button>
      </CardFooter>
    </Card>
  );
}
