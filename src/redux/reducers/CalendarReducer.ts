import { ADD_EVENT_FAILED, ADD_EVENT_SUCCESS, DELETE_EVENT_FAILED, DELETE_EVENT_SUCCESS, SYNC_EVENT_FAILED, SYNC_EVENT_SUCCESS, UPDATE_EVENT_FAILED, UPDATE_EVENT_SUCCESS } from "../constants/CalendarConstants";


interface CalendarState {
  loading: boolean;
  error: any;
  success: boolean;
}

const addEventReducer = (
  state = { loading: false, error: null, success: false },
  action: any
): CalendarState => {
  switch (action.type) {
    case ADD_EVENT_SUCCESS:
      return {
        success: true,
        loading: false,
        error: null,
      };
    case ADD_EVENT_FAILED:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const updateEventReducer = (
    state = { loading: false, error: null, success: false },
    action: any
  ): CalendarState => {
    switch (action.type) {
      case UPDATE_EVENT_SUCCESS:
        return {
          success: true,
          loading: false,
          error: null,
        };
      case UPDATE_EVENT_FAILED:
        return {
          success: false,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


  const deleteEventReducer = (
    state = { loading: false, error: null, success: false },
    action: any
  ): CalendarState => {
    switch (action.type) {
      case DELETE_EVENT_SUCCESS:
        return {
          success: true,
          loading: false,
          error: null,
        };
      case DELETE_EVENT_FAILED:
        return {
          success: false,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  const syncEventReducer = (
    state = { loading: false, error: null, success: false },
    action: any
  ): CalendarState => {
    switch (action.type) {
      case SYNC_EVENT_SUCCESS:
        return {
          success: true,
          loading: false,
          error: null,
        };
      case SYNC_EVENT_FAILED:
        return {
          success: false,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export {
    syncEventReducer,
    deleteEventReducer,
    addEventReducer,
    updateEventReducer,
  };