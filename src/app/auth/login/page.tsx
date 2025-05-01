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
import { Client, Account, OAuthProvider } from "appwrite";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const signInState = useSelector((state: RootState) => state.signIn);
  const sessionState = useSelector((state: RootState) => state.getSession);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  useEffect(() => {
    if (signInState?.success && signInState?.user != null) {
      console.log(signInState.user);
      if (signInState?.user?.gymRole === "OWNER") {
       // router.push(`/owner/${signInState?.user?.id}`);

       if(signInState?.user?.ownedGym){
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
      if (!userId || !secret) {
        console.error("Missing OAuth credentials");
         //TODO: Error Handling
        return;
      }

      handleOAuthCallback();
      
      
    } else if (status === "fail") {
      console.log("FAILED");
      //TODO: Error Handling
    }
  }, [status]);

  const handleOAuthCallback = async () => {
    if (status === "success") {
      const params = new URLSearchParams(window.location.search);
      const userId = params.get("userId");
      const secret = params.get("secret");

      if (!userId || !secret) {
        console.error("Missing OAuth credentials");
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
        console.log(user)
        dispatch(signInWithGoogle(user.email));

        
      } catch (error) {
         //TODO: Error Handling
      }
    } 
  };

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

    try {
      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);
      //.setKey(process.env.NEXT_PUBLIC_APPWRITE_KEY as string);
      const account = new Account(client);

      console.log("GOOGLE AUTH REGISTER TRUE");
      const baseUrl = window.location.origin;

      const result = await (account as any).createOAuth2Token(
        "google",
        `${baseUrl}/auth/login?status=success`, // New callback URL
        `${baseUrl}/auth/login?status=fail`
      ); // Failure URL
      console.log("RESULT");
      console.log(result);
    } catch (error) {
      console.log(error);
    }

   // dispatch(signInWithGoogle());
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
