import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

interface Goal {
  id: string;
  title: string;
  notes: string;
  targetDate: Date;
  completed: boolean;
}

export function GoalsCard({ goals }: { goals: Goal[] }) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Goals In Progress</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          {goals?.length > 0 ? (
            <div className="grid gap-4 py-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label
                    htmlFor={`-${goal.title}`}
                    className="text-left col-span-3"
                  >
                    {goal.notes}
                  </Label>
                  <Checkbox
                    id={`-${goal.id}`}
                    checked={goal.completed}
                    className="col-span-1"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              <p>No goals set</p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
       
      </CardFooter>
    </Card>
  );
}
