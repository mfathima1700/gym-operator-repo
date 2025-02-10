"use client"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";
import { sendPasswordEmail } from "@/redux/actions/AuthActions";

export default function Register() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const forgetPasswordState = useSelector((state: RootState) => state.forgetPassword);


    const [emailData, setEmailData] = useState("");

    

    function handleClick(e: React.MouseEvent) {
      dispatch(sendPasswordEmail(emailData));
    }
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <div className="w-full max-w-sm">
            <ForgetPasswordForm action={handleClick} emailData={emailData} setEmailData={setEmailData}/>
          </div>
        </div>
      );
}