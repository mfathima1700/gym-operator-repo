 "use client";
 
 import CNLayout from "@/components/layout/cn-layout";
import OwnerForm from "@/components/settings/OwnerForm"
import { updateOwnerSettings } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 
 function classNames(...classes: (string | false | undefined)[]): string {
   return classes.filter(Boolean).join(" ");
 }
 
 export default function OwnerSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const updateOwnerSettingsState = useSelector((state: RootState) => state.updateOwnerSettings);
  
  const [ownerData, setOwnerData] = useState(() => ({
      firstName: "",
      lastName: "",
    //  dob: new Date(),
      phoneNumber: "",
      image:"",
      emailNotifications: "everything", // Represents whether the user wants to receive email offers
      pushNotifications: "everything",
    }));

    const [gymData, setGymData] = useState(() => ({
      country:"",
      city:"",
      postcode:"",
      streetAddress:"",
      state:"",
    description:"",
    gymName:"",
    logo:"",
    }));

    useEffect(() => {
        console.log(updateOwnerSettingsState)
        if (updateOwnerSettingsState?.success) {
          router.push(`/owner/${id}`);
        }
      }, [updateOwnerSettingsState.error, updateOwnerSettingsState.success]);

       function onSaveClick(e: React.MouseEvent) {
            e.preventDefault();
            dispatch(updateOwnerSettings(ownerData,gymData, id));
          }
        
          function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            setOwnerData((prevState: any) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }));
          }

          function handleGymChange(e: React.ChangeEvent<HTMLInputElement>) {
            setGymData((prevState: any) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }));
          }
      
   return (
     <>
       <CNLayout>
         <div >
          <OwnerForm handleChange={handleChange} ownerData={ownerData} onSaveClick={onSaveClick} gymData={gymData}
          handleGymChange={handleGymChange}/>
           
         </div>
       </CNLayout>
     </>
   );
 }
 