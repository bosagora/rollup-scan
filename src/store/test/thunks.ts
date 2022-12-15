import {ThunkAction} from "redux-thunk";
import {AppAction, AppState} from "..";
import {testFailure, testRequest, testSuccess} from "./action";
import {Test} from "./types";

export function testing(
  test: Test
): ThunkAction<Promise<Test>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    dispatch(testRequest());

    try {
      dispatch(testSuccess(test));
      return test;
    } catch (err:any) {
      dispatch(testFailure(err.message));
      throw err;
    }
  };
}
