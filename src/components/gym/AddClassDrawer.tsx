import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectInstructor } from "./SelectInstructor";
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import DaySelector from "./DaySelector";

export function AddClassDrawer() {
  return (
    <DrawerContent>
        <div className="mx-auto w-full max-w-4xl">
    <DrawerHeader>
      <DrawerTitle>Add Class</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
        <div className="sm:col-span-2">
              <Label htmlFor="address">Class Name</Label>
              <Input
                id="address"
                className="mt-2"
               
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="country">Instructor</Label>
              <Select
               
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

            <div className="sm:col-span-2">
              <Label htmlFor="country">Intensity</Label>
              <Select
               
              >
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

            <div className="col-span-full">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={2}
                className="mt-2"
                
              />
              
            </div>

            <div className="sm:w-[75px]">
              <Label htmlFor="address">Capacity</Label>
              <Input
                id="address"
                className="mt-2"
               
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="country">Time</Label>
              <Select
               
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">One-off</SelectItem>
                  <SelectItem value="ca">Weekly</SelectItem>
                  <SelectItem value="mx">Fortnightly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-4">
            <DaySelector />
            </div>
            
        </div>
        <DrawerFooter>
      <Button >Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
    </div>
  </DrawerContent>

   
  )
}
