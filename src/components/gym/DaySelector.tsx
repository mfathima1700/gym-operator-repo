'use client'

import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid' 
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const days = [
  { name: 'Mon', value: 'monday' },
  { name: 'Tue', value: 'tuesday' },
  { name: 'Wed', value: 'wednesday' },
  { name: 'Thu', value: 'thursday' },
  { name: 'Fri', value: 'friday' },
  { name: 'Sat', value: 'saturday' },
  { name: 'Sun', value: 'sunday' },
]

export default function DaySelector({ selectedDays, toggleDay, isOwner } : { selectedDays: string[], toggleDay: any, isOwner: boolean }) {
  //const [selectedDays, setSelectedDays] = useState<string[]>([])

  // const toggleDay = (day: string) => {
  //   setSelectedDays((prev) =>
  //     prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
  //   )
  // }

  return (
    <fieldset>
      <legend className="block text-sm font-semibold text-gray-200">
        Select Class Days
      </legend>
      <div className="mt-4 flex gap-3">
        {days.map((day) => (
          <Button
            key={day.value}
            disabled={isOwner ? false: true}
            onClick={() => toggleDay(day.value)}
            variant={selectedDays.includes(day.value) ? "default" : 'outline'}
            className={cn(`relative flex h-10 w-10 items-center justify-center rounded-full ${
              selectedDays.includes(day.value) ? "" : ""
            } transition`)}
          >
            
            { (
              <span className="absolute text-sm font-medium">{day.name}</span>
            )}
          </Button>
        ))}
      </div>
    </fieldset>
  )
}
