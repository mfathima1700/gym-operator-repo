"use client";

import RegisterForm from "@/components/auth/RegisterForm"; // Correct import path
import { GymRole, UserRole } from "@prisma/client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import registerUser, { getSession } from "@/redux/actions/AuthActions";
import { User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { getLoggedInUser } from "@/lib/server/appwrite";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const signUpState = useSelector((state: RootState) => state.signUp);
  const sessionState = useSelector((state: RootState) => state.getSession);

  useEffect(() => {
    // sign up success
    if (signUpState?.user != null) {
      console.log(signUpState);

    }
  }, [signUpState.user, signUpState.error]);

  // useEffect(() => {
  //   console.log(sessionState);

  //   // already signed in
  //   if (sessionState.success){ //sessionState.user
  //     //redirect("/account");
  //     router.push("/individual");
  //     // router.push("/owner");
  //   }

  // }, [sessionState.user, sessionState.error, sessionState.success]);

  //   useEffect(() => {
  //     dispatch(getSession());
  //   }, []);

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

    dispatch(registerUser(userData));
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm
          userData={userData}
          handleSubmit={handleSubmit}
          setUserData={setUserData}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}
