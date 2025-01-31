//import authReducer from "@/redux/slices/AuthSlices";
import {
  signInReducer,
  signOutReducer,
  signUpReducer,
  testAuthReducer,
} from "@/redux/reducers/AuthReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";

const rootReducer = combineReducers({
  signIn: signInReducer,
  testAuth: testAuthReducer,
  signOut: signOutReducer,
  signUp: signUpReducer,
  // Add other reducers here
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
