// src/app/signup/page.jsx

// previous imports ...

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient, getLoggedInUser } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GymRole, UserRole } from "@prisma/client";


export async function signUpWithEmail(user) {
    const { email, password, role, userRole } = user; 
  
    try{

    const { account } = await createAdminClient();
    await account.create(ID.unique(), email, password); // No `name` field provided

    // this part handles sign in
     /*const session = await account.createEmailPasswordSession(email, password);
  
   cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return session*/

    return account
    }catch(error){
      //throw new Error("Something went wrong with signing up")
      console.log(error);
      throw error;
    }
    
  
    //redirect("/account");
  }

  export async function signOut() {
    try{

      const { account } = await createSessionClient();
  
      cookies().delete("my-custom-session");
      const result = await account.deleteSession("current");
      return result;
    }catch(error){
      //throw new Error("Error signing out");
      console.log(error);
      throw error;
    }
    
  }

// the SignUpPage component ...

export async function signInWithEmail(user) {
  const { email, password } = user; 
 
  try{

    const { account } = await createSessionClient();
    const session = await account.createEmailPasswordSession(email, password);

    // Set the session in cookies
    const cookieStore = await cookies();
    cookieStore().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return session;

  }catch(error){

    console.log(error);
    throw error;
    //throw new Error("Invalid credentials or other error");
  }
}
