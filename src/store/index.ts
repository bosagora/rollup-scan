import { applyMiddleware, combineReducers, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { testReducer } from "./test/reducers";
import { TestAction } from "./test/types";
import { headerReducer } from "./header/reducers";
import { HeaderAction } from "./header/types";
import { paginationReducer } from "./pagination/reducers";
import { paginationSizeReducer } from "./paginationSize/reducers";
import { createStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  test: testReducer,
  header: headerReducer,
  pagination: paginationReducer,
  paginationSize: paginationSizeReducer,
});

const initialState = {};

export type AppState = ReturnType<typeof rootReducer>;
export type AppAction = TestAction | HeaderAction;

let store: Store;

if (process.env.NODE_ENV === "development") {
  store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk as ThunkMiddleware<AppState, AppAction>)
    )
  );
} else {
  store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppAction>)
  );
}

export default store;
