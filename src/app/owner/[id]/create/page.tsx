"use client";

import CNLayout from "@/components/layout/cn-layout";
import { OwnerAccountCard } from "@/components/create/OwnerAccountCard";
import { AppDispatch } from "@/redux/store"; // Import correct type
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { createGym } from "@/redux/actions/GymActions";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function CreateAccountOwner() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const createGymState = useSelector((state: RootState) => state.createGym);

  useEffect(() => {
    if (createGymState?.success) {
      router.push(`/owner/${id}`);
    }
  }, [createGymState.error, createGymState.success]);

  const [createData, setCreateData] = useState(() => ({
    gymName: "",
    firstName: "",
    lastName: "",
    description: "",
    // city: "",
    // state: "",
    // zip: "",
    // phone: "",
  }));

  function onSaveClick(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(createGym(createData, id));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCreateData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      <CNLayout>
        <div className="mx-auto py-8 ">
          <OwnerAccountCard
            handleChange={handleChange}
            createData={createData}
            onSaveClick={onSaveClick}
          />
        </div>
      </CNLayout>
    </>
  );
}
