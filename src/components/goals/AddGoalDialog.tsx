import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { table } from "console";
import { createGoal } from "@/redux/actions/GoalActions";
import { on } from "events";
import { TargetDateControl } from "./TargetDateControl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

function AddGoalDialog({ triggerRef, id }: { triggerRef: any; id: string }) {
  const dispatch = useDispatch<AppDispatch>();

  type GoalData = {
    title: string;
    notes: string;
    targetDate: Date;
    completed: boolean;
  };

  const initalState = {
    title: "", // Class name
    notes: "", // Description of the class
    targetDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    completed: false,
  };

  const [goalData, setGoalData] = useState<GoalData>(() => initalState);

  const handleChange = (field: string, value: any) => {
    setGoalData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function onSaveClick(e: React.MouseEvent) {
    //e.preventDefault();
    triggerRef.current?.click();
    console.log(goalData);
    dispatch(createGoal(goalData, id));
    setGoalData(initalState);
  }

  return (
    <>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Goal</DialogTitle>
          <DialogDescription>Add your fitness goals here.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4  py-4 sm:grid-cols-6">
          <div className="col-span-full">
            <Label htmlFor="address">Title</Label>
            <Input
              id="address"
              className="mt-2"
              value={goalData.title}
              name="title"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              required
            />
          </div>
          <div className="col-span-full">
            <Label htmlFor="address">Description</Label>
            <Textarea
              id="address"
              className="mt-2"
              value={goalData.notes}
              name="notes"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="sm:col-span-3 ">
            <Label htmlFor="country">Target Date</Label>
            <div className="mt-2">
              <TargetDateControl
                date={goalData.targetDate}
                isOwner={false}
                handleChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={goalData.completed}
                onCheckedChange={(checked) => handleChange("completed", checked === true)} 
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Completed
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSaveClick}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}

export default AddGoalDialog;
