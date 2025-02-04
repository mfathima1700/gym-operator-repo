"use client"

import LoginForm from "@/components/auth/LoginForm";  // Correct import path
import { useDispatch } from "react-redux";
//import {  testAction } from "@/redux/actions/AuthActions";
import   signInWithDetails  from "@/redux/actions/AuthActions";
import { AppDispatch } from "@/redux/store"; // Import correct type
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { GymRole, UserRole } from "@prisma/client";
import { useState, useEffect } from "react";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter();
  const signInState = useSelector((state: RootState) => state.signIn);


  useEffect(() => {
    console.log(signInState);
  
    if(signInState?.user != null){
      if(signInState?.user?.GymRole === GymRole.OWNER){
        router.push("/owner");
      }else if (signInState?.user?.GymRole === GymRole.MEMBER){
        router.push("/individual");
      }
    }
      
  
    }, [signInState]);

    const [loginData, setLoginData] = useState(() => ({
      email: "",
      password: "",
    }));


  function onLoginClick(e: React.MouseEvent){ 
    //dispatch(signInWithDetails( loginData));
   // dispatch(testAction())
  }

  

  return (
   
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm LoginAction={onLoginClick} />
    </div>
    
  );
}