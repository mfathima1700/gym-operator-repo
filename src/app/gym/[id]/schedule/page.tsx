"use client";

import CNLayout from "@/components/layout/cn-layout";
import GymWeekCalendar from "@/components/gym/GymWeekCalendar";
import ClassOptions from "@/components/gym/ClassOptions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getUserById } from "@/redux/actions/GymActions";
import { createClass } from "@/redux/actions/ClassActions";
import { set } from "date-fns";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function GymSchedule() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const updateOwnerSettingsState = useSelector(
    (state: RootState) => state.updateOwnerSettings
  );
  const userState = useSelector((state: RootState) => state.getUser);
  const [userData, setUserData] = useState(() => ({
    gym: {
      id: "",
    },
  }));

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id]);

  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user, userState.success, userState.error]);

  type ClassData = {
    name: string;
    description: string;
    instructorId: string;
    startDate: Date;
    endDate: Date;
    capacity: string;
    intensity: string;
    recurrence: string;
    duration: string;
    days: string[]; // Explicitly specify the type here
    room: string;
    skillLevel: string;
    startTime: string;
  };

  const initalState = {
    name: "", // Class name
    description: "", // Description of the class
    instructorId: "", // Selected instructor
    startDate: new Date(), // Start date
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)), // End date
    capacity: "30", // Max capacity of class
    intensity: "LOW", // Intensity level: BEGINNER, INTERMEDIATE, ADVANCED
    recurrence: "WEEKLY", // Recurrence: one-off, weekly, biweekly
    duration: "60", // Duration in minutes
    days: [], // Days selected for the class (array of weekdays)    // Any required equipment
    room: "", // Room in which the class will take place
    skillLevel: "BEGINNER",
    startTime: "08:00"
  }

  const [classData, setClassData] = useState<ClassData>(() => initalState);

  const handleChange = (field: string, value: any) => {
    setClassData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function onSaveClick(e: React.MouseEvent) {
    //e.preventDefault();
    triggerRef.current?.click();
    console.log(classData);
    dispatch(createClass(classData, userData.gym.id));
    setClassData(initalState);
  }

  const toggleDay = (day: string) => {
    setClassData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day) // Remove if already selected
        : [...prev.days, day], // Add if not selected
    }));
  };

  return (
    <>
      <CNLayout user={userData} id={id}>
        <div className="py-8 space-y-8">
          <ClassOptions />
          <GymWeekCalendar
            classData={classData}
            handleChange={handleChange}
            onSaveClick={onSaveClick}
            toggleDay={toggleDay} 
            triggerRef={triggerRef}
          />
        </div>
      </CNLayout>
    </>
  );
}
