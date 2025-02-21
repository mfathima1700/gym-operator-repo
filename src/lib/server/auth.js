"use server";

import { ID } from "node-appwrite";
import {
  checkSession,
  createAdminClient,
  createSessionClient,
  getLoggedInUser,
  createClient,
} from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GymRole, UserRole } from "@prisma/client";
import { Client, Account, OAuthProvider } from "node-appwrite";

export async function signUpWithEmail(user) {
  const { email, password, gymRole, userRole } = user;

  try {
    const { account } = await createAdminClient();
    await account.create(ID.unique(), email, password); // No `name` field provided
    //await account.createEmailPasswordSession(email, password);
    //await account.updatePrefs({ gymRole, userRole });

    //await account.createVerification("http://localhost:3000/auth/verify");
    return account;
  } catch (error) {
    //throw new Error("Something went wrong with signing up")
    console.log(error);
    throw error;
  }
}

export async function verifyEmail(secret, userId) {
  const client = await createClient();
  const account = new Account(client);
  const verifiedAccount = await account.updateVerification(userId, secret);
}

export async function signOut() {
  try {
    //const { account } = await createSessionClient();

    if (checkSession() == true) {
      const cookieStore = await cookies();
      cookieStore.delete("my-custom-session");
      const result = await account.deleteSession("current");
      return result;
    }

    console.log("No session");
  } catch (error) {
    //throw new Error("Error signing out");
    console.log(error);
    throw error;
  }
}

// the SignUpPage component ...

export async function signInWithEmail(user) {
  const { email, password } = user;

  try {
    const client = await createClient();
    const account = new Account(client);
    const session = await account.createEmailPasswordSession(email, password);

    // Set the session in cookies
    const cookieStore = await cookies();
    cookieStore.set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return session;
  } catch (error) {
    console.log(error);
    throw error;
    //throw new Error("Invalid credentials or other error");
  }
}

export async function sendForgotPasswordEmail(email) {
  try {
    const client = await createClient();
    const account = new Account(client);
    await account.createRecovery(
      email,
      "http://localhost:3000/auth/reset-password"
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function setNewPassword(password, secret, userId) {
  try {
    const client = await createClient();
    const account = new Account(client);

    await account.updateRecovery(userId, secret, password);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createGoogleOAuthSession() {
  try {
    const client = await createClient();
    const account = new Account(client);

    const successUrl = process.env.NEXT_PUBLIC_APPWRITE_SUCCESS_URL;
    const failureUrl = process.env.NEXT_PUBLIC_APPWRITE_FAILURE_URL;

    const result = await account.createOAuth2Session('google',  successUrl, failureUrl)


  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getGoogleOAuthSession() {
  try {
    const session = await account.getSession("current");
const accessToken = session.providerAccessToken;
// Now make a fetch request to Google UserInfo API:
const googleUser = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
}).then(res => res.json());

return googleUser;
    
}catch (error) {
    console.log(error);
    throw error;
  }
}

