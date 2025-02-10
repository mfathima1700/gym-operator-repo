"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { resetPassword } from "@/redux/actions/AuthActions";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const resetPasswordState = useSelector(
    (state: RootState) => state.resetPassword
  );
  const searchParams = useSearchParams();
  const secret = searchParams.get("secret") || "";
  const userId = searchParams.get("userId") || "";

  const [passwordData, setPasswordData] = useState(() => ({
    password: "",
    passwordTwo: "",
  }));

  useEffect(() => {
        if (resetPasswordState?.success) {
          console.log("reset password success!");
          router.push("/auth/login");
        }
      }, [resetPasswordState.error, resetPasswordState.success]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(resetPassword(passwordData.password, secret, userId));
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPasswordForm
          action={handleClick}
          passwordData={passwordData}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}
