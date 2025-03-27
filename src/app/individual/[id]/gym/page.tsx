"use client";

import CNLayout from "@/components/layout/cn-layout";
import MemberWeekCalendar from "@/components/gym/MemberWeekCalendar";
import ClassOptions from "@/components/gym/ClassOptions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getUserById } from "@/redux/actions/GymActions";
import { bookClass } from "@/redux/actions/ClassActions";
import { set } from "date-fns";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function GymMemberSchedule() {
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
      classes:[],
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


  function onBookClick(classId: string) {
    //e.preventDefault();
    triggerRef.current?.click();
    dispatch(bookClass(classId, id));
  }

  return (
    <>
      <CNLayout user={userData} id={id} name={"My Classes"}>
        <div className="py-8 space-y-8">
          <MemberWeekCalendar
           
           
            handleClick={onBookClick}
          
            triggerRef={triggerRef}
            classes={userData.gym.classes ?userData.gym.classes : []}
          />
        </div>
      </CNLayout>
    </>
  );
}
