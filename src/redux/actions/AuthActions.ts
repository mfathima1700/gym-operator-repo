import { SIGN_IN_FAILED, SIGN_IN_REQUESTED, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_OUT_FAILED, TEST_SUCCESS  } from "../constants/AuthConstants";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/app/api/auth/[...nextauth]/route";
import { AppDispatch } from "../store";

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
      // Update state to "loading"
      let state: AuthState = { ...initialState, status: "loading" };
  
      // Call the signIn function
      const user = await signIn(provider, { redirectTo: "/" });
  
      // Revalidate the path
      revalidatePath("/");
  
      // Update state to "succeeded" and set the user
      //state = { ...state, status: "succeeded", user };
  
      return {
        type: SIGN_IN_SUCCESS,
        payload: user,
      };
    } catch (error: any) {

        return {
            type: SIGN_IN_FAILED,
            payload: error.message,
          };
      // Update state to "failed" and set the error
      //const state: AuthState = { ...initialState, status: "failed", error: error.message };
      //return state;
    }
  };
  
  // Function to handle sign-out
  export const signOutOf = async () => {
    try {
      // Update state to "loading"
      let state: AuthState = { ...initialState, status: "loading" };
  
      // Call the signOut function
      await signOut({ redirectTo: "/" });
  
      // Revalidate the path
      revalidatePath("/");
  
      // Update state to "succeeded" and clear the user
      //state = { ...state, status: "succeeded", user: null };
  
      //return state;
      return {
        type: SIGN_OUT_SUCCESS,
      };
    } catch (error: any) {

        return {
            type: SIGN_IN_FAILED,
            payload: error.message,
          };
      // Update state to "failed" and set the error
      //const state: AuthState = { ...initialState, status: "failed", error: error.message };
      //return state;
    }
  };
  
  // Function to reset the auth state
  export const resetAuthState = () => {
    return initialState;
  };

  export const testAction = () => {
    console.log("Hi this works")
    return {
    type:TEST_SUCCESS,
    payload:"Hi this works"
    }
}
    //console.log("Hi this works")

    /*export const testAction = () => async (dispatch: AppDispatch) => {
        try {
          console.log("Test action dispatched");
        } catch (error) {
          console.error("Error in testAction:", error);
        }
      };*/

  