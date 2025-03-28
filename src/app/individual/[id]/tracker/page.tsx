"use client";

import CNLayout from "@/components/layout/cn-layout";
import { useEffect, useRef, useState } from "react";
import { getUserById } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import NutritionForm from "@/components/tracker/NutritionForm";

export default function TrackerPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const userState = useSelector((state: RootState) => state.getUser);
  const nutritionState = useSelector((state: RootState) => state.nutrition);
  const exerciseState = useSelector((state: RootState) => state.exercise);

  const [userData, setUserData] = useState(() => ({
    goals: [],
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

  useEffect(() => {
    if (nutritionState.data) {
      console.log(nutritionState.data);
    }

    if (exerciseState.data) {
      console.log(exerciseState.data);
    }

    if (nutritionState.error) {
      console.log(nutritionState.error);
    }

    if (exerciseState.error) {
      console.log(exerciseState.error);
    }
  }, [
    nutritionState.data,
    nutritionState.error,
    exerciseState.data,
    exerciseState.error,
  ]);

  return (
    <>
      <CNLayout user={userData} id={id} name={"Fitness & Nutrition Tracker"}>
        <div>
          <NutritionForm
            exerciseData={exerciseState.data}
            nutritionData={nutritionState.data}
          />
        </div>
      </CNLayout>
    </>
  );
}
