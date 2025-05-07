import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/utils";
import  EditClassDialog  from "../gym/EditClassDialog";

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
  bookings?: [];
};

type UserType = {
  id: string;
  name: string;
  instructorId?: string;
};

export default function ClassesList({
  user,
  members,
  classes,
  gymId,
}: {
  user: any;
  members: UserType[];
  classes: ClassType[];

  gymId: string;
}) {

const editTriggerRef = useRef<HTMLButtonElement>(null);

const todaysDate = new Date();

    function handleClick(
      e: React.MouseEvent,
      memberId: string,
      isInstructor: boolean
    ){

    }

    function formatTime(dateTime: string | Date): string {
        const date = dateTime instanceof Date ? dateTime : new Date(dateTime);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      }
    
      const generateColourLI = (name: string): string => {
        const hash = name
          .split("")
          .reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colors = [
          "bg-red-950 hover:bg-red-900",
          "bg-blue-950 hover:bg-blue-900",
          "bg-emerald-950 hover:bg-emerald-900",
          "bg-amber-950 hover:bg-amber-900",
          "bg-cyan-950 hover:bg-cyan-900",
          "bg-violet-950 hover:bg-violet-900",
          "bg-fuchsia-950 hover:bg-fuchsia-900",
          "bg-rose-950 hover:bg-rose-900",
        ];
        return colors[hash % colors.length]; // Cycle through the color list based on hash
      };
    
      const generateColourP1 = (name: string): string => {
        const hash = name
          .split("")
          .reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colors = [
          "text-red-400 ",
          "text-blue-400 ",
          "text-emerald-400",
          "text-amber-400",
          "text-cyan-400",
          "text-violet-400",
          "text-fuchsia-400",
          "text-rose-400",
        ];
        return colors[hash % colors.length]; // Cycle through the color list based on hash
      };
    
      //text-lime-100 group-hover:text-lime-300
      const generateColourP2 = (name: string): string => {
        const hash = name
          .split("")
          .reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colors = [
          "text-red-100 group-hover:text-red-300",
          "text-blue-100 group-hover:text-blue-300",
          "text-emerald-100 group-hover:text-emerald-300",
          "text-amber-100 group-hover:text-amber-300",
          "text-cyan-100 group-hover:text-cyan-300",
          "text-violet-100 group-hover:text-violet-300",
          "text-fuchsia-100 group-hover:text-fuchsia-300",
          "text-rose-100 group-hover:text-rose-300",
        ];
        return colors[hash % colors.length]; // Cycle through the color list based on hash
      };

  return (
    <div>
     <ul role="list"
     className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                    {classes
                      .sort(
                        (a, b) => a.startDate.getTime() - b.startDate.getTime()
                      )
                      .map((classObject: ClassType, index) => {
                        // Ensure that we only process classObjects with valid days
                       

                        return (
                          <li
                            key={classObject.id} // Ensure uniqueness across multiple days
                          >
                            <Dialog modal={false}>
                              <DialogTrigger asChild>
                                <button
                                 ref={editTriggerRef}
                                  className={cn(
                                    `flex flex-col gap-x-4 py-5 rounded-lg w-full`, // Use w-full to match width
                                    generateColourLI(classObject.name)
                                  )}
                                >
                                  <div
                                    className={`flex-row p-2 gap-x-4 text-xs/5 flex-grow`}
                                  >
                                    <p
                                      className={cn("text-left",
                                        generateColourP2(classObject.name)
                                      )}
                                    >
                                      <time className="text-left"
                                        dateTime={classObject.startDate.toISOString()}
                                      >
                                        {formatTime(classObject.startDate)}
                                      </time>
                                      <span
                                        className={cn(
                                          `pl-12  text-right`,
                                          generateColourP2(classObject.name)
                                        )}
                                      >
                                        {classObject.duration} m
                                      </span>
                                    </p>
                                  </div>

                                  <div className="p-2 pt-1 text-xs/5">
                                    <p
                                      className={cn(
                                        `order-1 font-semibold text-left`,
                                        generateColourP1(classObject.name)
                                      )}
                                    >
                                      {classObject.name}
                                    </p>
                                  </div>
                                </button>
                              </DialogTrigger>
                              <EditClassDialog
                                gymClass={classObject}
                                gymId={gymId}
                                today={todaysDate}
                                editTriggerRef={editTriggerRef}
                                isOwner={true}
                                user={user}
                                bookings={classObject.bookings}
                              />
                            </Dialog>
                          </li>
                        );
                      })}
                  </ul>
    </div>
  );
}
