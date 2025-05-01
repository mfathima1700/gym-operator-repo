"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddClassDialog } from "@/components/gym/AddClassDialog";
import { cn } from "@/lib/utils";
import { BookClassDialog } from "./BookClassDialog";

const events = [
  {
    title: "Breakfast",
    startTime: "06:00",
    duration: 60, // Duration in minutes
    colStart: 1,
    color: "blue",
  },
  {
    title: "Flight to Paris",
    startTime: "09:30",
    duration: 90, // Duration in minutes
    colStart: 3,
    color: "pink",
  },
  {
    title: "Team Meeting",
    startTime: "08:00",
    duration: 45, // Duration in minutes
    colStart: 6,
    color: "purple",
  },
  {
    title: "Visit Louvre",
    startTime: "07:00",
    duration: 30, // Duration in minutes
    colStart: 5,
    color: "sky",
  },
  {
    title: "Gym",
    startTime: "10:00",
    duration: 60, // Duration in minutes
    colStart: 4,
    color: "rose",
  },
];

const daysOfWeek = [
  { day: "M", name: "Mon" },
  { day: "T", name: "Tue" },
  { day: "W", name: "Wed" },
  { day: "T", name: "Thu" },
  { day: "F", name: "Fri" },
  { day: "S", name: "Sat" },
  { day: "S", name: "Sun" },
];

type ClassType = {
  id: string;
  name: string;
  description?: string;
  gymId: string;
  capacity?: number;
  intensity?: "LOW" | "MODERATE" | "INTENSE" | "EXTREME"; // Adjust based on IntensityRating enum
  skillLevel?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; // Adjust based on SkillLevel enum
  instructorId?: string;
  recurrence?: "ONCE" | "WEEKLY" | "BIWEEKLY"; // Adjust based on Occurrence enum
  duration: number; // In minutes
  days: string[]; // ["Monday", "Wednesday", ...]
  room?: string;
  startDate: Date;
  endDate: Date;
  time: string; // e.g., "10:00"
  colour: string;
};

