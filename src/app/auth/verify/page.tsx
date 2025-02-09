"use client";
import { verifyEmailAddress } from "@/redux/actions/AuthActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VerifySection from "@/components/auth/VerifySection";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const verifyState = useSelector((state: RootState) => state.verify);
//   dispatch(verifyEmailAddress());

//   useEffect(() => {
//     if (verifyState?.success) {
//       console.log("verify succeeded");
//     }
//   }, [verifyState.error, verifyState.success]);

function handleLoginClick(e: React.MouseEvent) {
  e.preventDefault();
  dispatch(verifyEmailAddress());
}

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
            <VerifySection action={handleLoginClick}/>
      </div>
    </div>
  );
}
