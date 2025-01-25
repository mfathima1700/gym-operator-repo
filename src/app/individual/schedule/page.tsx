'use client'

import CNLayout from "@/components/layout/cn-layout"
import { OwnerAccountCard } from "@/components/create/OwnerAccountCard"
import WeekCalendar from "@/components/schedule/WeekCalendar"

function classNames(...classes: (string | false | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

  export default function IndividualSchedule() {
 

    return (
      <>
      <CNLayout>
        <div  >
<WeekCalendar/>

        </div>
      </CNLayout>
      
      </>
    )}