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
import ClassesList from "@/components/classes/ClassesList";
import { PaginationDemo } from "@/components/layout/PaginationDemo";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

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
      members: [],
      classes: [],
    },
  }));

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id,  createClassState.success,
    createClassState.error,
    deleteClassState.success,
    deleteClassState.error,
    updateClassState.success,
    updateClassState.error,]);

  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user, userState.success, userState.error]);

  return (
    <>
      <CNLayout user={userData} id={id} name={"Gym Classes"}>
        <div className="py-8 space-y-8">
          <ClassOptions />

          {userData.ownedGym?.classes?.length > 0 ? (
            <ClassesList
            user={userData}
            classes={userData?.ownedGym?.classes ?? []}
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
