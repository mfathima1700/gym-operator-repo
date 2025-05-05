import { CLEAR_ERRORS } from "../constants/ErrorConstants";
import { CLEAR_GOAL_STATE, CREATE_GOAL_FAILED, CREATE_GOAL_SUCCESS, DELETE_GOAL_FAILED, DELETE_GOAL_SUCCESS, EDIT_GOAL_FAILED, EDIT_GOAL_SUCCESS } from "../constants/GoalConstants";


const deleteGoalReducer = (
  state = { error: null, success: false, goal:null },
  action: any
): goalDataState => {
  switch (action.type) {
    case DELETE_GOAL_SUCCESS:
      return {
        ...state,
        goal:action.payload,
        success: true,
        error: null,
      };
    case DELETE_GOAL_FAILED:
      return {
        ...state,
        goal:null,
        error: action.payload,
        success: false,
      };
      case CLEAR_GOAL_STATE:
      return initialGoalState
    default:
      return state;
  }
};

const editGoalReducer = (
  state = { error: null, success: false, goal:null },
  action: any
): goalDataState => {
  switch (action.type) {
    case EDIT_GOAL_SUCCESS:
      return {
        ...state,
        goal:action.payload,
        success: true,
        error: null,
      };
    case EDIT_GOAL_FAILED:
      return {
        ...state,
        goal:null,
        error: action.payload,
        success: false,
      };
      case CLEAR_GOAL_STATE:
        return initialGoalState
    default:
      return state;
  }
};

interface goalDataState {
  error: any;
  success: boolean;
  goal: any | null // classes? user.gym.class = true?
}

const initialGoalState: goalDataState = {
  error: null,
  success: false,
  goal: null,
};

const createGoalReducer = (
  state = { error: null, success: false, goal:null },
  action: any
): goalDataState => {
  switch (action.type) {
    case CREATE_GOAL_SUCCESS:
      return {
        ...state,
        goal:action.payload,
        success: true,
        error: null,
      };
    case CREATE_GOAL_FAILED:
      return {
        ...state,
        goal:null,
        error: action.payload,
        success: false,
      };
      case CLEAR_GOAL_STATE:
        return initialGoalState
    default:
      return state;
  }
};

export {
    deleteGoalReducer, editGoalReducer, createGoalReducer
};