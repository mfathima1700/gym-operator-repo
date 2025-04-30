"use client";

import LoginForm from "@/components/auth/LoginForm"; // Correct import path
import { useDispatch } from "react-redux";
import {
  getGoogleData,
  getSession,
  signIn,
  signInWithGoogle,
} from "@/redux/actions/AuthActions";
import { AppDispatch } from "@/redux/store"; // Import correct type
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { GymRole, UserRole } from "@prisma/client";
import { useState, useEffect } from "react";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const signInState = useSelector((state: RootState) => state.signIn);
  const sessionState = useSelector((state: RootState) => state.getSession);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (signInState?.success && signInState?.user != null) {
      console.log(signInState.user);
      if (signInState?.user?.gymRole === "OWNER") {
       // router.push(`/owner/${signInState?.user?.id}`);

       if(signInState?.user?.ownedGymId){
        window.location.href = `/owner/${signInState?.user?.id}`;
       }else{
        window.location.href = `/owner/${signInState?.user?.id}/create`;
       }
      
      } else if (signInState?.user?.gymRole === "MEMBER") {
        //router.push(`/individual/${signInState?.user?.id}`);

        if(signInState?.user?.name !== "" && signInState?.user?.name !== undefined && signInState?.user?.name !== null){
          window.location.href = `/individual/${signInState?.user?.id}`;
        }else{
          window.location.href = `/individual/${signInState?.user?.id}/create`;
        }
       
      }
    }else if (signInState?.error) {
     // TODO: Error Handling
    }
  }, [signInState.user, signInState.error, signInState.success]);

  useEffect(() => {
    if (status === "success") {
      dispatch(getGoogleData());
    } else if (status === "fail") {
      console.log("FAILED");
    }
  }, [status]);

  /*
  useEffect(() => {
    console.log(sessionState);

    // already signed in 
    if (sessionState.success){ //sessionState.user
      router.push("/individual");
      // router.push("/owner");
    } 

  }, [sessionState.error, sessionState.success]);

    useEffect(() => {
      dispatch(getSession());
    }, []);*/

  const [loginData, setLoginData] = useState(() => ({
    email: "",
    password: "",
  }));

  function onLoginClick(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(signIn(loginData));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleGoogle(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(signInWithGoogle());
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm
        LoginAction={onLoginClick}
        loginData={loginData}
        handleChange={handleChange}
        handleGoogle={handleGoogle}
      />
    </div>
  );
}
