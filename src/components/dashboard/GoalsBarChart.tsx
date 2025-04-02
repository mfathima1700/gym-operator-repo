"use client"

import { Star } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function GoalsBarChart({goals }: { goals: any[] }) {

  const now = new Date();


  const chartData = Array.from({ length: 6 }, (_, i) => {
  const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1); // Get the first day of each month
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1); // First day of next month

  return {
    month: date.toLocaleString("en-US", { month: "long" }), // Convert to month name
    value: goals.filter(goal => {
      const updatedAt = new Date(goal.updatedAt);
      return updatedAt >= date && updatedAt < nextMonth && goal.completed; // Check if member joined in the month
    }).length,
  };
});
 
  console.log(chartData)

  const completedGoals = goals.filter(goal => goal.completed === true);
const totalCompletedGoals = completedGoals.length;

   { /* nb. classes booked per month - start date? 
    */}
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals Completed</CardTitle>
        <CardDescription>{`${chartData[0].month} - ${chartData[5].month} ${now.getFullYear()}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
        {` ${totalCompletedGoals} goals completed in total`} 
        </div>
        <div className="leading-none text-muted-foreground">
        Showing nb. of goals completed in the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
