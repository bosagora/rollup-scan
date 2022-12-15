import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
// import { ReactSVG } from 'react-svg'
import { searchDataUpdater } from "store/header/thunks";
import { RouterPathEnum } from "global/routes/RouterPathEnum";
import { pageChange } from "store/pagination/thunks";
import { pageSizeChange } from "store/paginationSize/thunks";
// import { login } from "store/auth/thunks";
// import copy from 'images/copy.svg'
import moment from "moment";
import { useTranslation } from "react-i18next";
// import socketIOClient from 'socket.io-client'
import endpoints from "../../global/config/urlconfigs";
import request from "../../global/api/request";
import CopyAddressClipboard from "components/CopyAddressClipboard/CopyAddressClipboard";
import { Amount } from "global/config/config";
import PageHelmet from "../../components/PageHelmet/PageHelmet";
import GenericSearchBar from "../../components/GenericSearchBar/GenericSearchBar";
import Table from "../../components/Table/Table";

var bigDecimal = require("js-big-decimal");
// interface IMyProps {
//   store?: any
//   data?: any
//   title?: string
//   output: any
//   name?: any
//   history?: any
//   searchedDataGet: Function
//   searchDataCleaner: Function
//   searchedData: {
//     searchType: ''
//     available: false
//     details: {}
//   }
// }

const getPretty = (val: any) => {
  var value = bigDecimal.getPrettyValue(val);
  return value;
};

const Transactions: React.FC = (props: any) => {
  // All states for current screen
  const dispatch = useDispatch(),
    [showRecord, setTotalRecords] = useState<any>(20),
    [currentPage, setCurrentPage] = useState(1),
    // [page, setpage] = useState('10'),
    [pageCount, setPageCount] = useState(0),
    [loading, setLoading] = useState(false),
    searchedData = useSelector((state: any) => state.header.searchedData),
    // const output = useSelector((state: any) => state.output.output);
    pagination = useSelector((state: any) => state.pagination),
    // paginationSize = useSelector((state: any) => state.paginationSize),
    // [transaction, setTransaction] = useState<any>([]),
    [CSVData, setCSVData] = useState([]),
    [transactionsData, setTransactionsData] = useState<any>([]);

  const { t } = useTranslation();
  // useEffect(() => {
  //   getlatestTransaction()
  // }, [])

  useEffect(() => {
    getlatestTransaction();
  }, [showRecord, currentPage]);

  // Get latest Transactions API call
  const getlatestTransaction = () => {
    setLoading(true);
  };

  const numberOfRecordShow = (Record: Number) => {
    setTotalRecords(Record);
    setCurrentPage(1);
  };

  useEffect(() => {
    // dispatch(
    //   getAllTransactionsonTransactionsDetails(
    //     pagination.pageNumber + 1,
    //     paginationSize.pageSize,
    //   ),
    // )
    setCurrentPage(pagination.pageNumber);
  }, [pagination]);

  // Get latest Transactions socket call
  // useEffect(() => {
  //   const socket = socketIOClient(endpoints.api)
  //   socket.on('newtransaction', (data) => {
  //     setTransaction(data)
  //   })
  // }, [])

  // useEffect(() => {
  //   if (transaction) {
  //     let tx = transaction.tx
  //     if (tx) {
  //       tx.map((item: any, index: any) => item)
  //       Object.assign({}, transaction.tx)
  //       let transactionNewData = transaction.tx.concat(transactionsData)
  //       transactionNewData.length = 10
  //       //transactionNewData.pop();
  //       setTransactionsData(transactionNewData)
  //     }
  //   }
  // }, [transaction])

  // Redirect to other screens functions
  const transactionOverview = (hash: string) => {
    props.history.push(`${RouterPathEnum.TRANSACTION_OVERVIEW}/${hash}`);
  };

  const blockDetails = (hash: string, type: string) => {
    if (type === "hash") {
      props.history.push(`${RouterPathEnum.BLOCKS_DETAILS}/hash:${hash}`);
    }
    props.history.push(`${RouterPathEnum.BLOCKS_DETAILS}/height:${hash}`);
  };

  return (
    <div className="page-container">
      <div id="transactions">
        <PageHelmet
          title={`THE9 Explorer - ${props.title}`}
          meta={{ name: "Transactions", content: "Lorem Ipsum" }}
        />
        <Container fluid="xl">
          <Row>
            <Col lg={12} md={12} sm={12}>
              {/* Transaction Top section  */}
              <div className="top-header2">
                <div className="left"></div>
                <div className="right">
                  <GenericSearchBar
                    history={props.history}
                    searchedDataGet={(searchid: any) =>
                      dispatch(searchDataUpdater(searchid))
                    }
                    searchedData={searchedData}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <h2>{t("Transactions")}</h2>
            </Col>
          </Row>
          {/* Transactions list  */}
          <Table
            headerData={[
              {
                Height: "",
                Hash: "",
                Type: "",
                Amount: "",
                Fee: "",
                Size: "",
                Time: "",
              },
            ]}
            headData={transactionsData.map(
              (transactionsData: any, index: number) => {
                return {
                  Height: (
                    <div
                      className="link-color"
                      onClick={() =>
                        blockDetails(transactionsData.height, "height")
                      }
                    >
                      {transactionsData.height
                        ? getPretty(transactionsData.height)
                        : transactionsData.height}
                    </div>
                  ),
                  Hash: (
                    <div className="copy-address max_address">
                      <div
                        onClick={() =>
                          transactionOverview(transactionsData.tx_hash)
                        }
                        className="link-color"
                      >
                        {transactionsData.tx_hash.slice(0, 6) +
                          `…` +
                          transactionsData.tx_hash.slice(-1 * 6)}
                      </div>
                      <CopyAddressClipboard
                        id={transactionsData.tx_hash}
                        text={transactionsData.tx_hash}
                      />
                    </div>
                  ),
                  Type: t(transactionsData.type),
                  Amount: (
                    <div className="amount">
                      <span>{getPretty(Amount(transactionsData.amount))}</span>
                      <span>BOA</span>
                    </div>
                  ),
                  Fee: (
                    <div className="fee">
                      <span>{getPretty(Amount(transactionsData.tx_fee))}</span>
                      <span>BOA</span>
                    </div>
                  ),
                  Size: (
                    <div className="amount">
                      <span>{getPretty(transactionsData.tx_size)}</span>
                      {t("Bytes")}
                    </div>
                  ),
                  Time:
                    moment
                      .utc(transactionsData.time_stamp * 1000)
                      .format("YYYY-MM-DD HH:mm:ss") + " UTC",
                };
              }
            )}
            pageChange={(pageNumber: number) =>
              dispatch(pageChange(pageNumber))
            }
            loading={loading}
            currentPage={currentPage}
            props={props}
            pageSize={(pageSize: number) => dispatch(pageSizeChange(pageSize))}
            pageCount={pageCount}
            showRecord={showRecord}
            data={transactionsData}
            CSVData={CSVData}
            numberOfRecordShow={(Record: number) => numberOfRecordShow(Record)}
            fileName={"Transactions List.csv"}
          />
        </Container>
      </div>
    </div>
  );
};

export default Transactions;
