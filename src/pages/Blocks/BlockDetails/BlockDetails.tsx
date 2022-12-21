import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchDataUpdater } from "store/header/thunks";
import { useTranslation } from "react-i18next";
import moment from "moment";
import CopyAddressClipboard from "components/CopyAddressClipboard/CopyAddressClipboard";
import Loader from "components/Loader/Loader";
import request from "../../../global/api/request";
import PageHelmet from "../../../components/PageHelmet/PageHelmet";
import GenericSearchBar from "../../../components/GenericSearchBar/GenericSearchBar";
import Table from "../../../components/Table/Table";
import { useByHeight } from "../../../hooks/useRollup";
import { Block } from "rollup-pm-sdk";
import _ from "lodash";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

const BlockDetails: React.FC = (props: any) => {
  // All states for current screen
  const dispatch = useDispatch();
  const [showRecord, setShowRecords] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState<any>({});
  const [totalTransactions, setTotalTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [txVolume, setTxVolume] = useState(BigNumber.from(0));
  const [currentHeight, setCurrentHeight] = useState(Number.NaN);
  const { t } = useTranslation();

  const searchedData = useSelector((state: any) => state.header.searchedData);

  const blockHeight = useSelector((state: any) => state.header.blockHeight);

  const { blockHeader } = useByHeight(currentHeight);

  useEffect(() => {
    if (isNaN(currentHeight)) {
      setCurrentHeight(blockHeight);
    }
  }, [blockHeight]);

  useEffect(() => {
    if (blockHeader) {
      setAllData(blockHeader);
      getCIDData();
    }
    setLoading(false);
  }, [blockHeader]);

  const getCIDData = useCallback(() => {
    if (!blockHeader) return;
    request("GET", blockHeader.CID, {})
      .then((res) => {
        if (res.status === 200) {
          const block: Block = res.data as Block;
          if (block?.txs?.length) {
            const txs = _.sortBy(block.txs, "sequence").reverse();
            let volume = BigNumber.from(0);
            txs.forEach((t) => {
              const amount = BigNumber.from(t.amount);
              if (t.state === "0") {
                volume = volume.add(amount);
              } else {
                volume = volume.sub(amount);
              }
            });
            setTxVolume(volume);
            setTotalTransactions(txs);
            setPageCount(txs.length);
            setCurrentPage(1);
          }
        }
      })
      .catch((e) => {
        console.log("CID request error:", e);
      });
  }, [blockHeader]);

  useEffect(() => {
    if (_.isEmpty(totalTransactions)) return;
    setTransactions(
      totalTransactions.slice(
        (currentPage - 1) * showRecord,
        showRecord * currentPage
      )
    );
  }, [totalTransactions, currentPage, showRecord]);

  const handlerTxClick = (e) => {
    console.log(e.Seq.props.children);
  };

  const nodeDetails = (address: any) => {
    //   props.history.push(`${RouterPathEnum.NODE_DETAILS}/${address}`);
  };

  const blockDetails = (hash: string) => {
    //   props.history.push(`${RouterPathEnum.BLOCKS_DETAILS}/hash:${hash}`);
  };

  const transactionOverview = (utxoKey: string) => {
    //   props.history.push(`${RouterPathEnum.TRANSACTION_OVERVIEW}/${utxoKey}`, {
    //     utxoKey: true,
    //   });
  };

  return (
    <div className="page-container">
      <div id="block-details">
        <PageHelmet
          title={`THE9 Explorer - ${props.title} ${allData.height}`}
          meta={{
            name: "Block Details",
            content: "THE9 Explorer - Block Details",
          }}
        />
        <Container fluid="xl">
          <Row>
            <Col lg={12} md={12} sm={12}>
              {/* Blocks Top section  */}
              <div className="top-header">
                <div className="left">
                  {/* <div
                    className="back-search"
                    onClick={() => props.history.push(RouterPathEnum.BLOCKS)}
                  >
                    <Link to="#" className="back-link">
                      <AiOutlineArrowLeft />
                      <p>{t('Back')}</p>
                    </Link>
                  </div> */}
                </div>
                <div className="right">
                  <GenericSearchBar
                    history={props.history}
                    searchedDataGet={(searchid: string) =>
                      dispatch(searchDataUpdater(searchid))
                    }
                    searchedData={searchedData}
                  />
                </div>
              </div>
            </Col>
          </Row>
          {loading ? (
            <div className="no_record">
              <Loader />
            </div>
          ) : Object.keys(allData).length === 0 ? (
            <div className="no_record">
              <h2>{t("NoRecord")}</h2>
            </div>
          ) : (
            <>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <h2>
                    {t("Block")} {allData.height ? <>#{allData.height}</> : ""}
                  </h2>
                </Col>
              </Row>
              <div className="more-detail">
                <div className="item">
                  <p>{t("Block_Hash")}</p>
                  <div className="values">
                    <div className="hash-copy copy-address">
                      {allData?.curBlock && (
                        <>
                          {allData.curBlock}
                          <CopyAddressClipboard
                            id="allDataMerkleRoot"
                            text={allData.curBlock}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="item">
                  <p>{t("Previous_Block_Hash")}</p>
                  <div className="values">
                    <div className="hash-copy copy-address">
                      {allData?.prevBlock && (
                        <>
                          {allData.prevBlock}
                          <CopyAddressClipboard
                            id="allDataMerkleRoot"
                            text={allData.prevBlock}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="item">
                  <p>{t("Merkle_Root")}</p>
                  <div className="values">
                    <div className="hash-copy copy-address">
                      {allData?.merkleRoot && (
                        <>
                          {allData.merkleRoot}
                          <CopyAddressClipboard
                            id="allDataMerkleRoot"
                            text={allData.merkleRoot}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="item">
                  <p>{t("CID")}</p>
                  <div className="values">
                    <div className="hash-copy copy-address">
                      {allData.CID ? (
                        <>
                          <>{allData.CID && <>{allData.CID}</>}</>
                          <CopyAddressClipboard
                            id={allData.CID}
                            text={allData.CID}
                          />
                        </>
                      ) : (
                        ""
                        // <Loader />
                      )}
                    </div>
                  </div>
                </div>
                <div className="item">
                  <p>{t("Timestamp")}</p>
                  <div className="values">
                    {moment
                      .utc(allData.timestamp * 1000)
                      .format("YYYY-MM-DD HH:mm:ssZZ")}
                  </div>
                </div>
                <div className="item">
                  <p>{t("Number_of_Transactions")}</p>
                  <div className="values">
                    {transactions && transactions.length}
                  </div>
                </div>
                <div className="item">
                  <p>{t("Transaction_Volume")}</p>
                  <div className="values">
                    {txVolume && formatEther(txVolume)} THE9
                  </div>
                </div>
              </div>
              <div>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <h2>{t("Transactions")}</h2>
                  </Col>
                </Row>
                {transactions && (
                  <div className="table-cont">
                    <Table
                      headerData={[
                        {
                          Seq: "",
                          Trade_id: "",
                          User_Id: "",
                          Type: "",
                          Exchange_Id: "",
                          Amount: "",
                          Timestamp: "",
                        },
                      ]}
                      headData={
                        transactions &&
                        transactions.map((tx: any) => {
                          return {
                            Seq: <>{tx.sequence}</>,
                            Trade_id: <>{tx.trade_id}</>,
                            User_Id: <>{tx.user_id}</>,
                            Type: (
                              <>
                                {t(tx.state === "0" ? "Charge" : "Discharge")}
                              </>
                            ),
                            Exchange_Id: <>{tx.exchange_id}</>,
                            Amount: (
                              <div
                                className={
                                  tx.state === "0" ? "charge" : "discharge"
                                }
                              >
                                {formatEther(BigNumber.from(tx.amount)) +
                                  " THE9"}
                              </div>
                            ),
                            Timestamp: (
                              <>
                                {moment
                                  .utc(tx.timestamp * 1000)
                                  .format("YYYY-MM-DD HH:mm:ssZZ")}
                              </>
                            ),
                          };
                        })
                      }
                      currentPage={currentPage}
                      pageCount={pageCount}
                      loading={loading}
                      pageChange={(p: number) => setCurrentPage(p)}
                      showRecord={showRecord}
                      props={props}
                      data={transactions}
                      fileName={"Validators List.csv"}
                      numberOfRecordShow={(Record: number) => {
                        setShowRecords(Record);
                        setCurrentPage(1);
                      }}
                      onClick={handlerTxClick}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default BlockDetails;
