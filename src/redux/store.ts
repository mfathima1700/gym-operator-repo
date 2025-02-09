
import {
  signInReducer,
  signOutReducer,
  signUpReducer,
  testAuthReducer,
  getSessionReducer,
  verifyReducer,
  forgetPasswordReducer,
  resetPasswordReducer,
} from "@/redux/reducers/AuthReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";


const rootReducer = combineReducers({
  signIn: signInReducer,
  testAuth: testAuthReducer,
  signOut: signOutReducer,
  signUp: signUpReducer,
  getSession: getSessionReducer,
  verify: verifyReducer,
  forgetPassword: forgetPasswordReducer,
  resetPassword: resetPasswordReducer,
  // Add other reducers here
});

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
