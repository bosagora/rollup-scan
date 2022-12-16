import { ThunkAction } from "redux-thunk";
import { AppAction, AppState } from "..";

import request from "../../global/api/request"; //----> Generic Request for API Calls
import endpoints from "../../global/config/urlconfigs";
import {
  headerClassRequest,
  searchedDataRequest,
  blocksDetailsDataRequest,
  blocksDetailsDataRequestWithPagination,
  transactionsDetailsDataRequest,
  transactionsDetailsDataRequestWithPagination,
  singleTransactionDetails,
  singleBlockDetails,
  allEnrolledValidators,
  allBlockTransactions,
  allBoaStats,
  marketCapStats,
} from "./action";

export function headerClassUpdater(
  headerClass: string,
  layoutClass: string
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    dispatch(headerClassRequest(headerClass, layoutClass));

    try {
      return { headerClass, layoutClass };
    } catch (err) {
      throw err;
    }
  };
}

// blocks dashboard
export function getAllBlocksonDashboard(
  page: number,
  limit: number
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    const req = await request(
      "GET",
      `${endpoints.latestBlocks}?page=1&limit=11`,
      {}
    )
      .then((res: any) => {
        dispatch(blocksDetailsDataRequest(res.data));
      })
      .catch((err: any) => {
        return err;
      });

    try {
      return { req, page, limit };
    } catch (err) {
      // throw err;
    }
  };
}

//view all blocks details
export function getAllBlocksonBlocksDetails(
  page: number,
  limit: number
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    const req = await request(
      "GET",
      `${endpoints.latestBlocks}?page=${page}&limit=${limit}`,
      {}
    )
      .then((res: any) => {
        dispatch(blocksDetailsDataRequestWithPagination(res.data));
      })
      .catch((err: any) => {
        return err;
      });

    try {
      return { req, page, limit };
    } catch (err) {
      // throw err;
    }
  };
}

export function searchDataUpdater(
  searchid: string
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    var searchType = "blocks"; //update according to api response
    var available = true; //update according to api response
    var details = { number: 10, packagae: "x", version: "22.034" }; //update according to api response
    // const req = await request(
    //   "GET",
    //   "https://jsonplaceholder.typicode.com/todos",
    //   {}
    // )
    //   .then((res: any) => {
    //     return res;
    //   })
    //   .catch((err: any) => {
    //     return err;
    //   });

    try {
      dispatch(searchedDataRequest(searchType, available, details));
      return { searchType, available, details };
    } catch (err) {
      throw err;
    }
  };
}

export function searchDataCleaner(): ThunkAction<
  Promise<any>,
  AppState,
  undefined,
  AppAction
> {
  return async (dispatch) => {
    dispatch(searchedDataRequest("", false, {}));
  };
}

//get all transactions for dashboard
export function getAllTransactionsonDashboard(
  page: number,
  limit: number
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    const req = await request(
      "GET",
      `${endpoints.latestTransactions}?page=1&limit=11`,
      {}
    )
      .then((res: any) => {
        dispatch(transactionsDetailsDataRequest(res.data));
      })
      .catch((err: any) => {
        return err;
      });

    try {
      return { req, page, limit };
    } catch (err) {
      // throw err;
    }
  };
}

//view all transactions on transaction detail page
export function getAllTransactionsonTransactionsDetails(
  page: number,
  limit: number
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    const req = await request(
      "GET",
      `${endpoints.latestTransactions}?page=${page}&limit=${limit}`,
      {}
    )
      .then((res: any) => {
        dispatch(transactionsDetailsDataRequestWithPagination(res.data));
      })
      .catch((err: any) => {
        return err;
      });

    try {
      return { req, page, limit };
    } catch (err) {
      // throw err;
    }
  };
}

//details of single transaction using hash
export function singleTransactionDetailsfromHash(
  hash: string
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    const req = await request(
      "GET",
      `${endpoints.transactionDetails}/${hash}`,
      {}
    )
      .then((res: any) => {
        dispatch(singleTransactionDetails(res.data));
        return res;
      })
      .catch((err: any) => {
        return err;
      });

    try {
      return { req, hash };
    } catch (err) {
      // throw err;
    }
  };
}

//details of single block using hash
export function singleBlockDetailsfromHash(
  hash: string
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    const req = await request(
      "GET",
      `${endpoints.blockDetails}?hash=${hash}`,
      {}
    )
      .then((res: any) => {
        dispatch(singleBlockDetails(res.data));
        return res;
      })
      .catch((err: any) => {
        return err;
      });

    try {
      return { req, hash };
    } catch (err) {
      // throw err;
    }
  };
}

//details of single block using height
export function singleBlockDetailsfromHeight(
  height: number
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    const req = await request(
      "GET",
      `${endpoints.blockDetails}?height=${height}`,
      {}
    )
      .then((res: any) => {
        dispatch(singleBlockDetails(res.data));
        return res;
      })
      .catch((err: any) => {
        return err;
      });

    try {
      return { req, height };
    } catch (err) {
      // throw err;
    }
  };
}

//details of enrolled validators
export function allEnrolledValidatorswithHeight(
  height: number,
  page: number,
  limit: number,
  setLoadFalse: any
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    const req = await request(
      "GET",
      `${endpoints.enrolledValidators}?height=${height}&page=${page}&limit=${limit}`,
      {}
    )
      .then((res: any) => {
        dispatch(allEnrolledValidators(res.data));
        setLoadFalse();
        return res;
      })
      .catch((err: any) => {
        setLoadFalse();
        return err;
      });

    try {
      return { req, height };
    } catch (err) {
      // throw err;
    }
  };
}

//details of all block transactions
export function allBlocksTransactionsfromHash(
  hash: string,
  page: number,
  limit: number
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    const req = await request(
      "GET",
      `${endpoints.blockTransactions}?hash=${hash}&page=${page}&limit=${limit}`,
      {}
    )
      .then((res: any) => {
        dispatch(allBlockTransactions(res.data));
        return res;
      })
      .catch((err: any) => {
        return err;
      });

    try {
      return { req, hash };
    } catch (err) {
      // throw err;
    }
  };
}

//details of all block transactions
export function allBlocksTransactionsfromHeight(
  height: string,
  page: number,
  limit: number
): ThunkAction<Promise<any>, AppState, undefined, AppAction> {
  return async (dispatch) => {
    const req = await request(
      "GET",
      `${endpoints.blockTransactions}?height=${height}&page=${page}&limit=${limit}`,
      {}
    )
      .then((res: any) => {
        dispatch(allBlockTransactions(res.data));
        return res;
      })
      .catch((err: any) => {
        return err;
      });

    try {
      return { req, height };
    } catch (err) {
      // throw err;
    }
  };
}

//details of all block transactions
export function allBoaStatsforDashboard(): ThunkAction<
  Promise<any>,
  AppState,
  undefined,
  AppAction
> {
  return async (dispatch) => {
    const req = await request("GET", `${endpoints.allBoaStats}`, {})
      .then((res: any) => {
        dispatch(allBoaStats(res.data));
        return res;
      })
      .catch((err: any) => {
        return err;
      });

    try {
      return { req };
    } catch (err) {
      // throw err;
    }
  };
}
