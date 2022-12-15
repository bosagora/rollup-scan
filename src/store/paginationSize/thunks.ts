import { ThunkAction } from "redux-thunk";
import { AppAction, AppState } from "..";

// import request from "../../api/request"; //----> Generic Request for API Calls

import {pageChangeSize} from "./action";

export function pageSizeChange(
  pageSize: number
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
   dispatch(pageChangeSize(pageSize));
  };
}

