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
} from "../constants/AuthConstants";
import { revalidatePath } from "next/cache";
import { AppDispatch } from "../store";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { saltAndHashPassword } from "@/lib/bcryptHelper";
import { GymRole, UserRole } from "@prisma/client";
import {signInWithEmail, signOut, signUpWithEmail} from "@/lib/server/auth";
import { getLoggedInUser } from "@/lib/server/appwrite";


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



export async function testAction (){
  console.log("Hi this works");
  return {
    type: TEST_SUCCESS,
    payload: "Hi this works",
  };
};








interface RegisterUser{
  email: string,
  password: string,
  gymRole: GymRole,
  userRole: UserRole
}

export default async function registerUser( registerData: RegisterUser) {
  console.log(registerData);
  const hashedPassword = saltAndHashPassword(registerData.password);
  const email = registerData.email;
  const gymRole = registerData.gymRole;
  const password = registerData.password;
  const userRole = registerData.userRole;

  try {

    const success = await signUpWithEmail(registerData)

    const user = await db.user.create({
      data: {
        email,
        password,
        hashedPassword,
        gymRole,
        userRole,
      },
    });

    console.log("REGISTER SUCESSFUL");
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

export async function getSession(){

  try{
    const user = await getLoggedInUser();
    return {
      type: GET_SESSION_SUCCESS,
      payload: user,
    };

  }catch(error){
    console.log(error);
    return {
      type: GET_SESSION_FAILED,
      payload: error,
    };

  }
  
}

export async function signOutSession(){

  try{
    const result = await signOut();

    return {
      type: SIGN_OUT_SUCCESS,
      payload: result,
    };
  }catch(error){

    console.log(error);
    return {
      type: SIGN_OUT_FAILED,
      payload: error,
    };
  }
  
}

interface SignInUser{
  email: string;
  password: string;

}

export async function signIn(userData: SignInUser){

  try{
    const user = await signInWithEmail(userData);

    console.log("LOGIN SUCCESSFUL");
    return {
      type: SIGN_IN_SUCCESS,
      payload: user,
    };
  }catch(error){

    console.log(error);
    return {
      type: SIGN_IN_FAILED,
      payload: error,
    };
  }
}
