import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";


type GoalData = {
  id: string;
  title: string;
  notes: string;
  targetDate: Date;
  completed: boolean;
  updatedAt: Date;
};
  
  export default function OldGoalsList({goals}: {goals: GoalData[]}): JSX.Element {
    return (
      <div>
        <ul role="list" >
          {goals.map((goal) => (
            <li key={goal.id} className=" gap-x-4 py-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="line-through">{goal.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <Label className="min-h-[120px] font-normal text-gray-500">
            {`Completed on: ${goal.updatedAt.toLocaleDateString()}`}
              </Label>
            </CardContent>
          </Card>
        </li>


            
            
          ))}
        </ul>
        {/* <a
          href="#"
          className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          View all
        </a> */}
      </div>
    );
}
  