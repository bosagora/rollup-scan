let API: any = process.env.REACT_APP_STOAURL;

export const Coinnet = process.env.REACT_APP_COINNETURL
  ? process.env.REACT_APP_COINNETURL
  : "https://dev-www-boascan.bosagora.com/";

export const Testnet = process.env.REACT_APP_TESTNETURL
  ? process.env.REACT_APP_TESTNETURL
  : "http://testnet.boascan.io/";

let endpoints = {
  latestBlocks: `${API}latest-blocks`,
  blockDetails: `${API}block-summary`,
  blockTransactions: `${API}block-transactions`,
  allBoaStats: `${API}boa-stats`,
  holders: `${API}holders`,
  boaholder: `${API}holder`,
  validators: `${API}validators`,
  validatorBallot: `${API}validator/ballot`,
  validatorReward: `${API}validator/reward`,
  searchHash: `${API}search/hash/`,
  enrolledValidators: `${API}block-enrollments`,
  latestTransactions: `${API}latest-transactions`,
  walletTransactionsHistory: `${API}wallet/transactions/history`,
  transactionsAddress: `${API}transactions/address`,
  transactionDetails: `${API}wallet/transaction/overview`,
  txhash: `${API}txhash`,
  coinMarketCap: `${API}coinmarketcap`,
  api: `${API}`,
  chart: `${API}coinmarketchart`,
  holderChart: `${API}holder_balance_history`,
  transactionFees: `${API}transaction/fees`,
  feeStatusChart: `${API}average_fee_chart`,
  proposals: `${API}proposals`,
  proposalByID: `${API}proposal`,
  proposalVotingDetails: `${API}proposal/voting-details`,
  missedBlocks: `${API}validator/missed-blocks`,
  validatorDetails: `${API}validator`,
  blockValidators: `${API}block/validators`,
  pendingTransactionOverview: `${API}transaction/pending/overview`,
};

export default endpoints;
