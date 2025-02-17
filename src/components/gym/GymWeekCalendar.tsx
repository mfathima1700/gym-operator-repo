"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddClassDialog } from "./AddClassDialog";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import { AddClassDrawer } from "./AddClassDrawer";

interface WeekdayButtonProps {
  day: string;
  date: number;
  isHighlighted?: boolean;
}

const WeekdayButton = ({
  day,
  date,
  isHighlighted = false,
}: WeekdayButtonProps) => (
  <button type="button" className="flex flex-col items-center pt-2 pb-3">
    {day}{" "}
    <span
      className={`mt-1 flex size-8 items-center justify-center font-semibold ${
        isHighlighted
          ? "rounded-full bg-indigo-600 text-gray-200"
          : "text-gray-900"
      }`}
    >
      {date}
    </span>
  </button>
);

interface WeekdayCellProps {
  day: string;
  date: number;
  isHighlighted?: boolean;
}

const WeekdayCell = ({
  day,
  date,
  isHighlighted = false,
}: WeekdayCellProps) => (
  <div className="flex items-center justify-center py-3">
    <span className={isHighlighted ? "flex items-baseline" : ""}>
      {day}{" "}
      <span
        className={`items-center justify-center font-semibold ${
          isHighlighted
            ? "ml-1.5 flex size-8 rounded-full bg-lime-600 text-gray-200"
            : "text-gray-400"
        }`}
      >
        {date}
      </span>
    </span>
  </div>
);

const events = [
  {
    title: "Breakfast",
    startTime: "06:00",
    duration: 60, // Duration in minutes
    colStart: 3,
    color: "blue",
  },
  {
    title: "Flight to Paris",
    startTime: "12:30",
    duration: 90, // Duration in minutes
    colStart: 3,
    color: "pink",
  },
  {
    title: "Meeting with design team at Disney",
    startTime: "10:00",
    duration: 120, // Duration in minutes
    colStart: 6,
    color: "purple",
  },
];

export default function GymWeekCalendar({
  classData,
  handleChange,
  onSaveClick,
  toggleDay,
  triggerRef,
}: {
  classData: any;
  handleChange: any;
  onSaveClick: any;
  toggleDay: any;
  triggerRef: any;
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const containerNav = useRef<HTMLDivElement | null>(null);
  const containerOffset = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current && containerNav.current && containerOffset.current) {
      // Set the container scroll position based on the current time.
      const currentMinute = new Date().getHours() * 60;
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

  const getRandomColor = () => {
    const colors = ["blue", "pink", "gray", "indigo", "purple", "teal"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const timeToGridRow = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours - 6) * 12 + minutes / 5 + 1; // Start from 6 AM
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-between border-b border-gray-700 px-6 py-4">
        <h1 className="text-base font-semibold text-gray-200">
          <time dateTime="2022-01">January 2022</time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md shadow-xs md:items-stretch">
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
            <div className="ml-6 h-6 w-px bg-gray-700" />
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  ref={triggerRef}
                  className="ml-6 rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-gray-200 shadow-xs hover:bg-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                >
                  Add class
                </button>
              </DialogTrigger>

              <AddClassDialog
                classData={classData}
                handleChange={handleChange}
                onSaveClick={onSaveClick}
                toggleDay={toggleDay}
              />
            </Dialog>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="size-5" aria-hidden="true" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-gray-200 ring-1 shadow-lg ring-black/5 focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Add Class
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Go to today
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </header>
      <div
        ref={container}
        className="isolate flex flex-auto flex-col overflow-auto "
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none  ring-1 shadow-sm ring-black/5 sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm/6 text-gray-500 sm:hidden">
              <WeekdayButton day="M" date={10} />
              <WeekdayButton day="T" date={11} />
              <WeekdayButton day="W" date={12} isHighlighted />
              <WeekdayButton day="T" date={13} />
              <WeekdayButton day="F" date={14} />
              <WeekdayButton day="S" date={15} />
              <WeekdayButton day="S" date={16} />
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-700 border-r border-b border-gray-700 text-sm/6 text-gray-200 sm:grid">
              <div className="col-end-1 w-14" />
              <WeekdayCell day="Mon" date={10} />
              <WeekdayCell day="Tue" date={11} />
              <WeekdayCell day="Wed" date={12} isHighlighted />
              <WeekdayCell day="Thu" date={13} />
              <WeekdayCell day="Fri" date={14} />
              <WeekdayCell day="Sat" date={15} />
              <WeekdayCell day="Sun" date={16} />
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none  ring-1 ring-gray-700" />

            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-700"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                {generateHourLabels()}
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
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                {events.map((event, index) => {
                  const color = event.color || getRandomColor(); // Use predefined color or random color
                  const startRow = timeToGridRow(event.startTime);
                  const durationRows = event.duration / 5; // Convert duration to grid rows
                  const gridRow = `${startRow} / span ${durationRows}`;

                  return (
                    <li
                      key={index}
                      className={`relative mt-px flex sm:col-start-${event.colStart}`}
                      style={{ gridRow }}
                    >
                      <a
                        href="#"
                        className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-${color}-950 p-2 text-xs/5 hover:bg-${color}-100`}
                      >
                        <p
                          className={`order-1 font-semibold text-${color}-400`}
                        >
                          {event.title}
                        </p>
                        <p
                          className={`text-${color}-100 group-hover:text-${color}-300`}
                        >
                          <time dateTime={`2022-01-12T${event.startTime}`}>
                            {event.startTime}
                          </time>
                        </p>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
