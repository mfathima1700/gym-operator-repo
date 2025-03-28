import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  getExerciseData,
  getNutritionData,
} from "@/redux/actions/NutritionActions";
import { FitnessTable } from "./FitnessTable";
import { FoodTable } from "./FoodTable";

export default function NutritionForm({
  exerciseData,
  nutritionData,
}: {
  exerciseData: any;
  nutritionData: any;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState(() => ({
    activity: "",
    weight: 0,
    duration: 60,
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
    dispatch(getExerciseData(data.activity, data.weight, data.duration));
  }

  function calculateNutrition(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(getNutritionData(`${data.quantity} ${data.item}`));
  }

  return (
    <form className="space-y-12">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Activity Information</h2>
          <p className="text-sm text-gray-500">
            Calculate the number of calories burned during an activity.
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

            <div className="sm:col-span-1 grid gap-2">
              <Label htmlFor="first-name">Duration</Label>
              <Input
                id="first-name"
                type="number"
                value={data.duration}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                name="duration"
              />
            </div>

            {/* Gym */}
            <div className="sm:col-span-1 grid gap-2">
              <Label htmlFor="first-name" className="mb-4"></Label>
              <Button onClick={calculateCalories}>Calculate</Button>
            </div>

            {exerciseData ? (
              <div className="col-span-full">
                 <Label htmlFor="first-name" className="mb-4">Results</Label>
                <FitnessTable exerciseData={ exerciseData } />
              </div>
            ) : (
              <></>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-white">Nutritional Information</h2>
          <p className="mt-1 text-sm text-gray-400">
           Calculate the nutritional information for a food item.
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

            {nutritionData ? (
              <div className="col-span-full">
                 <Label htmlFor="first-name" className="mb-4">Results</Label>
                <FoodTable nutritionData={ nutritionData } />
              </div>
            ) : (
              <></>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
    </form>
  );
}
