"use client";

import CNLayout from "@/components/layout/cn-layout";
import { getUserById } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
    gym: {
      id: "",
    },
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

  const [date, setDate] = React.useState<Date>()
  return (
    <>
      <CNLayout user={userData} id={id}>
        <div>

        


        </div>
      </CNLayout>
    </>
  );
}
