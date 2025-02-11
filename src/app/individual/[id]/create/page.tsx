"use client";

import CNLayout from "@/components/layout/cn-layout";
import { IndividualAccountCard } from "@/components/create/IndividualAccountCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { updateUser } from "@/redux/actions/GymActions";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function CreateAccountOwner() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const setUserDataState = useSelector((state: RootState) => state.setUserData);

  useEffect(() => {
    if (setUserDataState?.success) {
      router.push(`/owner/${id}`);
    }
  }, [setUserDataState.error, setUserDataState.success]);

  const [createData, setCreateData] = useState(() => ({
    firstName: "",
    lastName: "",
    dob: new Date(),
  }));

  function onSaveClick(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(updateUser(createData, id));
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
          <IndividualAccountCard
            handleChange={handleChange}
            createData={createData}
            onSaveClick={onSaveClick}
          />
        </div>
      </CNLayout>
    </>
  );
}
