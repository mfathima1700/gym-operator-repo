"use client"

import { TrendingUp } from "lucide-react"
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
    label: "Bookings",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const calculateAverageClassesPerWeek = (bookings:any, monthDate:Date) => {
  // Create the range for the month (start and end date)
  const startDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1); // First day of the month
  const endDate = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0); // Last day of the month

  // Calculate the total number of days in the month
  const totalDaysInMonth = endDate.getDate();

  // Calculate total number of weeks in the month (approximate)
  const totalWeeksInMonth = Math.ceil(totalDaysInMonth / 7);

  // Calculate total number of classes in the month
  const totalClassesThisMonth = bookings.filter((booking: any) => {
    const startDateBooking = new Date(booking.class.startDate);
    const endDateBooking = new Date(booking.class.targetDate);
    
    // Check if the booking's class occurs within the month range
    return startDateBooking >= startDate && endDateBooking <= endDate;
  }).reduce((acc:number, booking:any) => {
    // Sum up the number of occurrences based on the days it runs
    return acc + booking.class.days.length;
  }, 0);

  // Calculate average number of classes per week
  const averageClassesPerWeek = totalClassesThisMonth / totalWeeksInMonth;

  return Math.round(averageClassesPerWeek); // Return as a string rounded to 2 decimal places
};

export function ClassesBarChart({bookings }: { bookings: any[] }) {

  const now = new Date();
  const chartData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1); // Get the first day of each month
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1); // First day of next month
  
    return {
      month: date.toLocaleString("en-US", { month: "long" }), // Convert to month name
      bookings: bookings.filter((booking) => {
        const startDate = new Date(booking.class.startDate);
        const targetDate = new Date(booking.class.targetDate);
  
        if (startDate >= date && targetDate < nextMonth) {
          // Count how many days the class runs in the month
          return booking.class.days.reduce((count:number, day:string) => {
            // Get the number of occurrences of each day in the month
            const dayIndex = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].indexOf(day.toLowerCase());
            const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            let occurrences = 0;
  
            // Loop through all days of the month
            for (let currentDate = firstDayOfMonth; currentDate.getMonth() === date.getMonth(); currentDate.setDate(currentDate.getDate() + 1)) {
              if (currentDate.getDay() === dayIndex) occurrences++;
            }
  
            return count + occurrences; // Sum occurrences for all days
          }, 0); // Accumulate total occurrences of all the days the class runs in the month
        }
  
        return 0;
      }).reduce((acc, curr) => acc + curr, 0), // Sum up the total bookings for this month
    };
  });

 // console.log(chartData)

  const averageClasses = calculateAverageClassesPerWeek(bookings, now);


   { /* nb. classes booked per month - start date? 
    */}

  return (
    <Card>
      <CardHeader>
        <CardTitle>Classes Attended</CardTitle>
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
            <Bar dataKey="bookings" fill="var(--chart-1)" radius={8}>
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
          {`${averageClasses} classes attended per week`} 
        </div>
        <div className="leading-none text-muted-foreground">
          Shows the number of classes attended in the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
