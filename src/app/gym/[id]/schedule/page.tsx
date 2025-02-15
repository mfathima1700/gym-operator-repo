"use client";

import CNLayout from "@/components/layout/cn-layout";
import GymWeekCalendar from "@/components/gym/GymWeekCalendar"
import ClassOptions from "@/components/gym/ClassOptions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserById } from "@/redux/actions/GymActions";
import { createClass } from "@/redux/actions/ClassActions";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function GymSchedule() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
  const updateOwnerSettingsState = useSelector(
    (state: RootState) => state.updateOwnerSettings
  );
  const userState = useSelector((state: RootState) => state.getUser);
const [userData, setUserData] = useState(() => ({}));

  useEffect(() => {
      dispatch(getUserById(id));
  }, [id]);

  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user, userState.success, userState.error]);

  const [classData, setClassData] = useState(() => ({
    name: "",               // Class name
    description: "",        // Description of the class
    instructorId: "",         // Selected instructor
    startDate: new Date(),        // Start date
    endDate: new Date(),          // End date
    capacity: 0,           // Max capacity of class
    intensity: "",          // Intensity level: BEGINNER, INTERMEDIATE, ADVANCED
    recurrence: "",         // Recurrence: one-off, weekly, biweekly
    duration: 0,           // Duration in minutes
    days: [],               // Days selected for the class (array of weekdays)    // Any required equipment
    room: "",               // Room in which the class will take place
  }));
  
  const handleChange = (field:string, value:any) => {
    setClassData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function onSaveClick(e: React.MouseEvent) {
      e.preventDefault();
      dispatch(createClass(classData, id));
    }
  
  return (
    <>
      <CNLayout user={userData} id={id}>
        <div className="py-8 space-y-8">

<ClassOptions/>
        <GymWeekCalendar/>
        </div>
      </CNLayout>
    </>
  );
}
