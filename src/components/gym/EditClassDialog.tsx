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
import { EndDateControl } from "./EndDateConrol";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";

export function EditClassDialog({
  classData,
  handleChange,
  onSaveClick,
  toggleDay,
}: {
  classData: any;
  handleChange: any;
  onSaveClick: any;
  toggleDay: any;
}) {

  function onCancelClick(e: React.MouseEvent) {
    e.preventDefault();

  }

  function onDeleteClick(e: React.MouseEvent) {
    e.preventDefault();
  }
  return (
    <DialogContent className="sm:max-w-[700px] w-full max-w-3xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add Class</DialogTitle>
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
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">Instructor</Label>
          <Select
            value={classData.instructorId}
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
            className="mt-2"
            value={classData.description}
            name="description"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-2">
            Write a few sentences about this class.
          </p>
        </div>

        <div className="sm:col-span-3">
          <Label htmlFor="time">Time</Label>
          <Input
        type="time"
        placeholder="HH:MM"
        value={classData.time}
        onChange={handleChange}
        maxLength={5}
        min="08:00"
        max="20:00"
        className={cn(
          " mt-2 w-24 text-center  ",
         
        )}
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
              onChange={(newDate) => {
                //const existingTime = new Date(classData.startDate);
                //newDate.setHours(existingTime.getHours(), existingTime.getMinutes());
                handleChange("startDate", newDate);
              }}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">End Date</Label>
          <div className="mt-2">
            <EndDateControl
              date={classData.endDate}
              onChange={(newDate) => {
                //const existingTime = new Date(classData.endDate);
                //newDate.setHours(existingTime.getHours(), existingTime.getMinutes());
                handleChange("endDate", newDate);
              }}
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          <DaySelector selectedDays={classData.days} toggleDay={toggleDay} />
        </div>
        <div className="sm:w-[75px]">
          <Label htmlFor="address">Capacity</Label>
          <Input
            id="address"
            className="mt-2"
            value={classData.capacity}
            name="capacity"
            type="number"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">Skill Level</Label>
          <Select
            value={classData.skillLevel}
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
            value={classData.duration}
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
            value={classData.room}
            name="room"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
      <Button type="button" onClick={onCancelClick}>
         Cancel
        </Button>

      <Button type="button" onClick={onDeleteClick}>
         Delete
        </Button>

        <Button type="button" onClick={onSaveClick}>
         Update
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
