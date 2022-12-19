export interface HeaderState {
  headerClass: string;
  layoutClass: string;
  searchedData: {
    searchType: string;
    available: boolean;
    details: any;
  };
  blocksData: any[];
  blocksDataPaginated: any[];
  transactionsData: any[];
  transactionsDataPaginated: any[];
  singleTransaction: {};
  singleBlock: {};
  enrolledValidators: [];
  blockTransactions: {
    tx: any[];
    total_data: number;
  };
  boaStats: {
    active_validators: number;
    circulating_supply: number;
    frozen_coin: number;
    height: number;
    transactions: number;
    validators: number;
  };
  marketCapStats: {};
  isCoinNet: true;

  blockHeight: number;
}

export const HEADER_CLASS_UPDATE = "HEADER_CLASS_UPDATE";
export const SEARCHED_DATA_UPDATE = "SEARCHED_DATA_UPDATE";
export const BLOCKS_DATA_UPDATE = "BLOCKS_DATA_UPDATE";
export const BLOCKS_DATA_UPDATE_WITH_PAGINATION =
  "BLOCKS_DATA_UPDATE_WITH_PAGINATION";
export const TRANSACTIONS_DATA_UPDATE = "TRANSACTIONS_DATA_UPDATE";
export const TRANSACTIONS_DATA_UPDATE_WITH_PAGINATION =
  "TRANSACTIONS_DATA_UPDATE_WITH_PAGINATION";
export const SINGLE_TRANSACTION = "SINGLE_TRANSACTION";
export const SINGLE_BLOCK = "SINGLE_BLOCK";
export const ENROLLED_VALIDATORS = "ENROLLED_VALIDATORS";
export const BLOCK_TRANSACTIONS = "BLOCK_TRANSACTIONS";
export const BOA_STATS = "BOA_STATS";
export const MARKET_CAP_STATS = "MARKET_CAP_STATS";
export const NETWORK_STATUS = "NETWORK_STATUS";

export const BLOCK_HEIGHT = "BLOCK_HEIGHT";

export interface BlockHeightAction {
  type: typeof BLOCK_HEIGHT;

  blockHeight: number;
}

export interface HeaderClassRequestAction {
  type: typeof HEADER_CLASS_UPDATE;
  headerClass: string;
  layoutClass: string;
}

export interface SearchedDataRequestAction {
  type: typeof SEARCHED_DATA_UPDATE;
  searchType: string;
  available: boolean;
  details: any;
}

export interface BlocksDataRequestAction {
  type: typeof BLOCKS_DATA_UPDATE;
  blocksData: any;
}

export interface BlocksDataPaginatedRequestAction {
  type: typeof BLOCKS_DATA_UPDATE_WITH_PAGINATION;
  blocksDataPaginated: any;
}

export interface TransactionsDataRequestAction {
  type: typeof TRANSACTIONS_DATA_UPDATE;
  transactionsData: any;
}

export interface TransactionsDataPaginatedRequestAction {
  type: typeof TRANSACTIONS_DATA_UPDATE_WITH_PAGINATION;
  transactionsDataPaginated: any;
}
export interface SingleTransaction {
  type: typeof SINGLE_TRANSACTION;
  singleTransaction: any;
}

export interface SingleBlock {
  type: typeof SINGLE_BLOCK;
  singleBlock: any;
}

export interface EnrolledValidators {
  type: typeof ENROLLED_VALIDATORS;
  enrolledValidators: any;
}
export interface AllBlockTransactions {
  type: typeof BLOCK_TRANSACTIONS;
  blockTransactions: any;
}
export interface AllBoaStats {
  type: typeof BOA_STATS;
  boaStats: any;
}

export interface MarketCapStats {
  type: typeof MARKET_CAP_STATS;
  marketCapStats: any;
}

export interface NetworkStats {
  type: typeof NETWORK_STATUS;
  isCoinNet: any;
}

export type HeaderAction =
  | HeaderClassRequestAction
  | SearchedDataRequestAction
  | BlocksDataRequestAction
  | BlocksDataPaginatedRequestAction
  | TransactionsDataRequestAction
  | TransactionsDataPaginatedRequestAction
  | SingleTransaction
  | SingleBlock
  | EnrolledValidators
  | AllBlockTransactions
  | AllBoaStats
  | MarketCapStats
  | BlockHeightAction
  | NetworkStats;
