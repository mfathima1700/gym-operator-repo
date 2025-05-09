"use client";

import CNLayout from "@/components/layout/cn-layout";
import GymWeekCalendar from "@/components/gym/GymWeekCalendar";
import ClassOptions from "@/components/gym/ClassOptions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getUserAndInstructors, getUserById } from "@/redux/actions/GymActions";
import { createClass } from "@/redux/actions/ClassActions";
import { set } from "date-fns";
import ClassesList from "@/components/classes/ClassesList";
import { PaginationDemo } from "@/components/layout/PaginationDemo";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

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

export default function GymClasses() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const createClassState = useSelector((state: RootState) => state.createClass);
  const updateClassState = useSelector((state: RootState) => state.updateClass);
  const deleteClassState = useSelector((state: RootState) => state.deleteClass);
  const userState = useSelector((state: RootState) => state.getUser);
  const [userData, setUserData] = useState(() => ({
    gymRole: "",
    ownedGym: {
      id: "",
      members: [] as GymMember[],
      classes: [],
    },
  }));

  useEffect(() => {
    dispatch(getUserAndInstructors(id));
  }, [
    id,
    createClassState.success,
    createClassState.error,
    deleteClassState.success,
    deleteClassState.error,
    updateClassState.success,
    updateClassState.error,
  ]);

  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user, userState.success, userState.error]);

  const [filters, setFilters] = useState({
    classId: "",
    instructorId: "",
    duration: "",
    intensity: "",
    capacity: "",
    location: "",
  });

  const filteredClasses = userData.ownedGym?.classes?.filter(
    (cls: ClassType) => {
      const matchesClass = filters.classId ? cls.id === filters.classId : true;
      const matchesInstructor = filters.instructorId
        ? cls.instructorId === filters.instructorId
        : true;
      const matchesDuration = filters.duration
        ? cls.duration === Number(filters.duration)
        : true;
      const matchesIntensity = filters.intensity
        ? cls.intensity === filters.intensity
        : true;
        const matchesCapacity = filters.capacity
        ? (cls.capacity ?? 0) < Number(filters.capacity)
        : true;
      const matchesLocation = filters.location
        ? cls.room === filters.location
        : true;

      return (
        matchesClass &&
        matchesInstructor &&
        matchesDuration &&
        matchesIntensity &&
        matchesCapacity &&
        matchesLocation
      );
    }
  );

  return (
    <>
      <CNLayout user={userData} id={id} name={"Gym Classes"}>
        <div className="py-8 space-y-8">
          <ClassOptions
            filters={filters}
            setFilters={setFilters}
            classes={userData.ownedGym?.classes ?? []}
            members={userData.ownedGym?.members ?? []}
          />

          {userData.ownedGym?.classes?.length > 0 ? (
            <ClassesList
              user={userData}
              classes={filteredClasses ?? []}
              members={userData.ownedGym?.members ?? []}
              gymId={userData.ownedGym?.id}
            />
          ) : (
            <>
              <div className="flex flex-col items-center justify-center h-full">
                <p>No classes found</p>
              </div>
            </>
          )}
          {userData.ownedGym?.classes?.length > 10 ? <PaginationDemo /> : <></>}
        </div>
      </CNLayout>
    </>
  );
}
