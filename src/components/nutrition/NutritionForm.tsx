import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getExerciseData, getNutritionData } from "@/redux/actions/NutritionActions";

export default function NutritionForm({
  exerciseData,
  nutritionData,
}: {
  exerciseData: string;
  nutritionData: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState(() => ({
    activity: "",
    weight: 0,
    quantity: 1,
    item: "",
  }));

  function handleChange(field: string, value: string) {
    setData((prevState: any) => ({
      ...prevState,
      [field]: value,
    }));
  }

  function calculateCalories(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(getExerciseData(data.activity, data.weight))
  }

  function calculateNutrition(e: React.MouseEvent) {
    e.preventDefault()
    dispatch(getNutritionData(`${data.quantity} ${data.item}`))
  }

  return (
    <form className="space-y-12">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <p className="text-sm text-gray-500">
            This information will be displayed publicly, so be careful what you
            share.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
            <div className="sm:col-span-3 grid gap-2">
              <Label htmlFor="first-name">Activity</Label>
              <Input
                id="first-name"
                type="text"
                value={data.activity}
                placeholder="Running"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                name="activity"
              />
            </div>

            <div className="sm:col-span-1 grid gap-2">
              <Label htmlFor="first-name">Weight in lbs</Label>
              <Input
                id="first-name"
                type="number"
                value={data.weight}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                name="weight"
              />
            </div>

            {/* Gym */}
            <div className="sm:col-span-1 grid gap-2">
              <Label htmlFor="first-name" className="mb-4"></Label>
              <Button onClick={calculateCalories}>Calculate</Button>
            </div>

            <div className="col-span-full">{exerciseData}</div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
          <p className="mt-1 text-sm text-gray-400">
            We'll always let you know about important changes, but you pick what
            else you want to hear about.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
            <div className="sm:col-span-1 grid gap-2">
              <Label htmlFor="first-name">Quantity</Label>
              <Input
                id="first-name"
                type="number"
                value={data.quantity}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                name="quantity"
              />
            </div>

            <div className="sm:col-span-3 grid gap-2">
              <Label htmlFor="first-name">Item </Label>
              <Input
                id="first-name"
                type="text"
                placeholder="Apple"
                value={data.item}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                name="item"
              />
            </div>

            {/* Gym */}
            <div className="sm:col-span-1 grid gap-2">
              <Label htmlFor="first-name" className="mb-4"></Label>
              <Button onClick={calculateNutrition}>Calculate</Button>
            </div>

            <div className="col-span-full">{nutritionData}</div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
    </form>
  );
}
