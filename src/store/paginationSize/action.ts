import {
  CHANGE_PAGE_SIZE,
} from "./types";

export function pageChangeSize(
  pageSize: number,
): any {
  return {
    type: CHANGE_PAGE_SIZE,
    pageSize
  };
}
