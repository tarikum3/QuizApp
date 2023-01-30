import * as type from "../types";

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

export default function questions(state = initialState, action) {
  switch (action.type) {
    case type.GET_QUESTIONS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.questions,
      };
    case type.GET_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
