// app/(auth)/layout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import {auth} from "@/auth"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
  session?: any;
}) {

const session = await auth();

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
