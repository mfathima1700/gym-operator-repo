"use client";

import RegisterForm from "@/components/auth/RegisterForm"; // Correct import path
import { GymRole, UserRole } from "@prisma/client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import registerUser, {
  createGoogleUser,
  getSession,
  signInWithGoogle,
  signUpWithGoogle,
} from "@/redux/actions/AuthActions";
import { User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { Dialog } from "@/components/ui/dialog";
import RegisterDialog from "@/components/auth/RegisterDialog";
import { Client, Account, OAuthProvider } from "appwrite";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const signUpState = useSelector((state: RootState) => state.signUp);
  const sessionState = useSelector((state: RootState) => state.getSession);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // sign up success
    if (signUpState?.user != null) {
      console.log(signUpState);
    }
  }, [signUpState.user, signUpState.error]);

  useEffect(() => {
    if (status === "success") {
      setOpen(true);
      // show dialog
    } else if (status === "fail") {
      console.log("FAILED");
    }
  }, [status]);

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

    dispatch(registerUser(userData));
  }

  async function handleGoogle(e: React.MouseEvent) {
    e.preventDefault();
    // dispatch(signUpWithGoogle());

    try {
      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);
      //.setKey(process.env.NEXT_PUBLIC_APPWRITE_KEY as string);
      const account = new Account(client);

      console.log("GOOGLE AUTH REGISTER TRUE");
      const baseUrl = window.location.origin;

      const successUrl = process.env.NEXT_PUBLIC_APPWRITE_REGISTER_SUCCESS_URL;
      const failureUrl = process.env.NEXT_PUBLIC_APPWRITE_REGISTER_FAILURE_URL;
      // }
      //(account as any)
      const result = await (account as any).createOAuth2Token(
        "google",
        `${baseUrl}/auth/google`, // New callback URL
        `${baseUrl}/auth/register?status=fail`
      ); // Failure URL
      console.log("RESULT");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateGoogleUser(e: React.MouseEvent) {
    e.preventDefault();
    setOpen(false);

    //   const client = new Client()
    //   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    //   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
    //  // .setKey(process.env.NEXT_PUBLIC_APPWRITE_KEY as string);
    // const account = new Account(client);
    //  const session = await account.getSession("current");
    //  console.log(session)
    //  const accessToken = session.providerAccessToken;
    //  // Now make a fetch request to Google UserInfo API:
    //  const googleUser = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    //      headers: { Authorization: `Bearer ${accessToken}` },
    //  }).then(res => res.json());

    //  console.log("GOOGLE USER FETCHED")

    const cookie = document.cookie.match(/a_session_[^=]+=([^;]+)/)?.[1];
    if (!cookie) throw new Error("No session found");

    dispatch(createGoogleUser(userData, cookie));
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm
          userData={userData}
          handleSubmit={handleSubmit}
          setUserData={setUserData}
          handleChange={handleChange}
          handleGoogle={handleGoogle}
        />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <RegisterDialog
          signUp={handleCreateGoogleUser}
          handleChange={handleChange}
          userData={userData}
          setUserData={setUserData}
        />
      </Dialog>
    </div>
  );
}
