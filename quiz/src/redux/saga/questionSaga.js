import { call, put, takeEvery } from "redux-saga/effects";

const apiUrl = `http://localhost:8000/api/questions`;
function getApi() {
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

function* fetchQuestions(action) {
  try {
    const questions = yield call(getApi);
    yield put({ type: "GET_QUESTIONS_SUCCESS", questions: questions });
  } catch (e) {
    yield put({ type: "GET_QUESTIONS_FAILED", message: e.message });
  }
}

function* questionSaga() {
  yield takeEvery("GET_QUESTIONS_REQUESTED", fetchQuestions);
}

export default questionSaga;
