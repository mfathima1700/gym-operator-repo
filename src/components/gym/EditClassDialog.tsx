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
import { SelectInstructor } from "./SelectInstructor";
import DaySelector from "./DaySelector";
import { StartDateControl } from "./StartDateControl";
import { EndDateControl } from "./EndDateControl";
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
 gym:{
  name: string;
 }
}

export function EditClassDialog({
  bookings,
  gymClass,
  editTriggerRef,
  gymId,
  today,
  isOwner,
  user
}: {
  bookings: any;
  gymClass: any;
  editTriggerRef:any
  gymId: string;
  isOwner: boolean;
  today: Date;
  user:UserInfo
}) {
  const dispatch = useDispatch<AppDispatch>();

  function onCancelClick(e: React.MouseEvent) {
    e.preventDefault();
    //dispatch(cancelClass(classData.id)); send email to user to cancel for today
    dispatch(cancelClass(classData.id));
  }

  function onDeleteClick(e: React.MouseEvent) {
    e.preventDefault();
    editTriggerRef.current?.click();
    const emailData = {
      email: user.email,
      name: user.name,
      gymName: user?.gym?.name,
      className: gymClass.name,
    };
    dispatch(sendDeleteEmail(emailData));
    dispatch(deleteClass(classData.id));
  }

  function onBookClick(e: React.MouseEvent) {
    e.preventDefault();
    editTriggerRef.current?.click();

    console.log("user id " + user.id)
    dispatch(bookClass(classData.id, user.id));
  }

  function onUpdateClick(e: React.MouseEvent) {
    e.preventDefault();
    editTriggerRef.current?.click();
    dispatch(updateClass(classData, classData.id));
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
    bookings: any[];
  };

  const [classData, setClassData] = useState<ClassData>(() => gymClass);
  
    const handleChange = (field: string, value: any) => {
      setClassData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };


    const toggleDay = (day: string) => {
        setClassData((prev) => ({
          ...prev,
          days: prev.days.includes(day)
            ? prev.days.filter((d) => d !== day) // Remove if already selected
            : [...prev.days, day], // Add if not selected
        }));
      };

    
  return (
    <DialogContent className="sm:max-w-[700px] w-full max-w-3xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Class</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Label htmlFor="address">Class Name</Label>
          <Input
            id="address"
            className="mt-2"
            value={classData.name}
            name="name"
            required
            disabled={!isOwner}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">Instructor</Label>
          <Select
            value={classData.instructorId}
            disabled={!isOwner}
            onValueChange={(value) => handleChange("instructorId", value)}
          >
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
            disabled={!isOwner}
            className="mt-2"
            value={classData.description}
            name="description"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
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
            disabled={!isOwner}
            value={classData.time}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
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
          <Select
            value={classData.recurrence}
            disabled={!isOwner}
            onValueChange={(value) => handleChange("recurrence", value)}
          >
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
              date={classData.startDate}
              isOwner={isOwner}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">End Date</Label>
          <div className="mt-2">
            <EndDateControl
              isOwner={isOwner}
              date={classData.endDate}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          <DaySelector
            selectedDays={classData.days}
            toggleDay={toggleDay}
            isOwner={isOwner}
          />
        </div>
        <div className="sm:w-[75px]">
          <Label htmlFor="address">Capacity</Label>
          <Input
            id="address"
            className="mt-2"
            value={classData.capacity}
            name="capacity"
            disabled={!isOwner}
            type="number"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">Skill Level</Label>
          <Select
            value={classData.skillLevel}
            disabled={!isOwner}
            onValueChange={(value) => handleChange("skillLevel", value)}
          >
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
          <Select
            value={classData.intensity}
            disabled={!isOwner}
            onValueChange={(value) => handleChange("intensity", value)}
          >
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
          <Select
            value={classData.duration.toString()}
            disabled={!isOwner}
            onValueChange={(value) => handleChange("duration", value)}
          >
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
            disabled={!isOwner}
            value={classData.room}
            name="room"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <DialogFooter className="flex flex-row space-x-4 gap-x-2">
  {isOwner ? (
    <>
      <Button variant="secondary" onClick={onCancelClick}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={onDeleteClick}>
        Delete
      </Button>
      <Button type="button" onClick={onUpdateClick}>
        Update
      </Button>
    </>
  ) : null}

  <Button
    type="button"
    onClick={onBookClick}
    className="bg-lime-600 hover:bg-lime-500 focus-visible:outline-lime-600 text-white"
  >
    Book
  </Button>
</DialogFooter>
    </DialogContent>
  );
}
