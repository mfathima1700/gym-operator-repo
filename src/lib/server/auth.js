// src/app/signup/page.jsx

// previous imports ...

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient, getLoggedInUser } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GymRole, UserRole } from "@prisma/client";


export async function signUpWithEmail(user) {
    const { email, password, role, userRole } = user; 
  
    const { account } = await createAdminClient();
  
    await account.create(ID.unique(), email, password); // No `name` field provided
    const session = await account.createEmailPasswordSession(email, password);
  
    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  
    //redirect("/account");
  }

  export async function signOut() {
    const { account } = await createSessionClient();
  
    cookies().delete("my-custom-session");
    await account.deleteSession("current");
  }

// the SignUpPage component ...
