"use client";

import MemberWeekCalendar from "@/components/gym/MemberWeekCalendar";
import CNLayout from "@/components/layout/cn-layout";
import MyCalendar from "@/components/schedule/MyCalendar";
import { getUserById } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function IndividualSchedule() {
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

    },
    ownedGym: {
      id: "",
     
    },
    bookings:[]
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
      <CNLayout user={userData} id={id} name={"My Calendar"}>
        <div>
          <MemberWeekCalendar 
          bookings={userData.bookings ?? []} user={userData} gymId={userData?.gym?.id ?? userData?.ownedGym?.id ?? ""} />
        </div>
      </CNLayout>
    </>
  );
}
