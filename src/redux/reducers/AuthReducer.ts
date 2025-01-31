import {
  SIGN_IN_LOADING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  TEST_SUCCESS, SIGN_OUT_FAILED, SIGN_OUT_SUCCESS, SIGN_UP_FAILED, SIGN_UP_LOADING, SIGN_UP_SUCCESS
} from "../constants/AuthConstants";

interface AuthState {
  user: any | null;
  loading: boolean;
  error: any;
}



const signInReducer = (state = { user: null, loading: false, error: null}, action: any): AuthState => {
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
      };
    case SIGN_IN_FAILED:
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
}

const signOutReducer = (state = {loading: false, error: null}, action: any): SignOutState => {
  switch (action.type) {
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SIGN_OUT_FAILED:
      return {
        ...state,
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

export { signInReducer, testAuthReducer, signUpReducer, signOutReducer };
