
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
import { create } from "domain";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import { createGymReducer, setUserDataReducer, updateUserSettingsReducer, updateOwnerSettingsReducer, getUserReducer } from "./reducers/GymReducer";
import { sendCancelReducer } from "./reducers/EmailReducer";
import { bookClassReducer, cancelBookingReducer, cancelClassReducer, createClassReducer, deleteClassReducer, getBookingsReducer, updateClassReducer } from "./reducers/ClassReducer";
import { checkoutReducer } from "./reducers/BillingReducer";
import { createGoalReducer, deleteGoalReducer, editGoalReducer } from "./reducers/GoalReducer";
//import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  signIn: signInReducer,
  testAuth: testAuthReducer,
  signOut: signOutReducer,
  signUp: signUpReducer,
  getSession: getSessionReducer,
  verify: verifyReducer,
  forgetPassword: forgetPasswordReducer,
  resetPassword: resetPasswordReducer,
  createGym: createGymReducer,
  setUserData: setUserDataReducer,
  updateUserSettings: updateUserSettingsReducer,
  updateOwnerSettings: updateOwnerSettingsReducer,
  getUser: getUserReducer,
  sendCancel:sendCancelReducer,
  getBookings:getBookingsReducer,
  deleteClass: deleteClassReducer,
  cancelClass:cancelClassReducer,
  cancelBooking: cancelBookingReducer,
  bookClass: bookClassReducer,
  updateClass:updateClassReducer,
  createClass:createClassReducer,
  checkout:checkoutReducer,
  deleteGoal: deleteGoalReducer, 
  editGoal: editGoalReducer, 
  createGoal: createGoalReducer,
  // Add other reducers here
});

// Middleware setup
const middleware = [promiseMiddleware];

// Redux DevTools setup
const composeEnhancers =
  (typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Create Redux store with middleware and DevTools support
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

//const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
