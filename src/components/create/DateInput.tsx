import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function DateInput({ value, handleChange, handleDateChange }: { value: Date | undefined, handleChange: any, handleDateChange: any }) {
  const [date, setDate] = React.useState<Date | undefined>(value)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[280px] justify-start text-left font-normal", 
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : "Select date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate)
            handleDateChange(selectedDate) // Update parent state
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
