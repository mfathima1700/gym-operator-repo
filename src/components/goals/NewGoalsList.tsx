import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type GoalData = {
  id: string;
  title: string;
  notes: string;
  targetDate: Date;
  completed: boolean;
};



export default function NewGoalsList({goals}: {goals: GoalData[]}): JSX.Element {
  return (
    <ul role="list" className="">
      {goals.map((goal) => (
        <li key={goal.id} className=" gap-x-4 py-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle >{goal.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Label className="min-h-[120px] font-normal text-gray-500">
                {goal.notes}
              </Label>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
