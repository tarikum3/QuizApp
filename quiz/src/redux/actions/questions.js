import * as type from "../types";

export function getQuestions() {
  return {
    type: type.GET_QUESTIONS_REQUESTED,
  };
}
