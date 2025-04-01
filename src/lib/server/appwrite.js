// src/lib/server/appwrite.js
"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";

export async function createClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  return client;
}

export async function createSessionClient() {
  try {
    const client = await createClient();

    const cookieStore = await cookies(); //await cookies()
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
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createAdminClient() {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
      .setKey(process.env.NEXT_PUBLIC_APPWRITE_KEY);

    return {
      get account() {
        return new Account(client);
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    //const { gymRole, userRole } = user.prefs || {};

    return user;
    // return {
    //   ...user, // Keep all user details
    //   gymRole,
    //   userRole,
    // };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function checkSession() {
  try {
    const cookieStore = await cookies(); //await cookies()
    const session = cookieStore.get("my-custom-session");
    if (!session || !session.value) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

