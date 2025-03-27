"use client";

import CNLayout from "@/components/layout/cn-layout";
import OldGoalsList from "@/components/goals/OldGoalsList";
import NewGoalsList from "@/components/goals/NewGoalsList";
import { useEffect, useRef, useState } from "react";
import { getUserById } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { MailOpen, PlusCircle, PlusIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddGoalDialog from "@/components/goals/AddGoalDialog";

interface Goal {
  id: string;
  title: string;
  notes?: string;
  targetDate: Date;
  completed: boolean;
  // Add any other properties your goals might have
}

export default function Goals() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const userState = useSelector((state: RootState) => state.getUser);
  const createGoalState = useSelector((state: RootState) => state.createGoal);
  const editGoalState = useSelector((state: RootState) => state.editGoal);
  const deleteGoalState = useSelector((state: RootState) => state.deleteGoal);
  const [userData, setUserData] = useState(() => ({
    goals: [],
    gym: {
      id: "",
      classes: [],
    },
  }));

  useEffect(() => {
    dispatch(getUserById(id));
  }, [
    id,
    createGoalState.success,
    createGoalState.error,
    deleteGoalState.success,
    deleteGoalState.error,
    editGoalState.success,
    editGoalState.error,
  ]);

  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user, userState.success, userState.error]);

  return (
    <>
      <CNLayout user={userData} id={id} name={"Goals"}>
        <div className="flex flex-col md:flex-row w-full gap-4">
          {/* Left Column */}
          <div className="w-full md:w-1/2  p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">
              In Progress Goals
            </h2>

            {userData.goals.filter((goal: Goal) => goal?.completed === false).length > 0 ? (
              <NewGoalsList goals={userData.goals ? userData.goals.filter((goal: Goal) => goal?.completed === false) : []} />
            ) : (
              <div>No Incomplete Goals</div>
            )}
          </div>

          <div className="w-full md:w-1/2 p-4">
            {/* Title and Button Row */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                Completed Goals
              </h2>
              <Dialog modal={false}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusIcon />
                    Add Goal
                  </Button>
                </DialogTrigger>

                <AddGoalDialog triggerRef={triggerRef} id={id} />
              </Dialog>
            </div>

            {userData.goals.filter((goal: Goal) => goal?.completed === true).length > 0 ? (
              <OldGoalsList
                goals={
                  userData.goals
                    ? userData.goals.filter((goal: Goal) => goal?.completed === true)
                    : []
                }
              />
            ) : (
              <div>No Completed Goals</div>
            )}
          </div>
        </div>
      </CNLayout>
    </>
  );
}
