//import { configureStore } from '@reduxjs/toolkit';
//import authReducer from "@/redux/slices/AuthSlices";
import authReducer from "@/redux/reducers/AuthReducer";
import { combineReducers, createStore } from "redux";

//export const store = configureStore({
 //   reducer: {
      //authReducer: authReducer,
  //  },
 // });

 const rootReducer = combineReducers({
    
   authReducer: authReducer,
    // Add other reducers here
  });
  
  const store = createStore(rootReducer);

  export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;