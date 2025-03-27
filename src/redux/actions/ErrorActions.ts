import { CLEAR_ERRORS } from "../constants/ErrorConstants";

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: {},
  };
};
