"use client";

import CNLayout from "@/components/layout/cn-layout";
import OldGoalsList from "@/components/goals/OldGoalsList";
import NewGoalsList from "@/components/goals/NewGoalsList";
import { useEffect, useRef, useState } from "react";
import { getUserById } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Goals() {
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
      classes: [],
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

  return (
    <>
      <CNLayout user={userData} id={id}>
        <div className="flex flex-col md:flex-row w-full gap-4">
          {/* Left Column */}
          <div className="w-full md:w-1/2  p-4">
            <h2 className="text-xl font-bold mb-4">Goals in Progress</h2>
            <NewGoalsList />
          </div>

          <div className="w-full md:w-1/2  p-4">
            <h2 className="text-xl font-bold mb-4">Completed Goals</h2>

            <OldGoalsList />
          </div>
        </div>
      </CNLayout>
    </>
  );
}
