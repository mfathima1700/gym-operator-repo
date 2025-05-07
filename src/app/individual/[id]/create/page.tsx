"use client";

import CNLayout from "@/components/layout/cn-layout";
import { IndividualAccountCard } from "@/components/create/IndividualAccountCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "@/redux/actions/GymActions";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function CreateIndividual() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
  const setUserDataState = useSelector((state: RootState) => state.setUserData);

  useEffect(() => {
    console.log(setUserDataState)
    if (setUserDataState?.success) {
      router.push(`/individual/${id}`);
    }
  }, [setUserDataState.error, setUserDataState.success]);

  const [createData, setCreateData] = useState(() => ({
    firstName: "",
    lastName: "",
   // dob: new Date(),
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

  const userState = useSelector((state: RootState) => state.getUser);
    const [userData, setUserData] = useState(() => ({
      gym: {
        id: "",
        classes:[],
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

  // function handleDateChange(date: Date) {
  //   setCreateData((prevState) => ({
  //     ...prevState,
  //     dob: date || null, // Handle undefined case
  //   }));
  // }

  return (
    <>
      <CNLayout user={userData} id={id} name={"Create Account"}>
        <div className="mx-auto py-8 ">
          <IndividualAccountCard
            handleChange={handleChange}
            createData={createData}
            onSaveClick={onSaveClick}
            //handleDateChange={handleDateChange}
          />
        </div>
      </CNLayout>
    </>
  );
}
