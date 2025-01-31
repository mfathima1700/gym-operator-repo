"use client";

import RegisterForm from "@/components/auth/RegisterForm"; // Correct import path
import { GymRole } from "@prisma/client";
import { useState } from "react";

export default function Register() {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    userRole: "USER",
    role: GymRole.MEMBER,
    gymCode: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(userData);
  }



  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm userData={userData} handleSubmit={handleSubmit} setUserData={setUserData} handleChange={handleChange}/>
      </div>
    </div>
  );
}
