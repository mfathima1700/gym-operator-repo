"use client"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { resetPassword } from "@/redux/actions/AuthActions";

export default function Register() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const resetPasswordState = useSelector((state: RootState) => state.resetPassword);

    const [passwordData, setPasswordData] = useState(() => ({
        password: "",
        passwordTwo: "",
      }));
    
      function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPasswordData((prevState: any) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      }

      function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        dispatch(resetPassword(passwordData.password));
      }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <div className="w-full max-w-sm">
            <ResetPasswordForm action={handleClick} passwordData={passwordData} handleChange={handleChange}/>
          </div>
        </div>
      );
}