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
  bookingDate: Date;
  class: {
    name: string;
    id: string;
    time: Date;
    startDate: Date;
    endDate: Date;
  };
}
export function ClassesCards({ bookings }: { bookings: Booking[] }) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Upcoming Classes</CardTitle>
        <CardDescription>Keep track of all of the classes you're booked for</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          {bookings?.length > 0 ? (
            <div className="grid gap-4 py-4">
              {bookings
                // .filter((booking) => {
                //   const classTime = new Date(booking.class.time);
                //   return classTime > new Date(); // Only keep future classes
                // })
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <Label
                      htmlFor={`booking-${booking.class.name}`}
                      className="text-left col-span-2"
                    >
                      {booking.class.name}
                    </Label>

                    <Label
                      htmlFor={`booking-${booking.class.name}`}
                      className="text-right col-span-2 font-normal text-slate-500"
                    >
                      {booking.class.startDate.toLocaleDateString()}
                    </Label>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              <p>No classes booked </p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
