"use client";

import CNLayout from "@/components/layout/cn-layout";
import { getUserAndInstructors, getUserById } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { sendCancelEmail } from "@/redux/actions/EmailActions";
import { SectionCards } from "@/components/dashboard/SectionCards";
import { MemberBarChart } from "@/components/dashboard/MemberBarChart";
import { BookingsChart } from "@/components/dashboard/BookingsChart";
import { MemberGraph } from "@/components/dashboard/MemberGraph";

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

export default function OwnerDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const userState = useSelector((state: RootState) => state.getUser);
  const [userData, setUserData] = useState(() => ({
    goals: [],
    ownedGym: {
      id: "",
      name:"",
      classes: [],
      members: [] as GymMember[],
      monthlyPrice:0
    },
  }));

  useEffect(() => {
    dispatch(getUserAndInstructors(id));
  }, [id]); // Only runs when `id` changes

  // Update state when user data is available
  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user, userState.success, userState.error]);

  function onSendEmailClick(e: React.MouseEvent) {
    e.preventDefault();
   // dispatch(sendCancelEmail());
  }

  return (
    <>
      <CNLayout user={userData} id={id} name={"Dashboard"}>
        <div>

          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards members={userData.ownedGym?.members ?? []} price={userData.ownedGym?.monthlyPrice ?? 0}/>
              <div className="*:data-[slot=card]:shadow-xs grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
              <MemberGraph members={userData.ownedGym?.members ?? []}/>
              <BookingsChart classes={userData.ownedGym?.classes ?? []}/>
              </div>
             
             
            </div>
          </div>

         
        </div>
      </CNLayout>
    </>
  );
}
