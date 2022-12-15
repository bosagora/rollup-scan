import { CHANGE_PAGE_SIZE } from "./types";

const initialState: any = {
  pageSize: 10,
};

export function paginationSizeReducer(state = initialState, action: any): any {
  switch (action.type) {
    case CHANGE_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.pageSize,
      };
    default:
      return state;
  }
}
