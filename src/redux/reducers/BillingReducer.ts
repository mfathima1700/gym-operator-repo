import { error } from "console";
import {
  CREATE_CHECKOUT_SESSION_FAILURE,
  CREATE_CHECKOUT_SESSION_REQUEST,
  CREATE_CHECKOUT_SESSION_SUCCESS,
  GET_INVOICES_FAILURE,
  GET_INVOICES_SUCCESS,
  GET_PAYMENTS_FAILURE,
  GET_PAYMENTS_SUCCESS,
  REDIRECT_TO_CHECKOUT_FAILURE,
  REDIRECT_TO_CHECKOUT_REQUEST,
  REDIRECT_TO_CHECKOUT_SUCCESS,
  UPDATE_PRICE_FAILURE,
  UPDATE_PRICE_SUCCESS,
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

const priceState = {
  loading: false,
  success: false,
  error: null,
};

const updatePriceReducer = (state = priceState, action: any) => {
  switch (action.type) {

    case UPDATE_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case UPDATE_PRICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const invoiceState = {
  loading: false,
  invoices: null,
  error: null,
};

const getInvoicesReducer = (state = invoiceState, action: any) => {
  switch (action.type) {

    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: action.payload,
      };

    case GET_INVOICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const getPaymentsReducer = (state = invoiceState, action: any) => {
  switch (action.type) {

    case GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: action.payload,
      };

    case GET_PAYMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


export { checkoutReducer, updatePriceReducer, getInvoicesReducer, getPaymentsReducer };
