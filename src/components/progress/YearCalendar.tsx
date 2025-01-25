import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { MonthCalendar } from "./MonthCalendar";
import { YearSelect } from "./YearSelect";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Day {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
}

interface Month {
  name: string;
  days: Day[];
}

const months: Month[] = [
  {
    name: "January",
    days: [{ date: "2021-12-27" }],
  },
  {
    name: "February",
    days: [{ date: "2021-12-27" }],
  },
  {
    name: "March",
    days: [{ date: "2021-12-27" }],
  },
  {
    name: "January",
    days: [{ date: "2021-12-27" }],
  },
  {
    name: "January",
    days: [{ date: "2021-12-27" }],
  },
  {
    name: "January",
    days: [{ date: "2021-12-27" }],
  },
  {
    name: "January",
    days: [{ date: "2021-12-27" }],
  },
  {
    name: "January",
    days: [{ date: "2021-12-27" }],
  },
  {
    name: "January",
    days: [{ date: "2021-12-27" }],
  },
  {
    name: "January",
    days: [{ date: "2021-12-27" }],
  },

  // More months...
];

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function YearCalendar(): JSX.Element {
  return (
    <div>
      <header className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
        <h1 className="text-base font-semibold text-gray-400">
          <time dateTime="2022">2022</time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md  shadow-xs md:items-stretch">
            <Button variant="outline" size="icon">
              <ChevronLeft />
            </Button>

            <div className="md:block px-3.5  py-1 hidden focus:relative">
              <Label>Today</Label>
            </div>

            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <Button variant="outline" size="icon">
              <ChevronRight />
            </Button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <YearSelect />
          </div>
        </div>
      </header>
      <div>
        <div
          className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 
        sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4"
        >
          {months.map((month) => (
            <MonthCalendar />
          ))}
        </div>
      </div>
    </div>
  );
}
