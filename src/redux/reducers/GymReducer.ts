import { CLEAR_ERRORS } from "../constants/ErrorConstants";
import { ALTER_MEMBER_FAILED, ALTER_MEMBER_SUCCESS, CREATE_GYM_FAILED, CREATE_GYM_SUCCESS, GET_USER_DATA_FAILED, GET_USER_DATA_SUCCESS, SET_USER_FAILED, SET_USER_SUCCESS, UPDATE_OWNER_SETTINGS_FAILED, UPDATE_OWNER_SETTINGS_SUCCESS, UPDATE_USER_SETTINGS_FAILED, UPDATE_USER_SETTINGS_SUCCESS } from "../constants/GymConstants";


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

const updateUserSettingsReducer = (
  state = { error: null, success: false },
  action: any
): basicDataState => {
  switch (action.type) {
    case UPDATE_USER_SETTINGS_SUCCESS:
      return {
        success: true,
        error: null,
      };
    case UPDATE_USER_SETTINGS_FAILED:
      return {
        error: action.payload,
        success: false,
      };
      // case CLEAR_ERRORS:
      //   return  { error: null, success: false }
    default:
      return state;
  }
};

const updateOwnerSettingsReducer = (
  state = { error: null, success: false, user:null },
  action: any
): userDataState => {
  switch (action.type) {
    case UPDATE_OWNER_SETTINGS_SUCCESS:
      return {
        user:action.payload,
        success: true,
        error: null,
      };
    case UPDATE_OWNER_SETTINGS_FAILED:
      return {
        user:null,
        error: action.payload,
        success: false,
      };
      // case CLEAR_ERRORS:
      //   return  { error: null, success: false, user:null }
    default:
      return state;
  }
};

interface userDataState {
  error: any;
  success: boolean;
  user: any | null
}

const getUserReducer = (
  state = { error: null, success: false, user:null },
  action: any
): userDataState => {
  switch (action.type) {
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        user:action.payload,
        success: true,
        error: null,
      };
    case GET_USER_DATA_FAILED:
      return {
        ...state,
        user:null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

const alterMemberReducer = (
  state = { error: null, success: false, user:null },
  action: any
): userDataState => {
  switch (action.type) {
    case ALTER_MEMBER_SUCCESS:
      return {
        ...state,
        user:action.payload,
        success: true,
        error: null,
      };
    case ALTER_MEMBER_FAILED:
      return {
        ...state,
        user:null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

interface instructorDataState {
  error: any;
  instructors: any;
}

const getInstructorsReducer = (
  state = { error: null,  instructors:[] },
  action: any
): instructorDataState => {
  switch (action.type) {
    case CREATE_GYM_SUCCESS:
      return {
        instructors:action.payload,

        error: null,
      };
    case CREATE_GYM_FAILED:
      return {
        instructors:[],
        error: action.payload,
       
      };
    default:
      return state;
  }
};


export {
    createGymReducer,setUserDataReducer, updateUserSettingsReducer, updateOwnerSettingsReducer, getUserReducer, alterMemberReducer, getInstructorsReducer
};