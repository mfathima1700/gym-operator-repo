"use server";

import {
  SIGN_IN_FAILED,
  SIGN_IN_LOADING,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILED,
  TEST_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_UP_LOADING,
  SIGN_UP_SUCCESS,
  GET_SESSION_SUCCESS,
  GET_SESSION_FAILED,
  VERIFY_SUCCESS,
  VERIFY_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILED,
  GOOGLE_SIGN_UP_FAILED,
  GOOGLE_SIGN_UP_SUCCESS,
} from "../constants/AuthConstants";
import { revalidatePath } from "next/cache";
import { AppDispatch } from "../store";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { saltAndHashPassword } from "@/lib/bcryptHelper";
import { GymRole, UserRole } from "@prisma/client";
import {
  sendForgotPasswordEmail,
  signInWithEmail,
  signOut,
  signUpWithEmail,
  verifyEmail,
  setNewPassword,
  createGoogleOAuthSession,
  getGoogleOAuthSession,
  verifyAppwriteSession,
} from "@/lib/server/auth";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { NextResponse } from "next/server";

interface AuthState {
  user: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export async function testAction() {
  console.log("Hi this works");
  return {
    type: TEST_SUCCESS,
    payload: "Hi this works",
  };
}

interface RegisterUser {
  id?: string;
  name?: string;
  email: string;
  password: string;
  gymRole: GymRole;
  userRole: UserRole;
  gymCode: string;
  locale?:string
  picture?:string
}

export default async function registerUser(registerData: RegisterUser) {
  console.log(registerData);
  const hashedPassword = saltAndHashPassword(registerData.password);
  const email = registerData.email;
  const gymRole = registerData.gymRole;
  const password = registerData.password;
  const userRole = registerData.userRole;
  const code = registerData.gymCode;

  try {
    let gym;
    if (gymRole == GymRole.MEMBER) {
      gym = await db.gym.findUnique({
        where: { gymCode: code },
      });

      if (!gym) {
        throw new Error("Invalid gym code");
      }
    }

    const success = await signUpWithEmail(registerData);

    
    console.log("SIGNED UP WITH APPWITE");
    const user = await db.user.create({
      data: {
        email,
        password,
        hashedPassword,
        gymRole,
        userRole,
        ...(gymRole === GymRole.MEMBER && gym ? { gymId: gym?.id } : {}),
      },
    });

    console.log("REGISTER SUCESSFUL");
    return {
      type: SIGN_UP_SUCCESS,
      payload: user,
    };
  } catch (error) {
    console.log("REGISTER FAILED");
    console.log(error);
    return {
      type: SIGN_UP_FAILED,
      payload: error,
    };
  }
}

export async function signUpWithGoogle() {
  try {
    const success = await createGoogleOAuthSession(false);

    // Any need for flags?
    console.log("REGISTER WITH GOOGLE SUCESSFUL");
    // return {
    //   type: GOOGLE_SIGN_UP_SUCCESS,
    //   payload: {},
    // };
  } catch (error) {
    console.log(error);
    console.log("REGISTER WITH GOOGLE FAILED");
    // return {
    //   type: GOOGLE_SIGN_UP_FAILED,
    //   payload: error,
    // };
  }
}


export async function createGoogleUser(googleUser: RegisterUser, cookie: string) {
  try {
    //const user = await getGoogleOAuthSession();
    

    const appWriteUser = await verifyAppwriteSession(cookie);


    const userRole = googleUser.userRole;
    const gymRole = googleUser.gymRole;

    const email = appWriteUser.email;
    const password = "blank";

    let gym;
    if (gymRole == GymRole.MEMBER) {
      gym = await db.gym.findUnique({
        where: { gymCode: googleUser.gymCode },
      });

      if (!gym) {
        throw new Error("Invalid gym code");
      }
    }

    const mongoUser = await db.user.create({
      data: {
        email:email,
        password:password,
        name: appWriteUser.name,
        gymRole: gymRole,
        userRole: userRole,
        //country: appWriteUser.locale,
        image: appWriteUser.prefs?.picture,

        ...(gymRole === GymRole.MEMBER && gym ? { gymId: gym.id } : {}),
      },
    });

    console.log("CREATE GOOGLE USER SUCCESSFUL");
    return {
      type: SIGN_UP_SUCCESS,
      payload: mongoUser,
    };
  } catch (error) {
    console.log(error);
    console.log("CREATE GOOGLE USER FAILED");
    return {
      type: SIGN_UP_FAILED,
      payload: error,
    };
  }
}

export async function createGoogleUser2(googleUser: RegisterUser) {
  try {

    const userRole = googleUser.userRole;
  
    const email = googleUser.email;
    const password = "password";

    let gym;
    if (googleUser.gymRole == GymRole.MEMBER) {
      gym = await db.gym.findUnique({
        where: { gymCode: googleUser.gymCode },
      });

      if (!gym) {
        throw new Error("Invalid gym code");
      }
    }

    console.log("GOOGLE USER DATA DONE")
    const mongoUser = await db.user.create({
      data: {
        email:email,
        password:password,
        name: googleUser.name,
        gymRole: googleUser.gymRole as GymRole,
        userRole: googleUser.userRole as UserRole,
        //country: appWriteUser.locale,
        //image: googleUser.prefs?.picture,

        ...(googleUser.gymRole === GymRole.MEMBER && gym ? { gymId: gym.id } : {}),
      },
    });

    console.log("CREATE GOOGLE USER SUCCESSFUL");
    return {
      type: SIGN_UP_SUCCESS,
      payload: mongoUser,
    };
  } catch (error) {
    console.log(error);
    console.log("CREATE GOOGLE USER FAILED");
    return {
      type: SIGN_UP_FAILED,
      payload: {},
    };
  }
}

export async function getSession() {
  try {
    const user = await getLoggedInUser();
    return {
      type: GET_SESSION_SUCCESS,
      payload: user,
    };
  } catch (error) {
    console.log(error);
    return {
      type: GET_SESSION_FAILED,
      payload: error,
    };
  }
}

export async function signOutSession() {
  try {
    const result = await signOut();

    console.log("LOGOUT SUCCESSFUL");
    return {
      type: SIGN_OUT_SUCCESS,
      payload: result,
    };
  } catch (error) {
    console.log("LOGOUT FAILED");
    console.log(error);
    return {
      type: SIGN_OUT_FAILED,
      payload: error,
    };
  }
}

export async function googleSignOut(){

  try{

  }catch(error){
    
  }
}

interface SignInUser {
  email: string;
  password: string;
}

export async function signIn(userData: SignInUser) {
  try {
    const appWriteUser = await signInWithEmail(userData);
    const user = await getUserByEmail(userData.email);

    console.log("LOGIN SUCCESSFUL");
    return {
      type: SIGN_IN_SUCCESS,
      payload: user,
    };
  } catch (error) {
    console.log("LOGIN FAILED");
    console.log(error);
    return {
      type: SIGN_IN_FAILED,
      payload: error,
    };
  }
}

export async function signInWithGoogle() {
  try {
    const success = await createGoogleOAuthSession(true);

    console.log("LOGIN WITH GOOGLE SUCCESSFUL");

    // unnecessary?
    // return {
    //   type: SIGN_IN_SUCCESS,
    //   payload: user,
    // };
  } catch (error) {
    console.log("LOGIN WITH GOOGLE FAILED");
    console.log(error);
    // return {
    //   type: SIGN_IN_FAILED,
    //   payload: error,
    // };
  }
}

export async function getGoogleData() {
  try {
    const googleUser = await getGoogleOAuthSession();
    const user = await getUserByEmail(googleUser.email);

    console.log("GET GOOGLE DATA SUCCESSFUL");
    return {
      type: SIGN_IN_SUCCESS,
      payload: user,
    };
  } catch (error) {
    console.log(error);
    return {
      type: SIGN_IN_FAILED,
      payload: error,
    };
  }
}

export async function verifyEmailAddress(secret: string, userId: string) {
  try {
    const result = await verifyEmail(secret, userId);

    console.log("VERIFY SUCCESSFUL");
    return {
      type: VERIFY_SUCCESS,
      payload: result,
    };
  } catch (error) {
    console.log("VERIFY FAILED");
    console.log(error);
    return {
      type: VERIFY_FAILED,
      payload: error,
    };
  }
}

export async function sendPasswordEmail(email: string) {
  try {
    const result = await sendForgotPasswordEmail(email);

    console.log("SENT FORGET PASSWORD EMAIL");
    return {
      type: FORGET_PASSWORD_SUCCESS,
      //payload: result,
    };
  } catch (error) {
    console.log("FAILED TO SEND FORGET PASSWORD EMAIL");
    console.log(error);
    return {
      type: FORGET_PASSWORD_FAILED,
      payload: error,
    };
  }
}

export async function resetPassword(
  password: string,
  secret: string,
  userId: string
) {
  try {
    const result = await setNewPassword(password, secret, userId);

    console.log("RESET PASSWORD SUCCESSFUL");
    return {
      type: RESET_PASSWORD_SUCCESS,
    };
  } catch (error) {
    console.log("RESET PASSWORD FAILED");
    console.log(error);
    return {
      type: RESET_PASSWORD_FAILED,
      payload: error,
    };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email }, // Look up user by email
      include: {
        gym: true, // Include gym details if needed
        memberships: true,
        // Include memberships if needed
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.log("Error fetching user:", error);
    return error;
  }
}
