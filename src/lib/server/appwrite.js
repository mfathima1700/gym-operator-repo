// src/lib/server/appwrite.js
"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {

  try{

    const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  const cookieStore  = await cookies()
  const session = cookieStore.get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
  }catch(error){
    console.log(error);
    throw new Error("Error creating session client")
  }
  
}

export async function createAdminClient() {

  try{
    const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
  }catch(error){
    console.log(error);
    throw new Error("Error creating admin client")
  }
  
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user =  await account.get();
      const { gymRole, userRole } = user.prefs || {};

      return {
        ...user, // Keep all user details
        gymRole,
        userRole,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error getting session");
    }
  }
  
