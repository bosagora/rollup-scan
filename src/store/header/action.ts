import {
  BLOCK_HEIGHT,
  BLOCK_TRANSACTIONS,
  BLOCKS_DATA_UPDATE,
  BLOCKS_DATA_UPDATE_WITH_PAGINATION,
  BOA_STATS,
  ENROLLED_VALIDATORS,
  HEADER_CLASS_UPDATE,
  HeaderAction,
  SEARCHED_DATA_UPDATE,
  SINGLE_BLOCK,
  SINGLE_TRANSACTION,
  TRANSACTIONS_DATA_UPDATE,
  TRANSACTIONS_DATA_UPDATE_WITH_PAGINATION,
} from "./types";

export function blockHeightUpdate(blockHeight: number): HeaderAction {
  return {
    type: BLOCK_HEIGHT,
    blockHeight,
  };
}
export function headerClassRequest(
  headerClass: string,
  layoutClass: string
): HeaderAction {
  return {
    type: HEADER_CLASS_UPDATE,
    headerClass,
    layoutClass,
  };
}

export function searchedDataRequest(
  searchType: string,
  available: boolean,
  details: any
): HeaderAction {
  return {
    type: SEARCHED_DATA_UPDATE,
    searchType,
    available,
    details,
  };
}

export function blocksDetailsDataRequest(blocksData: any): HeaderAction {
  return {
    type: BLOCKS_DATA_UPDATE,
    blocksData,
  };
}

export function transactionsDetailsDataRequest(
  transactionsData: any
): HeaderAction {
  return {
    type: TRANSACTIONS_DATA_UPDATE,
    transactionsData,
  };
}

export function blocksDetailsDataRequestWithPagination(
  blocksDataPaginated: any
): HeaderAction {
  return {
    type: BLOCKS_DATA_UPDATE_WITH_PAGINATION,
    blocksDataPaginated,
  };
}

export function transactionsDetailsDataRequestWithPagination(
  transactionsDataPaginated: any
): HeaderAction {
  return {
    type: TRANSACTIONS_DATA_UPDATE_WITH_PAGINATION,
    transactionsDataPaginated,
  };
}

export function singleTransactionDetails(singleTransaction: any): HeaderAction {
  return {
    type: SINGLE_TRANSACTION,
    singleTransaction,
  };
}

export function singleBlockDetails(singleBlock: any): HeaderAction {
  return {
    type: SINGLE_BLOCK,
    singleBlock,
  };
}

export function allEnrolledValidators(enrolledValidators: any): HeaderAction {
  return {
    type: ENROLLED_VALIDATORS,
    enrolledValidators,
  };
}

export function allBlockTransactions(blockTransactions: any): HeaderAction {
  return {
    type: BLOCK_TRANSACTIONS,
    blockTransactions,
  };
}

export function allBoaStats(boaStats: any): HeaderAction {
  return {
    type: BOA_STATS,
    boaStats,
  };
}
