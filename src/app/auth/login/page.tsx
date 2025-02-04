"use client";

import LoginForm from "@/components/auth/LoginForm"; // Correct import path
import { useDispatch } from "react-redux";
import { getSession, signIn } from "@/redux/actions/AuthActions";
import { AppDispatch } from "@/redux/store"; // Import correct type
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { GymRole, UserRole } from "@prisma/client";
import { useState, useEffect } from "react";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const signInState = useSelector((state: RootState) => state.signIn);
  const sessionState = useSelector((state: RootState) => state.getSession);

  useEffect(() => {
    

    if (signInState?.success && signInState?.user != null) {
      console.log(signInState);
      // if (signInState?.user?.GymRole === GymRole.OWNER) {
      //   router.push("/owner");
      // } else if (signInState?.user?.GymRole === GymRole.MEMBER) {
        router.push("/individual");
      //}
    }
  }, [signInState]);

  useEffect(() => {
    console.log(sessionState);

    // already signed in 
    if (sessionState.success){ //sessionState.user
      //redirect("/account");
      router.push("/individual");
      // router.push("/owner");
    } 

  }, [sessionState]);

    useEffect(() => {
      dispatch(getSession());
    }, []);

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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm LoginAction={onLoginClick} setLoginData={setLoginData} loginData={loginData} handleChange={handleChange}/>
    </div>
  );
}
