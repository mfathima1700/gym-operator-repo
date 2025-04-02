"use client";

import CNLayout from "@/components/layout/cn-layout";
import { getUserById } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ClassesCards } from "@/components/dashboard/ClassesCards";
import { GoalsCard } from "@/components/dashboard/GoalsCard";
import { ClassesBarChart } from "@/components/dashboard/ClassesBarChart";
import { GoalsBarChart } from "@/components/dashboard/GoalsBarChart";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function IndividualDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const userState = useSelector((state: RootState) => state.getUser);
  const [userData, setUserData] = useState(() => ({
    gymRole: "",
    goals: [],
    gym: {
      id: "",
      name: "",
    },
    bookings: [],
  }));

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id]); // Only runs when `id` changes

  // Update state when user data is available
  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user, userState.success, userState.error]);

  return (
    <>
      <CNLayout user={userData} id={id} name={"Dashboard"}>
        <div>
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="*:data-[slot=card]:shadow-xs grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
              <ClassesCards bookings={userData.bookings} />
              <GoalsCard goals={userData.goals} />
              <ClassesBarChart
                bookings={
                  userData.bookings ?? []
                }
              />
              <GoalsBarChart
                goals={
                  userData.goals ?? []
                }
              />
            </div>
          </div>
        </div>
      </CNLayout>
    </>
  );
}
