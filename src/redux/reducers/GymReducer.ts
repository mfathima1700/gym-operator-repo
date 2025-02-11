import { CREATE_GYM_FAILED, CREATE_GYM_SUCCESS, SET_USER_FAILED, SET_USER_SUCCESS } from "../constants/GymConstants";


interface basicDataState {
    error: any;
    success: boolean;
  }

const createGymReducer = (
  state = { error: null, success: false },
  action: any
): basicDataState => {
  switch (action.type) {
    case CREATE_GYM_SUCCESS:
      return {
        success: true,
        error: null,
      };
    case CREATE_GYM_FAILED:
      return {
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

const setUserDataReducer = (
  state = { error: null, success: false },
  action: any
): basicDataState => {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return {
        success: true,
        error: null,
      };
    case SET_USER_FAILED:
      return {
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export {
    createGymReducer,setUserDataReducer
};