 "use client";
 
 import CNLayout from "@/components/layout/cn-layout";
import IndividualForm from "@/components/settings/IndividualForm"
import { updateUserSettings } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 
 function classNames(...classes: (string | false | undefined)[]): string {
   return classes.filter(Boolean).join(" ");
 }
 
 export default function IndividualSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const updateUserSettingsState = useSelector((state: RootState) => state.updateUserSettings);
  
  const [userData, setUserData] = useState(() => ({
      firstName: "",
      lastName: "",
      //dob: new Date(),
      phoneNumber: "",
      country:"",
      image:"",
      emailNotifications: "everything", // Represents whether the user wants to receive email offers
      pushNotifications: "everything",
    }));

    useEffect(() => {
        console.log(updateUserSettingsState)
        if (updateUserSettingsState?.success) {
          router.push(`/individual/${id}`);
        }
      }, [updateUserSettingsState.error, updateUserSettingsState.success]);
  
    function onSaveClick(e: React.MouseEvent) {
      e.preventDefault();
      dispatch(updateUserSettings(userData, id));
    }
  
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setUserData((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }

    function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
      setUserData((prev) => ({
        ...prev,
        pushNotifications: e.target.value, // Updates pushNotifications with selected value
      }));
    }
    
   return (
     <>
       <CNLayout>
         <div >
          <IndividualForm handleChange={handleChange} userData={userData} onSaveClick={onSaveClick} gymName={""}/>
           
         </div>
       </CNLayout>
     </>
   );
 }
 