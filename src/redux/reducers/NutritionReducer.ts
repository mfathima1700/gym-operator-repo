import { GET_EXERCISE_FAILED, GET_EXERCISE_SUCCESS, GET_NUTRITION_FAILED, GET_NUTRITION_SUCCESS } from "../constants/NutritionConstants";


const initialState = {
    loading: false,
    data: null,
    error: null
  };
  
  export const exerciseReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case GET_EXERCISE_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case GET_EXERCISE_FAILED:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const nutritionReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case GET_NUTRITION_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case GET_NUTRITION_FAILED:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

