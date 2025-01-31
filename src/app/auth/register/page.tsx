"use client";

import RegisterForm from "@/components/auth/RegisterForm"; // Correct import path
import { GymRole, UserRole } from "@prisma/client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import   registerUser  from "@/redux/actions/AuthActions";
import { User } from "lucide-react";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>()


  const [userData, setUserData] = useState(() => ({
    email: "",
    password: "",
    userRole: UserRole.USER,
    role: GymRole.MEMBER,
    gymCode: "",
  }));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("register page");
    console.log(userData);
    //dispatch(registerUser(userData));
  }



  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm userData={userData} handleSubmit={handleSubmit} setUserData={setUserData} handleChange={handleChange}/>
      </div>
    </div>
  );
}
