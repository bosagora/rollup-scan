import { ThunkAction } from "redux-thunk";
import { AppAction, AppState } from "..";

// import request from "../../api/request"; //----> Generic Request for API Calls

import {pageChangeNumber } from "./action";

export function pageChange(
  pageNumber: number
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
   dispatch(pageChangeNumber(pageNumber));
  };
}

