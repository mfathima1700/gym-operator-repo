import { CREATE_CLASS_FAILED, CREATE_CLASS_SUCCESS } from "../constants/ClassConstants";

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

export {
    createClassReducer,
};