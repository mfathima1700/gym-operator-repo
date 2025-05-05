 "use client";
 
 import CNLayout from "@/components/layout/cn-layout";
import IndividualForm from "@/components/settings/IndividualForm"
import { getUserById, updateUserSettings } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 
 function classNames(...classes: (string | false | undefined)[]): string {
   return classes.filter(Boolean).join(" ");
 }
 
 export default function IndividualSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
  const updateUserSettingsState = useSelector((state: RootState) => state.updateUserSettings);
  const userState = useSelector((state: RootState) => state.getUser);
  const deleteAccountState = useSelector(
    (state: RootState) => state.deleteAccount
  );
  const [gymName, setGymName] = useState("")
  
  const [userData, setUserData] = useState(() => ({
    name: "",
      //dob: new Date(),
      email: "",
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
            name: userState.user.name || "",
            email: userState.user.email || "",
            phoneNumber: userState.user.phoneNumber || "",
            country: userState.user.country || "",
            image: userState.user.image || "",
            emailNotifications: userState.user.emailNotifications || "everything",
            pushNotifications: userState.user.pushNotifications || "everything",
          });

          if(userState.user?.gym){
            setGymName(userState.user.gym.name)
          }
         
          console.log("individual/id/settings")
          console.log(userState.user);
        }
      }, [userState.user]);

      useEffect(() => {
        if (deleteAccountState.success) {
          router.push(`/auth/login`);
        }
      }, [deleteAccountState.success, deleteAccountState.error]);
  
    function onSaveClick(e: React.MouseEvent) {
      e.preventDefault();
      console.log(userData);
      dispatch(updateUserSettings(userData, id));
    }
  
    function handleChange(field: string, value: string) {
      setUserData((prevState: any) => ({
        ...prevState,
        [field]:value,
      }));
    }
    
   return (
     <>
       <CNLayout  user={userData} id={id} name={"Settings"}>
         <div >
          <IndividualForm handleChange={handleChange} userData={userData} onSaveClick={onSaveClick} gymName={gymName}/>
           
         </div>
       </CNLayout>
     </>
   );
 }
 