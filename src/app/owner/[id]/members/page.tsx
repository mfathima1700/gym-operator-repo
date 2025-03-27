"use client";

import MemberCards from "@/components/members/MemberCards";
import CNLayout from "@/components/layout/cn-layout";
import { PaginationDemo } from "@/components/layout/PaginationDemo";
import MemberOptions from "@/components/members/MemberOptions";
import CNMemberOptions from "@/components/members/CNMemberOptions";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getUserById } from "@/redux/actions/GymActions";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Members() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const userState = useSelector((state: RootState) => state.getUser);
  const alterMemberState = useSelector((state: RootState) => state.alterMember);
  const [userData, setUserData] = useState(() => ({
    goals: [],
    gym: {
      id: "",
      classes: [],
      members: [],
    },
  }));

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id, alterMemberState.success, alterMemberState.error]);

  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user, userState.success, userState.error]);

  return (
    <>
      <CNLayout user={userData} id={id} name={"Members"}>
        <div className="py-8 space-y-8">
          {/* <MemberOptions /> */}
          <CNMemberOptions />

          {userData.gym?.members.length > 0 ? (
            <MemberCards gymMembers={userData.gym?.members} gymId={userData.gym?.id} />
          ) : (
            <>
              <div className="flex flex-col items-center justify-center h-full">
                <p>No members found</p>
              </div>
            </>
          )}
          {userData.gym?.members.length > 10 ? <PaginationDemo /> : <></>}
        </div>
      </CNLayout>
    </>
  );
}
