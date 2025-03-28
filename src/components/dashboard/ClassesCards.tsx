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

interface Booking {
  id: string;
  class: {
    name: string;
    id: string;
    time: Date;
  };
}
export function ClassesCards({ bookings }: { bookings: Booking[] }) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Classes Today:</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          {bookings?.length > 0 ? (
            <div className="grid gap-4 py-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label
                    htmlFor={`booking-${booking.class.name}`}
                    className="text-left col-span-3"
                  >
                    {booking.class.name}
                  </Label>
                  <Input
                  disabled
                    id={`booking-${booking.class.time}`}
                    value={booking.class.name}
                    className="col-span-1"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              <p>No classes booked for today</p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
