"use client";

import CNLayout from "@/components/layout/cn-layout";
import OwnerForm from "@/components/settings/OwnerForm";
import { getUserById, updateOwnerSettings } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter, useParams  } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function OwnerSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
  const updateOwnerSettingsState = useSelector(
    (state: RootState) => state.updateOwnerSettings
  );
  const userState = useSelector((state: RootState) => state.getUser);

  const [ownerData, setOwnerData] = useState(() => ({
    name: "",
    //  dob: new Date(),
    email: "",
    phoneNumber: "",
    image: undefined,
    emailNotifications: "everything", // Represents whether the user wants to receive email offers
    pushNotifications: "everything",
   
  }));

  const [gymData, setGymData] = useState(() => ({
    country: "",
    city: "",
    postcode: "",
    streetAddress: "",
    state: "",
    description: "",
    gymName: "",
    logo: undefined,
    gymCode: "",
  }));

  useEffect(() => {
    console.log(updateOwnerSettingsState);
    if (updateOwnerSettingsState?.success) {
      router.push(`/owner/${id}`);
    }
  }, [updateOwnerSettingsState.error, updateOwnerSettingsState.success]);

  useEffect(() => {
      dispatch(getUserById(id));
  }, [id]); // Only runs when `id` changes

  // Update state when user data is available
  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setOwnerData((prevState) => ({
        ...prevState,
        name: userState.user.name || "",
        email: userState.user.email || "",
        phoneNumber: userState.user.phoneNumber || "",
        image: userState.user.image || undefined,
        emailNotifications: userState.user.emailNotifications || "everything",
        pushNotifications: userState.user.pushNotifications || "everything",
      }));

     
    }

    if (userState.user?.ownedGym) {
      setGymData((prevState) => ({
        ...prevState,
        country: userState.user.ownedGym.country || "",
        city: userState.user.ownedGym.city || "",
        postcode: userState.user.ownedGym.postcode || "",
        streetAddress: userState.user.ownedGym.streetAddress || "",
        state: userState.user.ownedGym.state || "",
        description: userState.user.ownedGym.description || "",
        gymName: userState.user.ownedGym.name || "",
        logo: userState.user.ownedGym.logo || undefined,
        gymCode: userState.user.ownedGym.gymCode || "",
      }));
    }
  }, [userState.user, userState.success, userState.error]);

  function onSaveClick(e: React.MouseEvent) {
    e.preventDefault();

    console.log(ownerData);
    console.log(gymData);
    dispatch(updateOwnerSettings(ownerData, gymData, id));
  }

  function handleChange(field:string, value: string) {
    setOwnerData((prevState: any) => ({
      ...prevState,
      [field]: value,
    }));
  }

  function handleGymChange(field:string,value: string) {
    setGymData((prevState: any) => ({
      ...prevState,
      [field]: value,
    }));
  }

  return (
    <>
      <CNLayout user={userState.user} id={id} name={"Settings"}>
        <div>
          <OwnerForm
            handleChange={handleChange}
            ownerData={ownerData}
            setGymData={setGymData}
            onSaveClick={onSaveClick}
            gymData={gymData}
            handleGymChange={handleGymChange}
          />
        </div>
      </CNLayout>
    </>
  );
}
