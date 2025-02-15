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

export function AddClassDialog() {
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
          <Input id="address" className="mt-2" />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="country">Instructor</Label>
          <Select>
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
          <Textarea id="description" rows={2} className="mt-2" />
          <p className="text-sm text-gray-500 mt-2">
            Write a few sentences about this class.
          </p>
        </div>

        <div className="sm:col-span-3">
        <Label htmlFor="country">Start Date</Label>
        <div className="mt-2">
        <StartDateControl />
        </div>
         
        </div>
        <div className="sm:col-span-3">
        <Label htmlFor="country">End Date</Label>
        <div className="mt-2">
          <EndDateControl />
          </div>
        </div>

        <div className="sm:w-[75px]">
          <Label htmlFor="address">Capacity</Label>
          <Input id="address" className="mt-2" />
        </div>

        <div className="sm:col-span-4">
          <DaySelector />
        </div>

        <div className="sm:col-span-3">
          <Label htmlFor="country">Intensity</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select intensity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">Beginner</SelectItem>
              <SelectItem value="ca">Intermediate</SelectItem>
              <SelectItem value="mx">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-3">
          <Label htmlFor="country">Recurrance</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select occurance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">One-off</SelectItem>
              <SelectItem value="ca">Weekly</SelectItem>
              <SelectItem value="mx">Biweekly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-3">
          <Label htmlFor="country">Duration</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">20 minutes</SelectItem>
              <SelectItem value="ew">30 minutes</SelectItem>
              <SelectItem value="ca">45 minutes</SelectItem>
              <SelectItem value="ee">60 minutes</SelectItem>
              <SelectItem value="of">75 minutes</SelectItem>
              <SelectItem value="ev">90 minutes</SelectItem>
              <SelectItem value="vb">120 minutes</SelectItem>
              <SelectItem value="fd">180 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-3">
          <Label htmlFor="address">Location</Label>
          <Input id="address" className="mt-2" />
        </div>
      </div>
      <DialogFooter>
        <Button type="button">Create</Button>
      </DialogFooter>
    </DialogContent>
  );
}
