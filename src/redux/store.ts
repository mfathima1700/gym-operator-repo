//import { configureStore } from '@reduxjs/toolkit';
//import authReducer from "@/redux/slices/AuthSlices";
import {signInReducer, signOutReducer, signUpReducer, testAuthReducer, getSessionReducer} from "@/redux/reducers/AuthReducer";
import { combineReducers, createStore, applyMiddleware  } from "redux";
import promiseMiddleware from "redux-promise";

//export const store = configureStore({
 //   reducer: {
      //authReducer: authReducer,
  //  },
 // });

 const rootReducer = combineReducers({
    
  signIn: signInReducer,
   testAuth:testAuthReducer,
   signOut:signOutReducer,
   signUp: signUpReducer,
   getSession:getSessionReducer,
    // Add other reducers here
  });
  
  const store = createStore(rootReducer,  applyMiddleware(promiseMiddleware));

  export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;