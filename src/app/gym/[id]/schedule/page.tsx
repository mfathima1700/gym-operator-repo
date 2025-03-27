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

  const createClassState = useSelector((state: RootState) => state.createClass);
  const updateClassState = useSelector((state: RootState) => state.updateClass);
  const deleteClassState = useSelector((state: RootState) => state.deleteClass);
  const userState = useSelector((state: RootState) => state.getUser);
  const [userData, setUserData] = useState(() => ({
    gymRole: "",
    gym: {
      id: "",

      classes: [],
    },
  }));

  useEffect(() => {
    dispatch(getUserById(id));
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

  return (
    <>
      <CNLayout user={userData} id={id} name={"Gym Schedule"}>
        <div className="py-8 space-y-8">
          <ClassOptions />
          <GymWeekCalendar
            classes={userData.gym.classes ? userData.gym.classes : []}
            isOwner={userData?.gymRole === "OWNER" ? true : false}
            id={userData.gym.id}
          />
        </div>
      </CNLayout>
    </>
  );
}
