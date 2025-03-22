import { error } from "console";
import {
  CREATE_CHECKOUT_SESSION_FAILURE,
  CREATE_CHECKOUT_SESSION_REQUEST,
  CREATE_CHECKOUT_SESSION_SUCCESS,
  GET_PAYMENT_DATA_FAILURE,
  GET_PAYMENT_DATA_SUCCESS,
  REDIRECT_TO_CHECKOUT_FAILURE,
  REDIRECT_TO_CHECKOUT_REQUEST,
  REDIRECT_TO_CHECKOUT_SUCCESS,
} from "../constants/BillingConstants";

const initialState = {
  loading: false,
  sessionId: null,
  error: null,
};

const checkoutReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_CHECKOUT_SESSION_REQUEST:
    case REDIRECT_TO_CHECKOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_CHECKOUT_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionId: action.payload,
      };

    case REDIRECT_TO_CHECKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CREATE_CHECKOUT_SESSION_FAILURE:
    case REDIRECT_TO_CHECKOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const paymentDataState = {
  loading: false,
  payments: null,
  error: null,
};

const paymentDataReducer = (state = paymentDataState, action: any) => {
  switch (action.type) {
    case GET_PAYMENT_DATA_SUCCESS:
      return {
        ...state,
        payments: action,
      };

    case GET_PAYMENT_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { checkoutReducer, paymentDataReducer };
