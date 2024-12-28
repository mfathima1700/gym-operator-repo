"use client"

import LoginForm from "@/components/auth/LoginForm";  // Correct import path

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm />
    </div>
  );
}