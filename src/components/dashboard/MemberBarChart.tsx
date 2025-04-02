"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MemberBarChart({members}: {members: any[]}) {
  const now = new Date();


  const chartData = Array.from({ length: 6 }, (_, i) => {
  const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1); // Get the first day of each month
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1); // First day of next month

  return {
    month: date.toLocaleString("en-US", { month: "long" }), // Convert to month name
    desktop: members.filter(member => {
      const createdAt = new Date(member.createdAt);
      return createdAt >= date && createdAt < nextMonth; // Check if member joined in the month
    }).length,
  };
});

  {
    /*nb members joining per month */
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Members Per Month</CardTitle>
        <CardDescription>{`${chartData[0].month} - ${chartData[5].month} ${now.getFullYear()}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
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
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="flex gap-2 font-medium leading-none">
  Increased by{" "}
  {chartData[0].desktop > 0
    ? ((chartData[5].desktop - chartData[0].desktop) / chartData[0].desktop) * 100
    : chartData[5].desktop > 0
    ? 100
    : 0
  }% in the last 6 months <TrendingUp className="h-4 w-4" />
</div>
        <div className="leading-none text-muted-foreground">
          Showing total new gym members for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
