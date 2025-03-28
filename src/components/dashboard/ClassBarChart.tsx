"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

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
const chartData = [
  { browser: "taekwondo", visitors: 2, fill: "var(--color-taekwondo)" },
  { browser: "cycling", visitors: 1, fill: "var(--color-cycling)" },
  { browser: "running", visitors: 3, fill: "var(--color-running)" },
  { browser: "swimming", visitors: 1, fill: "var(--color-swimming)" },
  { browser: "yoga", visitors: 0, fill: "var(--color-yoga)" },
]

const chartConfig = {
  taekwondo: {
    label: "Taekwondo",
    color: "hsl(var(--chart-1))",
  },
  cycling: {
    label: "Cycling",
    color: "hsl(var(--chart-2))",
  },
  running: {
    label: "Running",
    color: "hsl(var(--chart-3))",
  },
  swimming: {
    label: "Swimming",
    color: "hsl(var(--chart-4))",
  },
  yoga: {
    label: "Yoga",
    color: "hsl(var(--chart-5))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function ClassBarChart() {
    
    /*nb. members who have booked each class 
    */
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Bookings</CardTitle>
        <CardDescription>October - March 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Bookings are up this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total class bookings for the last month
        </div>
      </CardFooter>
    </Card>
  )
}
