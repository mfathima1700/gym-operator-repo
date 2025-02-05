'use client'

import CNLayout from "@/components/layout/cn-layout"
import GymWeekCalendar from "@/components/gym/GymWeekCalendar"

function classNames(...classes: (string | false | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

  export default function IndividualSchedule() {
 

    function handleAddClass(){

    }


    return (
      <>
      <CNLayout>
        <div  >
<GymWeekCalendar/>

        </div>
      </CNLayout>
      
      </>
    )}