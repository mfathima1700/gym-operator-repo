// app/(auth)/layout.tsx
"use client";

import { SessionProvider, getSession  } from "next-auth/react";
import {auth} from "@/app/api/auth/[...nextauth]/route"//"@/auth"
import { useEffect, useState } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
  //session?: any;
}) {

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  //const [session, setSession] = useState<any>(null);
//const session = await auth();

useEffect(() => {
  // Fetch the session on client-side
  const fetchSession = async () => {
    const sessionData = await getSession();
    //const sessionData = await auth(); // Fetch session asynchronously
    setSession(sessionData); // Store session in state
    setLoading(false);
  };

  fetchSession(); // Run the function to fetch the session
}, []); // Empty dependency array ensures it runs once after mount

// If session is still loading, you could render a loading state
if (!session) {
  return <div>Loading...</div>; // Or any loading component you'd like
}

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
