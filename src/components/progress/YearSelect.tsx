import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function YearSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Year view" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Day view</SelectItem>
          <SelectItem value="banana">Week view</SelectItem>
          <SelectItem value="blueberry">Month view</SelectItem>
          <SelectItem value="grapes">Year view</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
