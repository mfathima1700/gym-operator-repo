 "use client";
 
 import CNLayout from "@/components/layout/cn-layout";
import IndividualForm from "@/components/settings/IndividualForm"
import { getUserById, updateUserSettings } from "@/redux/actions/GymActions";
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
  const userState = useSelector((state: RootState) => state.getUser);
  const [gymName, setGymName] = useState("")
  
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

      useEffect(() => {
        if (id) {
          dispatch(getUserById(id));
        }
      }, [dispatch, id]); // Only runs when `id` changes
    
      // Update state when user data is available
      useEffect(() => {
        if (userState.user) {
          setUserData({
            firstName: userState.user.firstName || "",
            lastName: userState.user.lastName || "",
            phoneNumber: userState.user.phoneNumber || "",
            country: userState.user.country || "",
            image: userState.user.image || "",
            emailNotifications: userState.user.emailNotifications || "everything",
            pushNotifications: userState.user.pushNotifications || "everything",
          });

          setGymName(userState.user.gym.name)

          console.log("individual/id/settings")
          console.log(userState.user);
        }
      }, [userState.user]);
  
    function onSaveClick(e: React.MouseEvent) {
      e.preventDefault();
      dispatch(updateUserSettings(userData, id));
    }
  
    function handleChange(field: string, value: string) {
      setUserData((prevState: any) => ({
        ...prevState,
        [field]:value,
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
          <IndividualForm handleChange={handleChange} userData={userData} onSaveClick={onSaveClick} gymName={gymName}/>
           
         </div>
       </CNLayout>
     </>
   );
 }
 