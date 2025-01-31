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
} from "../constants/AuthConstants";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/app/api/auth/[...nextauth]/route";
import { AppDispatch } from "../store";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { saltAndHashPassword } from "@/lib/bcryptHelper";
import { GymRole, UserRole } from "@prisma/client";



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

export const signInTo = async (provider: string) => {
  try {
    // Call the signIn function
    const user = await signIn(provider, { redirectTo: "/" });

    // Revalidate the path
    revalidatePath("/");

    return {
      type: SIGN_IN_SUCCESS,
      payload: user,
    };
  } catch (error: any) {
    return {
      type: SIGN_IN_FAILED,
      payload: error.message,
    };
  }
};

// Function to handle sign-out
export const signOutOf = async () => {
  try {
    // Call the signOut function
    await signOut({ redirectTo: "/" });

    // Revalidate the path
    revalidatePath("/");

    return {
      type: SIGN_OUT_SUCCESS,
    };
  } catch (error: any) {
    return {
      type: SIGN_OUT_FAILED,
      payload: error.message,
    };
  }
};

// Function to reset the auth state
/*export const resetAuthState = () => {
  return initialState;
};

export const testAction = () => {
  console.log("Hi this works");
  return {
    type: TEST_SUCCESS,
    payload: "Hi this works",
  };
};*/

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

interface SignInUser{
  email: string;
  password: string;

}

export const signInWithDetails = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: "ADMIN",
    redirectTo: "/",
  };

  const existingUser = await getUserByEmail(formData.get("email") as string);
  console.log(existingUser);

  try {
    const user = await signIn("credentials", rawFormData);

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
  revalidatePath("/signin");
};


interface RegisterUser{
  email: string,
  password: string,
  role: GymRole,
  userRole: UserRole
}

export default async function registerUser( registerData: RegisterUser) {
  console.log(registerData);
  const hashedPassword = saltAndHashPassword(registerData.password);
  const email = registerData.email;
  const role = registerData.role;
  const password = registerData.password;
  const userRole = registerData.userRole;

  try {
    const user = await db.user.create({
      data: {
        email,
        password,
        hashedPassword,
        role,
        userRole,
      },
    });

    console.log("success");
    return {
      type: SIGN_UP_SUCCESS,
      payload: user,
    };

  } catch (error) {
    
    console.log(error);
    return {
      type: SIGN_UP_FAILED,
      payload: error,
    };
  }
}
