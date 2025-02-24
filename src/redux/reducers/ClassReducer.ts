import { BOOK_CLASS_FAILED, BOOK_CLASS_SUCCESS, CANCEL_BOOKING_FAILED, CANCEL_BOOKING_SUCCESS, CANCEL_CLASS_FAILED, CANCEL_CLASS_SUCCESS, CREATE_CLASS_FAILED, CREATE_CLASS_SUCCESS, DELETE_CLASS_FAILED, DELETE_CLASS_SUCCESS, EDIT_CLASS_FAILED, EDIT_CLASS_SUCCESS } from "../constants/ClassConstants";

interface classDataState {
  error: any;
  success: boolean;
  class: any | null // classes? user.gym.class = true?
}

const createClassReducer = (
  state = { error: null, success: false, class:null },
  action: any
): classDataState => {
  switch (action.type) {
    case CREATE_CLASS_SUCCESS:
      return {
        ...state,
        class:action.payload,
        success: true,
        error: null,
      };
    case CREATE_CLASS_FAILED:
      return {
        ...state,
        class:null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

const updateClassReducer = (
  state = { error: null, success: false, class:null },
  action: any
): classDataState => {
  switch (action.type) {
    case EDIT_CLASS_SUCCESS:
      return {
        ...state,
        class:action.payload,
        success: true,
        error: null,
      };
    case EDIT_CLASS_FAILED:
      return {
        ...state,
        class:null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

interface bookingDataState {
  error: any;
  success: boolean;
  booking: any | null // classes? user.gym.class = true?
}

const bookClassReducer = (
  state = { error: null, success: false, booking:null },
  action: any
): bookingDataState => {
  switch (action.type) {
    case BOOK_CLASS_SUCCESS:
      return {
        ...state,
        booking:action.payload,
        success: true,
        error: null,
      };
    case BOOK_CLASS_FAILED:
      return {
        ...state,
        booking:null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

const cancelBookingReducer = (
  state = { error: null, success: false, booking:null },
  action: any
): bookingDataState => {
  switch (action.type) {
    case CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        booking:action.payload,
        success: true,
        error: null,
      };
    case CANCEL_BOOKING_FAILED:
      return {
        ...state,
        booking:null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

const cancelClassReducer = (
  state = { error: null, success: false, class:null },
  action: any
): classDataState => {
  switch (action.type) {
    case CANCEL_CLASS_SUCCESS:
      return {
        ...state,
        class:action.payload,
        success: true,
        error: null,
      };
    case CANCEL_CLASS_FAILED:
      return {
        ...state,
        class:null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

const deleteClassReducer = (
  state = { error: null, success: false, class:null },
  action: any
): classDataState => {
  switch (action.type) {
    case DELETE_CLASS_SUCCESS:
      return {
        ...state,
        class:action.payload,
        success: true,
        error: null,
      };
    case DELETE_CLASS_FAILED:
      return {
        ...state,
        class:null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

interface bookingsDataState {
  error: any;
  success: boolean;
  bookings: [] | null // classes? user.gym.class = true?
}

const getBookingsReducer = (
  state = { error: null, success: false, bookings:null },
  action: any
): bookingsDataState => {
  switch (action.type) {
    case DELETE_CLASS_SUCCESS:
      return {
        ...state,
        bookings:action.payload,
        success: true,
        error: null,
      };
    case DELETE_CLASS_FAILED:
      return {
        ...state,
        bookings:null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export {
    createClassReducer, updateClassReducer, bookClassReducer, cancelClassReducer,
     cancelBookingReducer, deleteClassReducer, getBookingsReducer
};