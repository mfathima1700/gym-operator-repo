"use client";

import CNLayout from "@/components/layout/cn-layout";
import { OwnerAccountCard } from "@/components/create/OwnerAccountCard";
import { AppDispatch } from "@/redux/store"; // Import correct type
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { createGym, getUserById } from "@/redux/actions/GymActions";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function CreateAccountOwner() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
  const createGymState = useSelector((state: RootState) => state.createGym);
  const userState = useSelector((state: RootState) => state.getUser);
  useEffect(() => {
    if (createGymState?.success) {
      router.push(`/owner/${id}`);
    }
  }, [createGymState.error, createGymState.success]);
  const [userData, setUserData] = useState(() => ({}));


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
      <CNLayout name={"Create Account"} user={userData} id={id} >
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
