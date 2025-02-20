import { SEND_CANCEL_FAILED, SEND_CANCEL_SUCCESS } from "../constants/EmailConstants";

interface classDataState {
  error: any;
  success: boolean;
  result: any | null // classes? user.gym.class = true?
}

const sendCancelReducer = (
  state = { error: null, success: false, result:null },
  action: any
): classDataState => {
  switch (action.type) {
    case SEND_CANCEL_SUCCESS:
      return {
        ...state,
        result:action.payload,
        success: true,
        error: null,
      };
    case SEND_CANCEL_FAILED:
      return {
        ...state,
        result:null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export {
    sendCancelReducer,
};