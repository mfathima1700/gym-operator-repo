import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectInstructor } from "@/components/gym/SelectInstructor";
import DaySelector from "@/components/gym/DaySelector";
import { StartDateControl } from "@/components/gym/StartDateControl";
import { EndDateControl } from "@/components/gym/EndDateControl";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import {
  bookClass,
  cancelClass,
  deleteClass,
  updateClass,
} from "@/redux/actions/ClassActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { sendDeleteEmail } from "@/redux/actions/EmailActions";

interface UserInfo {
  id: string;
  email: string;
  name: string;
  gym: {
    name: string;
  };
}

type ClassData = {
  id: string;
  name: string;
  description: string;
  instructorId: string;
  startDate: Date;
  endDate: Date;
  capacity: string;
  intensity: string;
  recurrence: string;
  duration: string;
  days: string[]; // Explicitly specify the type here
  room: string;
  skillLevel: string;
  time: string;
  bookings?: any[];
};

export function MyBookingDialog({
  bookingId,
  gymClass,
  bookingRef,
}: {
  bookingId: string;
  gymClass: ClassData;
  bookingRef: any;
}) {
  const dispatch = useDispatch<AppDispatch>();

  function onCancelClick(e: React.MouseEvent) {
    e.preventDefault();
    bookingRef.current?.click();
  }

  return (
    <DialogContent className="sm:max-w-[700px] w-full max-w-3xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogDescription>
          View your booking here.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Label htmlFor="address">Class Name</Label>
          <Input
            id="address"
            className="mt-2"
            value={gymClass.name}
            name="name"
            required
            disabled={true}
          />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">Instructor</Label>
          <Select value={gymClass.instructorId} disabled={true}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select instructor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="mx">Mexico</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="fa">France</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-full">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={2}
            disabled={true}
            className="mt-2"
            value={gymClass.description}
            name="description"
          />
          <p className="text-sm text-gray-500 mt-2">
            Write a few sentences about this class. Include requirements here.
          </p>
        </div>

        <div className="sm:col-span-3">
          <Label htmlFor="time">Time</Label>
          <Input
            type="time"
            name="time"
            placeholder="HH:MM"
            disabled={true}
            value={gymClass.time}
            maxLength={5}
            min="08:00"
            max="20:00"
            className={cn(" mt-2 w-24 text-center  ")}
          />

          {/* className={cn(
          "w-24 text-center tracking-widest text-lg font-semibold ",
          !isValid ? "border-red-500 focus:ring-red-500" : ""
        )} */}
        </div>

        <div className="sm:col-span-3">
          <Label htmlFor="country">Recurrance</Label>
          <Select value={gymClass.recurrence} disabled={true}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select occurance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ONCE">Once</SelectItem>
              <SelectItem value="WEEKLY">Weekly</SelectItem>
              <SelectItem value="BIWEEKLY">Biweekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">Start Date</Label>
          <div className="mt-2">
            <StartDateControl
              date={gymClass.startDate}
              isOwner={false}
              handleChange={(_field: string, _value: any) => {}}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">End Date</Label>
          <div className="mt-2">
            <EndDateControl
              isOwner={false}
              date={gymClass.endDate}
              handleChange={(_field: string, _value: any) => {}}
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          <DaySelector
            selectedDays={gymClass.days}
            toggleDay={(_value: any) => {}}
            isOwner={false}
          />
        </div>
        <div className="sm:w-[75px]">
          <Label htmlFor="address">Capacity</Label>
          <Input
            id="address"
            className="mt-2"
            value={gymClass.capacity}
            name="capacity"
            disabled={true}
            type="number"
          />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">Skill Level</Label>
          <Select value={gymClass.skillLevel} disabled={true}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select skill level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BEGINNER">Beginner</SelectItem>
              <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
              <SelectItem value="ADVANCED">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">Intensity</Label>
          <Select value={gymClass.intensity} disabled={true}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select intensity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MODERATE">Moderate</SelectItem>
              <SelectItem value="INTENSE">Intense</SelectItem>
              <SelectItem value="EXTREME">Extreme</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">Duration</Label>
          <Select value={gymClass.duration.toString()} disabled={true}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="20">20 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="75">1 hour 15 minutes</SelectItem>
              <SelectItem value="90">1 hour 30 minutes</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
              <SelectItem value="180">3 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="address">Room</Label>
          <Input
            id="address"
            className="mt-2"
            disabled={true}
            value={gymClass.room}
            name="room"
          />
        </div>
      </div>
      <DialogFooter className="flex flex-row space-x-4 gap-x-2">
        <Button
          type="button"
          onClick={onCancelClick}
          className="bg-lime-600 hover:bg-lime-500 focus-visible:outline-lime-600 text-white"
        >
          Cancel Booking
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
