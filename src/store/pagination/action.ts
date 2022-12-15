import {
  CHANGE_PAGE_NUMBER,
} from "./types";

export function pageChangeNumber(
  pageNumber: number,
): any {
  return {
    type: CHANGE_PAGE_NUMBER,
    pageNumber
  };
}
