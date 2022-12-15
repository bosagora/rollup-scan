import {AppAction} from "..";
import {
  BLOCK_TRANSACTIONS,
  BLOCKS_DATA_UPDATE,
  BLOCKS_DATA_UPDATE_WITH_PAGINATION,
  BOA_STATS,
  ENROLLED_VALIDATORS,
  HEADER_CLASS_UPDATE,
  HeaderState,
  MARKET_CAP_STATS,
  NETWORK_STATUS,
  SEARCHED_DATA_UPDATE,
  SINGLE_BLOCK,
  SINGLE_TRANSACTION,
  TRANSACTIONS_DATA_UPDATE,
  TRANSACTIONS_DATA_UPDATE_WITH_PAGINATION,
} from "./types";

const initialState: HeaderState = {
  headerClass: "newclass",
  layoutClass: "layout-home",
  searchedData: {
    searchType: "",
    available: false,
    details: {},
  },
  blocksData: [],
  blocksDataPaginated: [],
  transactionsData: [],
  transactionsDataPaginated: [],
  singleTransaction: {},
  singleBlock: {},
  enrolledValidators: [],
  blockTransactions: { tx: [], total_data: 0 },
  boaStats: {
    active_validators: 0,
    circulating_supply: 0,
    frozen_coin: 0,
    height: 0,
    transactions: 0,
    validators: 0,
  },
  marketCapStats: {
    block_time_in_minutes: 0,
    market_cap_24h_amount: 0,
    market_cap_change_percentage_24h: 0,
    price_in_usd: 0,
    time: new Date(),
    total24h_volume: 0,

  },
  isCoinNet : true,
};

export function headerReducer(
  state = initialState,
  action: AppAction
): HeaderState {
  switch (action.type) {
    case HEADER_CLASS_UPDATE:
      return {
        ...state,
        headerClass: action.headerClass,
        layoutClass: action.layoutClass,
      };
    case SEARCHED_DATA_UPDATE:
      return {
        ...state,
        searchedData: {
          searchType: action.searchType,
          available: action.available,
          details: action.details,
        },
      };
    case BLOCKS_DATA_UPDATE:
      return {
        ...state,
        blocksData: action.blocksData,
      };
    case BLOCKS_DATA_UPDATE_WITH_PAGINATION:
      return {
        ...state,
        blocksDataPaginated: action.blocksDataPaginated,
      };
    case TRANSACTIONS_DATA_UPDATE:
      return {
        ...state,
        transactionsData: action.transactionsData,
      };
    case TRANSACTIONS_DATA_UPDATE_WITH_PAGINATION:
      return {
        ...state,
        transactionsDataPaginated: action.transactionsDataPaginated,
      };
    case SINGLE_TRANSACTION:
      return {
        ...state,
        singleTransaction: action.singleTransaction,
      };
    case SINGLE_BLOCK:
      return {
        ...state,
        singleBlock: action.singleBlock,
      };
    case ENROLLED_VALIDATORS:
      return {
        ...state,
        enrolledValidators: action.enrolledValidators,
      };
    case BLOCK_TRANSACTIONS:
      return {
        ...state,
        blockTransactions: action.blockTransactions,
      };
    case BOA_STATS:
      return {
        ...state,
        boaStats: action.boaStats,
      };
    case MARKET_CAP_STATS:
      return {
        ...state,
        marketCapStats: action.marketCapStats,
      };
    case NETWORK_STATUS:
      return {
        ...state,
        isCoinNet:action.isCoinNet,
      }
    default:
      return state;
  }
}