export default function MemberWeekCalendar({

  handleClick,
  triggerRef,
  classes,
}: {
  handleClick: any;
  triggerRef: any;
  classes: ClassType[];
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const containerNav = useRef<HTMLDivElement | null>(null);
  const containerOffset = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current && containerNav.current && containerOffset.current) {
      // Set the container scroll position based on the current time.
      const currentMinute = new Date().getHours() * 2;
      container.current.scrollTop =
        ((container.current.scrollHeight -
          containerNav.current.offsetHeight -
          containerOffset.current.offsetHeight) *
          currentMinute) /
        1440;
    }
  }, []);

  const generateHourLabels = () => {
    const hours = Array.from({ length: 17 }, (_, i) => i + 6); // Generates an array [6, 7, ..., 22] (6 AM to 10 PM)
    return hours.map((hour) => (
      <div key={hour}>
        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
          {hour % 12 === 0 ? 12 : hour % 12}
          {hour < 12 ? "AM" : "PM"}
        </div>
      </div>
    ));
  };

  const timeToGridRow = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours - 6 + Math.floor(minutes / 60) + 1; // Start from 6 AM
  };

  // get day, month, year, and month name
  const today = new Date();
  const todayDay = today.getDay();

  function getMonthName(year: number, month: number) {
    const name = new Date(year, month).toLocaleString("default", {
      month: "long",
    });
    return name;
  }

  // set start of  week
  const diffToMonday = todayDay === 0 ? -6 : 1 - todayDay;
  const startOfWeekFirst = new Date(today);
  startOfWeekFirst.setDate(today.getDate() + diffToMonday);

  const [startOfWeek, setStartOfWeek] = useState<Date>(() => startOfWeekFirst);
  const endOfWeekFirst = new Date(startOfWeek);
  endOfWeekFirst.setDate(startOfWeek.getDate() + 6);
  console.log(endOfWeekFirst);
  const [endOfWeek, setEndOfWeek] = useState<Date>(() => endOfWeekFirst);

  const [weekdays, setWeekdays] = useState<
    { day: string; date: number; name: string; isHighlighted?: boolean }[]
  >(() => updateWeekdays(startOfWeekFirst));

  function updateWeekdays(newStartOfWeek: Date) {
    const weekdays = daysOfWeek.map((day, index) => {
      const date = new Date(newStartOfWeek);
      date.setDate(newStartOfWeek.getDate() + index); // Add the day offset to get the correct date

      return {
        ...day,
        date: date.getDate(),
        isHighlighted: date.toDateString() === today.toDateString(),
      };
    });

    return weekdays;
  }

  const handlePreviousWeek = (e: React.MouseEvent) => {
    // Move 7 days back to get the previous week
    const newStartOfWeek = new Date(startOfWeek);
    newStartOfWeek.setDate(startOfWeek.getDate() - 7);
    setStartOfWeek(newStartOfWeek);

    setWeekdays(updateWeekdays(newStartOfWeek));

    const newEndOfWeek = new Date(endOfWeek);
    newEndOfWeek.setDate(newStartOfWeek.getDate() + 6);
    setEndOfWeek(newEndOfWeek);
    console.log(newEndOfWeek);
  };

  // Function to go to the next week
  const handleNextWeek = (e: React.MouseEvent) => {
    const newStartOfWeek = new Date(startOfWeek);
    newStartOfWeek.setDate(startOfWeek.getDate() + 7); // Move 7 days forward to get the next week
    setStartOfWeek(newStartOfWeek);

    setWeekdays(updateWeekdays(newStartOfWeek));

    const newEndOfWeek = new Date(endOfWeek);
    newEndOfWeek.setDate(newStartOfWeek.getDate() + 6);
    setEndOfWeek(newEndOfWeek);
    console.log(newEndOfWeek);
  };

  function formatTime(dateTime: string | Date): string {
    const date = dateTime instanceof Date ? dateTime : new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const dayToColumn = (day: string): number => {
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    const index = days.indexOf(day.toLowerCase()); // Ensure case insensitivity
    return index === -1 ? 1 : index + 1; // Default to 1 if invalid day
  };

  const generateColourLI = (name: string): string => {
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ["bg-red-950 hover:bg-red-900", "bg-blue-950 hover:bg-blue-900",
       "bg-emerald-950 hover:bg-emerald-900", "bg-amber-950 hover:bg-amber-900", 
      "bg-cyan-950 hover:bg-cyan-900", "bg-violet-950 hover:bg-violet-900", 
    "bg-fuchsia-950 hover:bg-fuchsia-900", "bg-rose-950 hover:bg-rose-900"];
    return colors[hash % colors.length]; // Cycle through the color list based on hash
  };

  const generateColourP1 = (name: string): string => {
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ["text-red-400 ", "text-blue-400 ",
       "text-emerald-950", "text-amber-400", 
      "text-cyan-400", "text-violet-400", 
    "text-fuchsia-400", "text-rose-400"];
    return colors[hash % colors.length]; // Cycle through the color list based on hash
  };

  //text-lime-100 group-hover:text-lime-300
  const generateColourP2 = (name: string): string => {
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ["text-red-100 group-hover:text-red-300", "text-blue-100 group-hover:text-blue-300",
       "text-emerald-100 group-hover:text-emerald-300", "text-amber-100 group-hover:text-amber-300", 
      "text-cyan-100 group-hover:text-cyan-300", "text-violet-100 group-hover:text-violet-300", 
    "text-fuchsia-100 group-hover:text-fuchsia-300", "text-rose-100 group-hover:text-rose-300"];
    return colors[hash % colors.length]; // Cycle through the color list based on hash
  };

  function endsInWeek(classStartDate:Date, classEndDate:Date):boolean {
    
    if(classEndDate <= endOfWeek && classEndDate >= startOfWeek){
      return true;
    }else{
      return false;
    }
  }

  function startsInWeek(classStartDate:Date, classEndDate:Date):boolean {
    
    if(classStartDate >= startOfWeek && classStartDate <= endOfWeek){
      return true;
    }else{
      return false;
    }
  }

  function runningInWeek(classStartDate:Date, classEndDate:Date):boolean {
    
    if(classStartDate <= startOfWeek && classEndDate >= endOfWeek){
      return true;
    }else{
      return false;
    }
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-between border-b border-gray-700 px-6 py-4">
        <h1 className="text-base font-semibold text-gray-200">
          <time
            dateTime={`${startOfWeek.getFullYear()}-${new Date().getMonth() + 1}`}
          >
            {`${getMonthName(startOfWeek.getFullYear(), startOfWeek.getMonth())} ${startOfWeek.getFullYear()}`}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md shadow-xs md:items-stretch">
            <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
              <ChevronLeft />
            </Button>

            <div className="md:block px-3.5  py-1 hidden focus:relative">
              <Label>Today</Label>
            </div>

            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <Button variant="outline" size="icon" onClick={handleNextWeek}>
              <ChevronRight />
            </Button>
          </div>
          
         
        </div>
      </header>
      <div
        ref={container}
        className="isolate flex flex-auto flex-col overflow-auto  "
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full "
        >
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none  ring-1 shadow-sm ring-black/5 sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm/6 text-gray-900 sm:hidden">
              {weekdays.map(({ day, date, name, isHighlighted }) => (
                <button
                  key={date}
                  type="button"
                  className="flex flex-col items-center pt-2 pb-3"
                >
                  {name}{" "}
                  <span
                    className={`mt-1 flex size-8 items-center justify-center font-semibold ${
                      isHighlighted
                        ? "rounded-full bg-lime-600 text-gray-200"
                        : "text-gray-500"
                    }`}
                  >
                    {date}
                  </span>
                </button>
              ))}
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-700 border-r border-b border-gray-700 text-sm/6 text-gray-400 sm:grid">
              <div className="col-end-1 w-14" />
              {weekdays.map(({ day, date, name, isHighlighted }) => (
                <div
                  key={date}
                  className="flex items-center justify-center py-3"
                >
                  <span className={isHighlighted ? "flex items-baseline" : ""}>
                    {name}{" "}
                    <span
                      className={`items-center justify-center font-semibold ${
                        isHighlighted
                          ? "ml-1.5 flex size-8 rounded-full bg-lime-600 text-gray-200"
                          : "text-gray-200"
                      }`}
                    >
                      {date}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-auto ">
            <div className="sticky left-0 z-10 w-14 flex-none  ring-1 ring-gray-700" />

            <div className="grid flex-auto grid-cols-1 grid-rows-1 ">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-700"
                style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-700 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
               className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
               style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
              >
                {classes.flatMap((classObject, index) => {
                  // Ensure that we only process classObjects with valid days
                  if (!classObject.days || classObject.days.length === 0) {
                    return null; // Skip rendering this class if days array is empty or undefined
                  }

                  const classStartDate = new Date(classObject.startDate);
                  const classEndDate = new Date(classObject.endDate)
                    

                  // Ensure the class is within the current week
                  if ((startsInWeek(classStartDate, classEndDate) || runningInWeek(classStartDate, classEndDate) ||
                   endsInWeek(classStartDate, classEndDate))) {
                    return null;
                  }

                  return classObject.days.map((day) => {
                    const startRow = timeToGridRow(
                      formatTime(classObject.startDate)
                    );
                    const durationRows = Math.floor(classObject.duration / 60); // Convert duration to grid rows
                    const gridRow = `${startRow} / span ${durationRows}`;

                    return (
                      <li
                        key={`${index}-${day}`} // Ensure uniqueness across multiple days
                        className={cn(`relative mt-px flex 
                          sm:col-start-${dayToColumn(day)}  rounded-lg `, 
                          generateColourLI(classObject.name))}
                        style={{ gridRow }}
                      >
                         <Dialog>
                         <DialogTrigger asChild>
                        <button
                          onClick={handleClick}  ref={triggerRef}
                          className={`group absolute inset-1 flex flex-col  
                         p-2 text-xs/5`}
                        >
                          <p
                            className={cn(`order-1 font-semibold text-lime-400`, generateColourP1(classObject.name))}
                          >
                            {classObject.name}
                          </p>
                          <p
                            className={cn(`text-lime-100 group-hover:text-lime-300`, 
                              generateColourP2(classObject.name))}
                          >
                            <time
                              dateTime={classObject.startDate.toISOString()}
                            >
                              {formatTime(classObject.startDate)}
                            </time>
                          </p>
                        </button>

                        <BookClassDialog  classData={classObject}
                            bookClassClick={handleClick}
                            triggerRef={triggerRef}
                        />
                        </DialogTrigger>
                        </Dialog>
                      </li>
                    );
                  });
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
