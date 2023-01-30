import { combineReducers } from "redux";
import questions from "./questions";

const rootReducer = combineReducers({
  questions: questions,
});

export default rootReducer;
