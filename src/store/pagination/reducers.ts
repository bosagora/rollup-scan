import { CHANGE_PAGE_NUMBER } from "./types";

const initialState: any = {
  pageNumber: 1,
};

export function paginationReducer(state = initialState, action: any): any {
  switch (action.type) {
    case CHANGE_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.pageNumber,
      };
    default:
      return state;
  }
}
