import { ClassDropdown } from "./ClassDropdown";
import { InstructorDropdown } from "./InstructorDropdown";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ClassType = {
  id: string;
  name: string;
  description?: string;
  gymId: string;
  capacity?: number;
  intensity?: "LOW" | "MODERATE" | "INTENSE" | "EXTREME"; // Adjust based on IntensityRating enum
  skillLevel?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; // Adjust based on SkillLevel enum
  instructorId?: string;
  recurrence?: "ONCE" | "WEEKLY" | "BIWEEKLY"; // Adjust based on Occurrence enum
  duration: number; // In minutes
  days: string[]; // ["Monday", "Wednesday", ...]
  room?: string;
  startDate: Date;
  endDate: Date;
  time: string; // e.g., "10:00"
  colour: string;
  bookings?:[]
};

interface GymMember {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  gymRole: string;
  isInstructor: boolean;
  phoneNumber: string;
  country: string;
  emailNotifications: string;
  image: string;
}

export default function ClassOptions({ filters, setFilters, classes, members } :
   { filters: any, setFilters: any, classes: ClassType[], members: GymMember[] }) {

    const classLocations = Array.from(
      new Set(classes.map((cls) => cls.room).filter(Boolean))
    ) as string[];



  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-2 sm:col-start-1">
        <Select  value={filters.classId}
  onValueChange={(value) => setFilters((prev: any) => ({ ...prev, classId: value }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Class" />
            </SelectTrigger>
            <SelectContent>
            {classes.map(c => <SelectItem value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-2">
        <Select value={filters.instructorId}
  onValueChange={(value) => setFilters((prev: any) => ({ ...prev, instructorId: value }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Instructor" />
            </SelectTrigger>
            <SelectContent>
            {members.map(m => <SelectItem value={m.id}>{m.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-2">
          <Select value={filters.duration}
  onValueChange={(value) => setFilters((prev: any) => ({ ...prev, duration: value }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by duration" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="20">20 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="75">1 hour 15 minutes</SelectItem>
              <SelectItem value="90">1 hour 30 minutes</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
              <SelectItem value="180">3 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-2">
        <Select value={filters.intensity}
  onValueChange={(value) => setFilters((prev: any) => ({ ...prev, intensity: value }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by intensity" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="LOW">Low</SelectItem>
  <SelectItem value="MODERATE">Moderate</SelectItem>
  <SelectItem value="INTENSE">Intense</SelectItem>
  <SelectItem value="EXTREME">Extreme</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-2">
        <Select value={filters.capacity}
  onValueChange={(value) => setFilters((prev: any) => ({ ...prev, capacity: parseInt(value)  }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Capacity less than..." />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="5">Less than 5</SelectItem>
      <SelectItem value="10">Less than 10</SelectItem>
      <SelectItem value="15">Less than 15</SelectItem>
      <SelectItem value="20">Less than 20</SelectItem>
      <SelectItem value="30">Less than 30</SelectItem>
      <SelectItem value="30">Less than 50</SelectItem>
      <SelectItem value="30">Less than 100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-2">
        <Select
        value={filters.location}
        onValueChange={(value) => setFilters((prev: any) => ({ ...prev, location: value }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
            {classLocations.map((loc: string) => (
        <SelectItem key={loc} value={loc}>
          {loc}
        </SelectItem>
      ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
