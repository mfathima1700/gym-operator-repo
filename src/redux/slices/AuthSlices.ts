import { revalidatePath } from "next/cache";
import { SIGN_IN_FAILED, SIGN_IN_REQUESTED, SIGN_IN_SUCCESS } from "../constants/AuthConstants";
import {signIn, signOut} from "@/auth"
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    status: 'idle',
    error: null,
};

/*export const signInTo = async (provider:string) => {
    await signIn(provider, {redirectTo:"/"})
    revalidatePath("/")
}*/

export const signOutOf = async () => {
    await signOut({redirectTo:"/"})
    revalidatePath("/")
}



// Async thunk for sign-in
export const signInTo = createAsyncThunk(
  'auth/signIn',
  async (provider: string, { rejectWithValue }) => {
    try {
      const user = await signIn(provider, { redirectTo: '/' });
      revalidatePath('/');
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/*
// Async thunk for sign-out
export const signOutOf = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await signOut({ redirectTo: '/' });
      revalidatePath('/');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInTo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInTo.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signInTo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(signOutOf.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutOf.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
      })
      .addCase(signOutOf.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
*/
