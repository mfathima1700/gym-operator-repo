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
  const addEventState = useSelector((state: RootState) => state.addEvent);
  const updateEventState = useSelector((state: RootState) => state.updateEvent);
  const deleteEventState = useSelector((state: RootState) => state.deleteEvent);
  const syncEventState = useSelector((state: RootState) => state.syncEvent);
  const userState = useSelector((state: RootState) => state.getUser);
  const [userData, setUserData] = useState(() => ({
    gymRole: "",
    email: "",
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

  useEffect(() => {
    // if (addEventState.success) {
    //   console.log(addEventState.success);
    // }
    // if (addEventState.error) {
    //   console.log(addEventState.error);
    // }
    // if (deleteEventState.success) {
    //   console.log(deleteEventState.success);
    // }
    // if (deleteEventState.error) {
    //   console.log(deleteEventState.error);
    // }
    // if (updateEventState.success) {
    //   console.log(updateEventState.success);
    // }
    // if (updateEventState.error) {
    //   console.log(updateEventState.error);
    // }
    // if (syncEventState.success) {
    //   console.log(syncEventState.success);  
    // }
    // if (syncEventState.error) {
    //   console.log(syncEventState.error);  
    // } 
    
   
    
    
    
   
    
    
  }, [
    addEventState.success,
    addEventState.error,
    deleteEventState.success,
    deleteEventState.error,
    updateEventState.success,
    updateEventState.error,
    syncEventState.success, 
    syncEventState.error
  ]);

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
