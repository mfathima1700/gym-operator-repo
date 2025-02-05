"use client";

import CNLayout from "@/components/layout/cn-layout";
import GymWeekCalendar from "@/components/gym/GymWeekCalendar"
import ClassOptions from "@/components/gym/ClassOptions";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function GymSchedule() {
  return (
    <>
      <CNLayout>
        <div className="py-8 space-y-8">

<ClassOptions/>
        <GymWeekCalendar/>
        </div>
      </CNLayout>
    </>
  );
}
