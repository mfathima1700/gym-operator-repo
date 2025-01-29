"use client"

import LoginForm from "@/components/auth/LoginForm";  // Correct import path
import { useDispatch } from "react-redux";
import { signInTo } from "@/redux/slices/AuthSlices";
import { AppDispatch } from "@/redux/store"; // Import correct type

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()

  function onLoginClick(e: React.MouseEvent){
    dispatch(signInTo("google" ));
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm LoginAction={onLoginClick}/>
    </div>
  );
}