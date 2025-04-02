"use client";
import { TrendingDown, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
    label: "Nb. Members",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
export function MemberGraph({ members }: { members: any[] }) {
  const now = new Date();
  const chartData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1); // Get the first day of each month
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1); // First day of next month

    return {
      month: date.toLocaleString("en-US", { month: "long" }), // Convert to month name
      desktop: members.filter((member) => {
        const createdAt = new Date(member.createdAt);
        return createdAt >= date && createdAt < nextMonth; // Check if member joined in the month
      }).length,
    };
  });

  const percentage =
    ((chartData[4].desktop - chartData[5].desktop) / chartData[5].desktop) *
    100;
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Members Per Month</CardTitle>
        <CardDescription>{`${chartData[0].month} - ${chartData[5].month} ${now.getFullYear()}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {percentage > 0 ? (
            <>
              Increased by {isFinite(percentage) ? percentage: 0}% this month{" "}
              <TrendingUp className="h-4 w-4" />
            </>
          ) : percentage < 0 ? (
            <>
              Decreased by {isFinite(percentage) ? Math.abs(percentage) : 0}% this month{" "}
              <TrendingDown className="h-4 w-4" />
            </>
          ) : (
            <>No change this month</>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing members over the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
