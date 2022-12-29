import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";
import CopyAddressClipboard from "components/CopyAddressClipboard/CopyAddressClipboard";
import Loader from "components/Loader/Loader";
import request, { IPSF_Url } from "../../../global/api/request";
import PageHelmet from "../../../components/PageHelmet/PageHelmet";
import GenericSearchBar from "../../../components/GenericSearchBar/GenericSearchBar";
import Table from "../../../components/Table/Table";
import { useByHash, useByHeight } from "../../../hooks/useRollup";
import { Block } from "rollup-pm-sdk";
import _ from "lodash";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import TransactionDetails from "./TransactionDetails";
import { useNavigate, useParams } from "react-router-dom";
import { RouterPathEnum } from "../../../global/routes/RouterPathEnum";
import { BlockHeader } from "../../../global/Types";

enum SEARCH_TYPE {
  HEIGHT,
  HASH,
}
const BlockDetails: React.FC = (props: any) => {
  // All states for current screen
  const { t } = useTranslation();
  const { height } = useParams();
  const navigate = useNavigate();

  const [showRecord, setShowRecords] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState<BlockHeader>(null);

  const [txLoading, setTxLoading] = useState(true);
  const [totalTransactions, setTotalTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [txVolume, setTxVolume] = useState(BigNumber.from(0));
  const [selectTx, setSelectTx] = useState(null);

  const [searchType, setSearchType] = useState<SEARCH_TYPE | null>(null);
  const blockHeight = useSelector((state: any) => state.header.blockHeight);

  const [currentHeight, setCurrentHeight] = useState<number>(Number.NaN);
  const {
    blockHeader: blockHeaderByHeight,
    blockHeaderError: headerErrorByHeight,
  } = useByHeight(currentHeight);
  const [currentHash, setCurrentHash] = useState<any>(null);
  const {
    blockHeader: blockHeaderByHash,
    blockHeaderError: headerErrorByHash,
  } = useByHash(currentHash);

  useEffect(() => {
    if (blockHeaderByHash) {
      setAllData(blockHeaderByHash);
      setLoading(false);
    }
  }, [blockHeaderByHash]);

  useEffect(() => {
    if (blockHeaderByHeight) {
      setAllData(blockHeaderByHeight);
      setLoading(false);
    }
  }, [blockHeaderByHeight]);

  useEffect(() => {
    if (_.isEmpty(height) && blockHeight) {
      navigate(`${RouterPathEnum.BLOCKS_DETAILS}/${blockHeight}`);
    } else {
      setCurrentHeight(Number(height));
      setSearchType(SEARCH_TYPE.HEIGHT);
    }
  }, []);

  useEffect(() => {
    if (height) {
      if (height.match("0x")) {
        setCurrentHash(height);
        setSearchType(SEARCH_TYPE.HASH);
      } else if (Number(height)) {
        setCurrentHeight(Number(height));
        setSearchType(SEARCH_TYPE.HEIGHT);
      }
    } else {
      if (blockHeight)
        navigate(`${RouterPathEnum.BLOCKS_DETAILS}/${blockHeight}`);
    }
  }, [height]);

  useEffect(() => {
    if (!blockHeight) return;
    if (_.isEmpty(height)) {
      navigate(`${RouterPathEnum.BLOCKS_DETAILS}/${blockHeight}`);
    }
  }, [blockHeight]);

  useEffect(() => {
    if (searchType === SEARCH_TYPE.HEIGHT && headerErrorByHeight) {
      setLoading(false);
      setAllData(null);
    } else if (searchType === SEARCH_TYPE.HASH && headerErrorByHash) {
      setLoading(false);
      setAllData(null);
    }
  }, [headerErrorByHeight, headerErrorByHash]);

  useEffect(() => {
    if (!allData) return;
    setTxLoading(true);
    request("GET", allData.CID, {})
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
        setTxLoading(false);
      })
      .catch((e) => {
        setTxLoading(false);
      });
  }, [allData]);

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
    const seq = e.Seq.props.children;
    setSelectTx(
      _.find(totalTransactions, (t) => {
        return t.sequence === seq;
      })
    );
  };

  const handlerOnClickBlock = (hash: string) => {
    navigate(`${RouterPathEnum.BLOCKS_DETAILS}/${hash}`);
  };

  return (
    <div className="page-container">
      <div id="block-details">
        <PageHelmet
          title={`THE9 Explorer - ${props.title} ${allData?.height}`}
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
                <div className="left"></div>
                <div className="right">
                  <GenericSearchBar />
                </div>
              </div>
            </Col>
          </Row>
          {loading ? (
            <div className="no_record">
              <Loader />
            </div>
          ) : (
            (allData && (
              <>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <h2>
                      {t("Block")}{" "}
                      {allData.height ? <>#{allData.height}</> : ""}
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
                            <div
                              onClick={() =>
                                handlerOnClickBlock(allData.prevBlock)
                              }
                              className="link-color address"
                            >
                              {allData.prevBlock}
                            </div>
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
                        {allData.CID && (
                          <>
                            <a
                              target="_blank"
                              href={IPSF_Url + allData.CID}
                              rel="noreferrer"
                            >
                              {IPSF_Url + allData.CID}
                            </a>
                            <CopyAddressClipboard
                              id={allData.CID}
                              text={IPSF_Url + allData.CID}
                            />
                          </>
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

                {selectTx ? (
                  <TransactionDetails
                    tx={selectTx}
                    goBack={() => {
                      setSelectTx(null);
                    }}
                  />
                ) : (
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
                                    {t(
                                      tx.state === "0" ? "Charge" : "Discharge"
                                    )}
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
                          loading={txLoading}
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
                )}
              </>
            )) ?? (
              <div
                className="no_record
            "
              >
                <h2>{t("Invalid_block")}</h2>
              </div>
            )
          )}
        </Container>
      </div>
    </div>
  );
};

export default BlockDetails;
