import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/index.js";
import rootSaga from "./saga/index";

// const sagaMiddleware = createSagaMiddleware();

// const store = compose(

//   applyMiddleware(sagaMiddleware),
//   window.devToolsExtension && window.devToolsExtension()
// )(createStore)(rootReducer);

// sagaMiddleware.run(rootSaga);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga);

export default store;
