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

export function AddClassDialog() {
  return (
      <DialogContent className="sm:max-w-[700px] w-full max-w-3xl">
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
               
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="country">Instructor</Label>
              <Select
               
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select country" />
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
                
              />
              <p className="text-sm text-gray-500 mt-2">
                Write a few sentences about this class. 
              </p>
            </div>

            <div className="sm:col-span-1">
              <Label htmlFor="address">Capacity</Label>
              <Input
                id="address"
                className="mt-2"
               
              />
            </div>

            <div className="sm:col-span-3">
              <Label htmlFor="country">Intensity</Label>
              <Select
               
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select country" />
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
            
        </div>
        <DialogFooter>
          <Button type="button">Create</Button>
        </DialogFooter>
      </DialogContent>
   
  )
}
