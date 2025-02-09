import {
  SIGN_IN_LOADING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  TEST_SUCCESS, SIGN_OUT_FAILED, SIGN_OUT_SUCCESS, SIGN_UP_FAILED, SIGN_UP_LOADING, SIGN_UP_SUCCESS,
  GET_SESSION_SUCCESS,
  GET_SESSION_FAILED,
  VERIFY_SUCCESS,
  VERIFY_FAILED
} from "../constants/AuthConstants";

interface AuthState {
  user: any | null;
  loading: boolean;
  error: any;
  success: boolean;
}

const signInReducer = (state = { user: null, loading: false, error: null, success: false}, action: any): AuthState => {
  switch (action.type) {
    case SIGN_IN_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
        success: true,
      };
    case SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

interface testAuthState{
  message: string;
  error: any;
}


const testAuthReducer = (state = {message: "",error: null}, action: any) : testAuthState => {
  switch (action.type) {
    case TEST_SUCCESS:
      return {
        message: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

interface SignOutState {
  loading: boolean;
  error: any;
  success: boolean;
}

const signOutReducer = (state = {loading: false, error: null, success: false}, action: any): SignOutState => {
  switch (action.type) {
    case SIGN_OUT_SUCCESS:
      return {
        success: true,
        loading: false,
        error: null,
      };
    case SIGN_OUT_FAILED:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

interface SignUpState {
  loading: boolean;
  user: any | null;
  error: any;
}

const signUpReducer = (state = { loading: false, user: null, error: null}, action: any): SignUpState => {
  switch (action.type) {
    case SIGN_UP_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

interface getSessionState {
  user: any | null;
  error: any;
  success: boolean;
}

const getSessionReducer = (state = {  user: null, error: null, success: false}, action: any): getSessionState => {
  switch (action.type) {
    case GET_SESSION_SUCCESS:
      return {
        success: true,
        user: action.payload,
        error: null,
      };
    case GET_SESSION_FAILED:
      return {
        ...state,
        user: null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

interface verifyState {
  error: any;
  success: boolean;
}

const verifyReducer = (state = {  error: null, success: false}, action: any): verifyState => {
  switch (action.type) {
    case VERIFY_SUCCESS:
      return {
        success: true,
        error: null,
      };
    case VERIFY_FAILED:
      return {
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};


export { signInReducer, testAuthReducer, signUpReducer, signOutReducer, getSessionReducer, verifyReducer };
