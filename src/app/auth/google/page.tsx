"use client";
import { createGoogleUser, verifyEmailAddress } from "@/redux/actions/AuthActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VerifySection from "@/components/auth/VerifySection";
import { GymRole, UserRole } from "@prisma/client";
import GoogleForm from "@/components/auth/GoogleForm";

export default function GoogleSignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

   
const [userData, setUserData] = useState(() => ({
    email: "",
    password: "",
    userRole: UserRole.USER,
    gymRole: GymRole.MEMBER,
    gymCode: "",
  }));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    const cookie = document.cookie.match(/a_session_[^=]+=([^;]+)/)?.[1];
    if (!cookie) throw new Error("No session found");

    dispatch(createGoogleUser(userData, cookie));
  }
 

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
       
      <GoogleForm signUp={handleSubmit} userData={userData} setUserData={setUserData} handleChange={handleChange} />
      </div>
    </div>
  );
}
