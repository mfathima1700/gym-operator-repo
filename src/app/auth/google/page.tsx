"use client";
import {
  createGoogleUser,
  createGoogleUser2,
  verifyEmailAddress,
} from "@/redux/actions/AuthActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VerifySection from "@/components/auth/VerifySection";
import { GymRole, UserRole } from "@prisma/client";
import GoogleForm from "@/components/auth/GoogleForm";
import { Client, Account, OAuthProvider } from "appwrite";

export default function GoogleSignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const [userData, setUserData] = useState(() => ({
    email: "",
    password: "",
    userRole: UserRole.USER,
    gymRole: GymRole.MEMBER,
    gymCode: "",
    gymName:"",
  }));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    //'a_session_[YOUR_PROJECT_ID]
    const cookie = document.cookie.match(/a_session_[^=]+=([^;]+)/)?.[1];
    if (!cookie) throw new Error("No session found");

    dispatch(createGoogleUser(userData, cookie));
  }

  async function handleCallback(e: React.MouseEvent) {
    e.preventDefault();

    if (!userId || !secret) {
      console.log("No userId or secret found");
      return;
    }
    try {
      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

      const account = new Account(client);

      // Create the session
      await account.createSession(userId, secret);

      // Get the current user
      const user = await account.get();
      console.log(user);
      const newObject = {...userData, name: user.name,  email: user.email,}

      console.log(newObject)
      dispatch(createGoogleUser2(newObject));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <GoogleForm
          signUp={handleCallback}
          userData={userData}
          setUserData={setUserData}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}
