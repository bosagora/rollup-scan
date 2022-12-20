import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { RouterPathEnum } from "global/routes/RouterPathEnum";
import { useDispatch, useSelector } from "react-redux";
import { pageChange } from "store/pagination/thunks";
import { searchDataUpdater } from "store/header/thunks";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { useTranslation, withTranslation } from "react-i18next";
import moment from "moment";
import CopyAddressClipboard from "components/CopyAddressClipboard/CopyAddressClipboard";
import Loader from "components/Loader/Loader";
import { Amount } from "global/config/config";
import request from "../../../global/api/request";
import endpoints from "../../../global/config/urlconfigs";
import PageHelmet from "../../../components/PageHelmet/PageHelmet";
import GenericSearchBar from "../../../components/GenericSearchBar/GenericSearchBar";
import Table from "../../../components/Table/Table";
import Button from "../../../components/Button/Button";
import { getPretty } from "../../../global/utils/CalcUtils";

const BlockDetails: React.FC = (props: any) => {
  // All states for current screen
  const dispatch = useDispatch();
  const [showRecord, setTotalRecords] = useState<any>(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [CSVData, setCSVData] = useState([]);
  const [validators, setValidators] = useState([]);
  const [allData, setAllData] = useState<any>({});
  const [openValidators, setOpenValidators] = useState(false);
  // const allData: any = useSelector((state: any) => state.header.singleBlock)
  const searchedData = useSelector((state: any) => state.header.searchedData);

  const validatorsSection = React.useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  // if (
  //   props.location.state &&
  //   props.location.state.validatorsSection &&
  //   validatorsSection.current
  // ) {
  //   validatorsSection.current.scrollIntoView({ behavior: "smooth" });
  // }

  // Get single block detail API call
  const getBlockData = () => {
    // if (type === "hash") {
    //   setLoading(true);
    // request("GET", `${endpoints.blockDetails}?hash=${hash}`, {})
    //   .then((res: any) => {
    //     setAllData(res.data);
    //     setLoading(false);
    //   })
    //   .catch((error: any) => {
    //     setLoading(false);
    //     return error;
    //   });
    // dispatch(singleBlockDetailsfromHash(hash))
    // }
    // if (type === "height") {
    //   setLoading(true);
    // request("GET", `${endpoints.blockDetails}?height=${hash}`, {})
    //   .then((res: any) => {
    //     setAllData(res.data);
    //     setLoading(false);
    //   })
    //   .catch((error: any) => {
    //     setLoading(false);
    //     return error;
    //   });
    // dispatch(singleBlockDetailsfromHeight(hash))
    // }
  };

  // const pagination = useSelector((state: any) => state.pagination);

  // Show number of records in list function
  const numberOfRecordShow = (Record: Number) => {
    //   setTotalRecords(Record);
    //   setCurrentPage(1);
  };

  // useEffect(() => {
  //   setCurrentPage(pagination.pageNumber);
  // }, [pagination.pageNumber]);

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
                  {/* Single Block Summary section  */}
                  <div className="block-detail">
                    <div className="block-hash">
                      <div className="item">
                        <p>{t("Block_Hash")}</p>
                        <div className="hash-copy copy-address">
                          {allData.hash ? (
                              <>
                                <div className="address no_cursor">
                                  {allData.hash}
                                </div>
                                <CopyAddressClipboard
                                    id={allData.hash}
                                    text={allData.hash}
                                />
                              </>
                          ) : (
                              ""
                              // <Loader />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="block-hash">
                      <div className="item">
                        <p>{t("Previous_Block_Hash")}</p>
                        <div className="hash-copy copy-address">
                          {allData.prev_hash ? (
                              <>
                                <div
                                    onClick={() => blockDetails(allData.prev_hash)}
                                    className="link-color address"
                                >
                                  {allData.prev_hash}
                                </div>
                                <CopyAddressClipboard
                                    id={allData.prev_hash}
                                    text={allData.prev_hash}
                                />
                              </>
                          ) : (
                              ""
                              // <Loader />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="more-detail">
                    <div className="item">
                      <p>{t("Merkle_Root")}</p>
                      <div className="values">
                        <div className="copy-address max_address">
                          {allData.merkle_root ? (
                              <>
                                <>
                                  {allData.merkle_root && (
                                      <>
                                        {allData.merkle_root.slice(0, 6) +
                                            `…` +
                                            allData.merkle_root.slice(-1 * 6)}
                                      </>
                                  )}
                                </>
                                <CopyAddressClipboard
                                    id="allDataMerkleRoot"
                                    text={allData.merkle_root}
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
                      <p>{t("Signature")}</p>
                      <div className="values">
                        <div className="copy-address max_address">
                          {allData.signature ? (
                              <>
                                <>
                                  {allData.signature && (
                                      <>
                                        {allData.signature.slice(0, 6) +
                                            `…` +
                                            allData.signature.slice(-1 * 6)}
                                      </>
                                  )}
                                </>
                                <CopyAddressClipboard
                                    id={allData.signature}
                                    text={allData.signature}
                                />
                              </>
                          ) : (
                              ""
                              // <Loader />
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div className="item">
                  <p>{t('Random_Seed')}</p>
                  <div className="values">
                    <div className="copy-address max_address">
                      {allData.random_seed ? (
                        <>
                          <>
                            {allData.random_seed && (
                              <>
                                {allData.random_seed.slice(0, 6) +
                                  `…` +
                                  allData.random_seed.slice(-1 * 6)}
                              </>
                            )}
                          </>
                          <CopyAddressClipboard id={allData.random_seed} text={allData.random_seed} />
                        </>
                      ) : (
                        ""
                        // <Loader />
                      )}
                    </div>
                  </div>
                </div> */}
                    <div className="item">
                      <p>{t("Timestamp")}</p>
                      <div className="values">
                        {moment
                            .utc(allData.time * 1000)
                            .format("YYYY-MM-DD HH:mm:ss")}{" "}
                        UTC
                        {/* {moment(allData.time * 1000).fromNow()} &nbsp;&nbsp;{' '}
                    {moment(allData.time * 1000).format('ll HH:mm:ss')} */}
                      </div>
                    </div>
                    <div className="item">
                      <p>{t("Block_Size")}</p>
                      <div className="values">
                        {getPretty(allData.total_size)} {t("Bytes")}
                      </div>
                    </div>
                    <div className="item">
                      <p>{t("Total_Reward")}</p>
                      <div className="values">
                        {allData.total_reward &&
                            getPretty(Amount(allData.total_reward))}{" "}
                        BOA
                      </div>
                    </div>
                    {/*<div className="item">*/}
                    {/*  <p>{t('Version')}</p>*/}
                    {/*  <div className="values">{allData.version}</div>*/}
                    {/*</div>*/}
                    <div className="item">
                      <p>{t("Number_of_Transactions")}</p>
                      <div className="values">
                        {getPretty(allData.total_transactions)}
                      </div>
                    </div>
                    <div className="item">
                      <p>{t("Transaction_Volume")}</p>
                      <div className="values">
                        {allData.tx_volume && getPretty(Amount(allData.tx_volume))}{" "}
                        BOA
                      </div>
                    </div>
                    <div className="item">
                      <p>{t("Total_Fees")}</p>
                      <div className="values">
                        {allData.total_fee && getPretty(Amount(allData.total_fee))}{" "}
                        BOA
                      </div>
                    </div>
                    <div className="item">
                      <p>{t("Total_Received")}</p>
                      <div className="values">
                        {allData.total_received &&
                            getPretty(Amount(allData.total_received))}{" "}
                        BOA
                      </div>
                    </div>
                    <div className="item">
                      <p>{t("Total_Sent")}</p>
                      <div className="values">
                        {allData.total_sent &&
                            getPretty(Amount(allData.total_sent))}{" "}
                        BOA
                      </div>
                    </div>
                  </div>
                  {/* Validators list section  */}
                  <div className="validators" ref={validatorsSection}>
                    <div className="header">
                      <h2>{t("Validators")}</h2>
                      <Button
                          onClick={() => setOpenValidators(!openValidators)}
                          aria-controls="example-fade-text"
                          aria-expanded={openValidators}
                      >
                        {openValidators ? (
                            <>
                              {t("Hide_List")}
                              <FaSortDown className="down" />
                            </>
                        ) : (
                            <>
                              {t("Show_List")} <FaSortUp className="up" />
                            </>
                        )}
                      </Button>
                    </div>
                    {openValidators && (
                        <div className="table-cont">
                          <Table
                              headerData={[
                                {
                                  UTXO_Key: "",
                                  Public_Key: "",
                                  Preimage_Height: "",
                                  Preimage_Hash: "",
                                  Slashing: "",
                                  Signed: "",
                                },
                              ]}
                              headData={
                                  validators &&
                                  validators.map((validators: any, index: number) => {
                                    return {
                                      UTXO_Key: (
                                          <div className="copy-address max_address">
                                            <div
                                                onClick={() =>
                                                    transactionOverview(validators.utxo_key)
                                                }
                                                className="link-color"
                                            >
                                              {validators.utxo_key.slice(0, 6) +
                                                  `…` +
                                                  validators.utxo_key.slice(-1 * 6)}
                                            </div>
                                            <CopyAddressClipboard
                                                text={validators.utxo_key}
                                                id={validators.utxo_key}
                                            />
                                          </div>
                                      ),
                                      Public_Key: (
                                          <div className="copy-address max_address">
                                            <div
                                                className="link-color"
                                                onClick={() =>
                                                    nodeDetails(validators.address)
                                                }
                                            >
                                              {validators.address.slice(0, 6) +
                                                  `…` +
                                                  validators.address.slice(-1 * 6)}
                                            </div>
                                            <CopyAddressClipboard
                                                text={validators.address}
                                                id={validators.address}
                                            />
                                          </div>
                                      ),
                                      Preimage_Height: (
                                          <>{getPretty(validators.pre_image.height)}</>
                                      ),
                                      Preimage_Hash: (
                                          <>
                                            {validators.pre_image.hash.slice(0, 6) +
                                                `…` +
                                                validators.pre_image.hash.slice(-1 * 6)}
                                          </>
                                      ),
                                      Slashing:
                                          validators.slashed === 0 ? t("No") : t("Yes"),
                                      Signed:
                                          validators.block_signed === 0
                                              ? t("No")
                                              : t("Yes"),
                                    };
                                  })
                              }
                              currentPage={currentPage}
                              pageCount={pageCount}
                              loading={loading}
                              pageChange={(pageNumber: number) =>
                                  dispatch(pageChange(pageNumber))
                              }
                              showRecord={showRecord}
                              props={props}
                              data={validators}
                              CSVData={CSVData}
                              fileName={"Validators List.csv"}
                              numberOfRecordShow={(Record: number) =>
                                  numberOfRecordShow(Record)
                              }
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
  // if (
  //   props.location.state &&
  //   props.location.state.validatorsSection &&
  //   validatorsSection.current
  // ) {
  //   validatorsSection.current.scrollIntoView({ behavior: "smooth" });
  // }
    // if (type === "hash") {
    //   setLoading(true);
    // request("GET", `${endpoints.blockDetails}?hash=${hash}`, {})
    //   .then((res: any) => {
    //     setAllData(res.data);
    //     setLoading(false);
    //   })
    //   .catch((error: any) => {
    //     setLoading(false);
    //     return error;
    //   });
    // dispatch(singleBlockDetailsfromHash(hash))
    // }
    // if (type === "height") {
    //   setLoading(true);
    // request("GET", `${endpoints.blockDetails}?height=${hash}`, {})
    //   .then((res: any) => {
    //     setAllData(res.data);
    //     setLoading(false);
    //   })
    //   .catch((error: any) => {
    //     setLoading(false);
    //     return error;
    //   });
    // dispatch(singleBlockDetailsfromHeight(hash))
    // }
  // const pagination = useSelector((state: any) => state.pagination);
    //   setTotalRecords(Record);
    //   setCurrentPage(1);
  // useEffect(() => {
  //   setCurrentPage(pagination.pageNumber);
  // }, [pagination.pageNumber]);
    //   props.history.push(`${RouterPathEnum.NODE_DETAILS}/${address}`);
    //   props.history.push(`${RouterPathEnum.BLOCKS_DETAILS}/hash:${hash}`);
    //   props.history.push(`${RouterPathEnum.TRANSACTION_OVERVIEW}/${utxoKey}`, {
    //     utxoKey: true,
    //   });
export default BlockDetails;
