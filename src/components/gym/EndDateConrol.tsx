"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function EndDateControl({ date, onChange, isOwner }: { date: Date; onChange: (date: Date) => void; isOwner: boolean }) {
  //const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
        disabled={isOwner ? false: true}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
         disabled={isOwner ? false: true}
          mode="single"
          selected={date}
          onSelect={(selectedDate) => selectedDate && onChange(selectedDate)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
