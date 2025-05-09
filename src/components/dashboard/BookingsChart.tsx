"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, Rectangle, XAxis } from "recharts"

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
  bookings: {
    label: "Bookings",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BookingsChart({classes}: {classes: any[]}) {
    
  const now = new Date();
  const chartData = classes.map((classItem) => ({
    name: classItem.name, // Class name
    value: classItem.bookings.length, // Total bookings
  }));

  const mostBookedClass = classes.reduce((maxClass, classItem) => {
    return classItem.bookings.length > maxClass.bookings.length ? classItem : maxClass;
  }, classes[0]); 
 
 // console.log(chartData)
    /*nb. members who have booked each class 
    */
  return (
    <Card>
    <CardHeader>
      <CardTitle>Bookings Per Class</CardTitle>
      <CardDescription>Up until {now.toLocaleString("en-US", { month: "long" })} {now.getFullYear()}</CardDescription>
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
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0,10)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="value" fill="hsl(var(--chart-1))"  radius={8}>
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
       { classes.length > 0 ? `${mostBookedClass.name} was most popular` : "No class data available"} 
      </div>
      <div className="leading-none text-muted-foreground">
      Total bookings for several classes
      </div>
    </CardFooter>
  </Card>
  )
}
