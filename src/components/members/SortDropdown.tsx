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

export default function SortDropdown() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
         
          <SelectItem value="apple">A to Z</SelectItem>
          <SelectItem value="banana">Z to A</SelectItem>
          <SelectItem value="blueberry">Newest First</SelectItem>
          <SelectItem value="grapes">Oldest First</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
