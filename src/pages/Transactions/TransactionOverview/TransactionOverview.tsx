import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchDataUpdater } from "store/header/thunks";
import { GoArrowRight } from "react-icons/go";
import { RouterPathEnum } from "global/routes/RouterPathEnum";
import moment from "moment";
import { useTranslation, withTranslation } from "react-i18next";
import CopyAddressClipboard from "components/CopyAddressClipboard/CopyAddressClipboard";
import Loader from "components/Loader/Loader";
import { Amount } from "global/config/config";
import { getPretty, getPriceOfFee } from "global/utils/CalcUtils";
import PageHelmet from "../../../components/PageHelmet/PageHelmet";
import TooltipComp from "../../../components/TooltipComp/TooltipComp";
import GenericSearchBar from "../../../components/GenericSearchBar/GenericSearchBar";

interface MarketCapStats {
  last_updated_at: any;
  market_cap: number;
  change_24h: number;
  price: number;
  time: any;
  vol_24h: number;
}

const TransactionOverview: React.FC = (props: any) => {
  // All states for current screen
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState<any>([]);
  const searchedData = useSelector((state: any) => state.header.searchedData);
  const hash = props.match.params["hash"];
  const marketCapStats: MarketCapStats = useSelector(
    (state: any) => state.header.marketCapStats
  );
  const { t } = useTranslation();

  const getTransactionData = (hash: string) => {
    // request("GET", `${endpoints.transactionDetails}/${hash}`, {})
    //   .then((res: any) => {
    //     setAllData(res.data);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };

  // Get single Transaction details
  useEffect(() => {
    setLoading(true);
    if (props.location.state && props.location.state.utxoKey) {
      // request("GET", `${endpoints.txhash}/${hash}`, {})
      //   .then((res: any) => {
      //     getTransactionData(res.data);
      //   })
      //   .catch(() => {
      //     setLoading(false);
      //   });
    } else {
      // request("GET", `${endpoints.pendingTransactionOverview}/${hash}`, {})
      //   .then((res: any) => {
      //     if (res.data.length !== 0) {
      //       setAllData(res.data);
      //       setLoading(false);
      //     } else {
      //       getTransactionData(hash);
      //     }
      //   })
      //   .catch(() => {
      //     setLoading(false);
      //   });
    }
  }, [hash]);

  const getOutputTotal = () => {
    let sum: any = 0;
    if (allData.receivers) {
      for (let i = 0; i < allData.receivers.length; i++) {
        sum = sum + allData.receivers[i].amount;
      }
      return parseFloat(Amount(sum)).toLocaleString("en-US", {
        maximumFractionDigits: 7,
        minimumFractionDigits: 7,
      });
    } else {
      return sum;
    }
  };

  const getInputTotal = () => {
    let sum: any = 0;
    if (allData.senders) {
      for (let i = 0; i < allData.senders.length; i++) {
        sum = sum + allData.senders[i].amount;
      }
      return parseFloat(Amount(sum)).toLocaleString("en-US", {
        maximumFractionDigits: 7,
        minimumFractionDigits: 7,
      });
    } else {
      return sum;
    }
  };

  const nodeDetails = (address: any) => {
    props.history.push(`${RouterPathEnum.NODE_DETAILS}/${address}`);
  };

  const transactionOverview = (utxoKey: string) => {
    props.history.push(`${RouterPathEnum.TRANSACTION_OVERVIEW}/${utxoKey}`, {
      utxoKey: true,
    });
  };

  return (
    <div className="page-container">
      <div id="transaction-overview">
        <PageHelmet
          title={`THE9 Explorer - ${props.title}`}
          meta={{ name: "Blocks", content: "Lorem Ipsum" }}
        />
        <Container fluid="xl">
          <Row>
            <Col lg={12} md={12} sm={12}>
              {/* Transaction Overview Top section  */}
              <div className="top-header">
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
              <h2>{t("Transaction_Overview")}</h2>
            </Col>
          </Row>
          {loading ? (
            <div className="no_record">
              <Loader />
            </div>
          ) : allData.length === 0 ? (
            <div className="no_record">
              <h2>{t("NoRecord")}</h2>
            </div>
          ) : (
            <>
              {/* Transaction Overview Section  */}
              <div className="block-detail">
                <div className="block-hash">
                  <p>{t("Hash")}</p>
                  <div className="hash-copy copy-address">
                    {allData.tx_hash ? (
                      <>
                        <div className="address no_cursor">
                          {allData.tx_hash}
                        </div>
                        <CopyAddressClipboard
                          id={allData.tx_hash}
                          text={allData.tx_hash}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              {/* Input/Output Transaction Desktop view */}
              <div className="d-lg">
                <div className="io-container">
                  <div className="input">
                    <p>{t("Inputs")}</p>
                    <div className="link-color address_list">
                      {allData.senders === undefined ||
                      allData.senders.length === 0
                        ? t("No_Inputs")
                        : allData.senders.map((res: any, index: any) => (
                            <div key={index}>
                              <span
                                onClick={() => nodeDetails(res.address)}
                                key={index}
                                className="address"
                              >
                                {res.address}
                              </span>
                              <p className="amount">
                                {t("Amount")}:{" "}
                                {parseFloat(Amount(res.amount)).toLocaleString(
                                  "en-US",
                                  {
                                    maximumFractionDigits: 7,
                                    minimumFractionDigits: 7,
                                  }
                                )}{" "}
                                BOA
                              </p>
                            </div>
                          ))}
                    </div>
                    <div className="total-bal">
                      <span>
                        {t("Total2")}: {getInputTotal()} BOA
                      </span>
                    </div>
                    <div className="fee">
                      <p>
                        {t("Fee")}:{" "}
                        <span>
                          {allData.fee
                            ? getPretty(Amount(allData.fee))
                            : getPretty(allData.fee)}{" "}
                          BOA ({t("ChangeCurrency")}{" "}
                          {getPriceOfFee(allData.fee, marketCapStats.price)})
                        </span>
                      </p>
                      <p className="fee">
                        {t("Size")}:&nbsp;
                        <span>
                          {getPretty(allData.tx_size)} {t("Bytes")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="transit">
                    <GoArrowRight />
                  </div>
                  <div className="output">
                    <div className="title-date">
                      <p>{t("Outputs")}</p>
                      <p>
                        {moment
                          .utc(allData.time * 1000)
                          .format("YYYY-MM-DD HH:mm:ss")}{" "}
                        UTC
                      </p>
                    </div>
                    <div className="address_list">
                      {allData.receivers === undefined ||
                      allData.receivers.length === 0
                        ? t("No_Outputs")
                        : allData.receivers.map(
                            (receiver: any, index: number) => {
                              return (
                                <div key={index}>
                                  <span
                                    onClick={() =>
                                      nodeDetails(receiver.address)
                                    }
                                    className="link-color address"
                                  >
                                    {receiver.address}
                                  </span>
                                  <p className="amount">
                                    {t("Amount")}:{" "}
                                    {parseFloat(
                                      Amount(receiver.amount)
                                    ).toLocaleString("en-US", {
                                      maximumFractionDigits: 7,
                                      minimumFractionDigits: 7,
                                    })}{" "}
                                    BOA
                                  </p>
                                </div>
                              );
                            }
                          )}
                    </div>
                    <div className="total-bal">
                      <span>
                        {t("Total2")}: {getOutputTotal()} BOA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Input/Output Transaction Mobile Responsive view */}
              <div className="d-sm">
                <div className="more-detail">
                  <div className="item">
                    <p>{t("Date")}</p>
                    <div className="values">
                      {moment
                        .utc(allData.time * 1000)
                        .format("YYYY-MM-DD HH:mm:ss")}{" "}
                      UTC
                    </div>
                  </div>
                  <div className="item">
                    <p>{t("Inputs")}</p>
                    <div className="values">
                      <div className="address_list">
                        {allData.senders === undefined ||
                        allData.senders.length === 0
                          ? t("No_Outputs")
                          : allData.senders.map((res: any, index: number) => {
                              return (
                                <div className="brdr" key={index}>
                                  <span
                                    onClick={() => nodeDetails(res.address)}
                                    className="link-color address"
                                  >
                                    {res.address}
                                  </span>
                                  <div className="amount">
                                    <p>{t("Amount")}:</p>
                                    <p>
                                      {parseFloat(
                                        Amount(res.amount)
                                      ).toLocaleString("en-US", {
                                        maximumFractionDigits: 7,
                                        minimumFractionDigits: 7,
                                      })}{" "}
                                      BOA
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                      </div>
                      <div className="total-bal">
                        <span>{getInputTotal()} BOA</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <p>{t("Outputs")}</p>
                    <div className="values">
                      <div className="address_list">
                        {allData.receivers === undefined ||
                        allData.receivers.length === 0
                          ? t("No_Outputs")
                          : allData.receivers.map(
                              (receiver: any, index: number) => {
                                return (
                                  <div className="brdr" key={index}>
                                    <span
                                      onClick={() =>
                                        nodeDetails(receiver.address)
                                      }
                                      className="link-color address"
                                    >
                                      {receiver.address}
                                    </span>
                                    <div className="amount">
                                      <p>{t("Amount")}:</p>
                                      <p>
                                        {parseFloat(
                                          Amount(receiver.amount)
                                        ).toLocaleString("en-US", {
                                          maximumFractionDigits: 7,
                                          minimumFractionDigits: 7,
                                        })}{" "}
                                        BOA
                                      </p>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                      </div>
                      {/* <div className="brdr">
                    <span className="link-color address">
                      GYIEWGRFUYWEGIFGUYEW8SDGYFIEWGE7IRFWE8SDFfRERKWHERU
                    </span>
                    <p className="amount">
                      {t('Amount')}: 0.1234567890 BOA
                    </p>
                  </div> */}

                      {/* <span className="link-color address">
                    GYIEWGRFUYWEGIFGUYEW8SDGYFIEWGE7IRFWE8SDFfRERKWHERU
                  </span>
                  <p className="amount">
                    {t('Amount')}: 0.1234567890 BOA
                  </p> */}
                      <div className="total-bal">
                        <span>{getOutputTotal()} BOA</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <p>{t("Fee")}</p>
                    <div className="values fees link-color">
                      <span>
                        {allData.fee
                          ? getPretty(Amount(allData.fee))
                          : getPretty(allData.fee)}{" "}
                        BOA
                      </span>
                      <b>
                        {getPretty(allData.tx_size)} {t("Bytes")}
                      </b>
                    </div>
                  </div>
                </div>
              </div>
              <h2>{t("Details")}</h2>
              <div className="more-detail">
                <div className="item">
                  <p>{t("Status")}</p>
                  <div className="values">{t(allData.status)}</div>
                </div>
                <div className="item">
                  <p>{t("Time")}</p>
                  <div className="values">
                    {moment
                      .utc(allData.time * 1000)
                      .format("YYYY-MM-DD HH:mm:ss")}{" "}
                    UTC
                  </div>
                </div>
                <div className="item">
                  <p>{t("Height")}</p>
                  <div className="values">
                    {allData.height
                      ? getPretty(allData.height)
                      : allData.height}
                  </div>
                </div>
                <div className="item">
                  <p>{t("Type")}</p>
                  <div className="values">{t(allData.tx_type)}</div>
                </div>
                <div className="item">
                  <p>{t("Lock_Height")}</p>
                  <div className="values">{getPretty(allData.lock_height)}</div>
                </div>
                <div className="item">
                  <p>{t("Total_Input")}</p>
                  <div className="values">{getInputTotal()} BOA</div>
                </div>
                <div className="item">
                  <p>{t("Total_Output")}</p>
                  <div className="values">{getOutputTotal()} BOA</div>
                </div>
                <div className="item">
                  <p>{t("Data_Fees")}</p>
                  <div className="values">
                    {allData.payload
                      ? allData.dataFee
                        ? getPretty(Amount(allData.dataFee))
                        : getPretty(allData.dataFee)
                      : getPretty(allData.dataFee)}{" "}
                    BOA
                  </div>
                </div>
                <div className="item">
                  <p>{t("Transactions_Fees")}</p>
                  <div className="values">
                    {allData.fee
                      ? getPretty(Amount(allData.fee))
                      : getPretty(allData.fee)}{" "}
                    BOA
                  </div>
                </div>
                <div className="item">
                  <p>{t("Size")}</p>
                  <div className="values">
                    {getPretty(allData.tx_size)} {t("Bytes")}
                  </div>
                </div>
                <div className="item">
                  <p>{t("Payload")}</p>
                  <div className="values">
                    <div className="hash-copy copy-address link-color">
                      {allData.payload ? (
                        <>
                          <span className="address">{allData.payload}</span>
                          <CopyAddressClipboard
                            id="payload"
                            text={allData.payload}
                          />
                        </>
                      ) : (
                        ""
                      )}
                      {/* {(allData.payload === undefined  ||
                    allData.payload.length !== 0) && <ReactSVG src={copy} />} */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Input Details section  */}
              <h2>{t("Inputs")}</h2>
              <div className="io-detail">
                {allData.senders === undefined || allData.senders.length === 0
                  ? t("No_Inputs")
                  : allData.senders.map((sender: any, index: any) => (
                      <Row key={index}>
                        <Col xl={8} lg={8} md={6} sm={12}>
                          <div className="item-list">
                            <div className="item">
                              <p>{t("Index")}</p>
                              <div className="values">{sender.index}</div>
                            </div>
                            <div className="item">
                              <p>{t("UTXO")}</p>
                              <div className="values">
                                {sender.utxo ? (
                                  <div className="copy-address">
                                    <div
                                      onClick={() =>
                                        transactionOverview(sender.utxo)
                                      }
                                      className="link-color"
                                    >
                                      {sender.utxo.slice(0, 6) +
                                        `…` +
                                        sender.utxo.slice(-1 * 6)}
                                    </div>
                                    <CopyAddressClipboard
                                      id={sender.utxo}
                                      text={sender.utxo}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="item">
                              <p>{t("Signature")}</p>

                              <div className="values">
                                {sender.signature ? (
                                  <>
                                    <div className="copy-address">
                                      <div>
                                        {sender.signature.slice(0, 6) +
                                          `…` +
                                          sender.signature.slice(-1 * 6)}
                                      </div>
                                      <CopyAddressClipboard
                                        text={sender.signature}
                                      />
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            </div>
                            <div className="item">
                              <p>{t("Unlock_Age")}</p>
                              <div className="values">
                                {t(sender.unlock_age)}
                              </div>
                            </div>
                            <div className="item">
                              <p>{t("Bytes")}</p>
                              <div className="values">
                                <div className="long_values">
                                  <TooltipComp
                                    id={index + "0"}
                                    limit={88}
                                    bytesText={Buffer.byteLength(sender.bytes)}
                                    text={sender.bytes}
                                  />
                                  <CopyAddressClipboard
                                    id={index + "1"}
                                    text={sender.bytes}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xl={4} lg={4} md={6} sm={12}>
                          <div className="item-list">
                            <div className="item">
                              <p>{t("Address")}</p>
                              <div className="values">
                                <div
                                  onClick={() => nodeDetails(sender.address)}
                                  className="link-color"
                                >
                                  {sender.address.slice(0, 6) +
                                    `…` +
                                    sender.address.slice(-1 * 6)}
                                </div>
                              </div>
                            </div>
                            <div className="item">
                              <p>{t("Amount")}</p>
                              <div className="values">
                                {getPretty(Amount(sender.amount))} BOA
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    ))}
              </div>
              {/* Output details section  */}
              <h2>{t("Outputs")}</h2>
              <div className="io-detail">
                {allData.receivers === undefined ||
                allData.receivers.length === 0
                  ? t("No_Outputs")
                  : allData.receivers.map((reciever: any, index: number) => (
                      <Row key={index}>
                        <Col xl={8} lg={8} md={6} sm={12}>
                          <div className="item-list">
                            <div className="item">
                              <p>{t("Index")}</p>
                              <div className="values">{reciever.index}</div>
                            </div>
                            <div className="item">
                              <p>{t("UTXO")}</p>
                              <div className="values">
                                {reciever.utxo ? (
                                  <div className="copy-address">
                                    <div
                                      onClick={() =>
                                        transactionOverview(reciever.utxo)
                                      }
                                      className="link-color"
                                    >
                                      {reciever.utxo.slice(0, 6) +
                                        `…` +
                                        reciever.utxo.slice(-1 * 6)}
                                    </div>
                                    <CopyAddressClipboard
                                      id={reciever.utxo}
                                      text={reciever.utxo}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            {/* <div className="item">
                          <p>LockType</p>
                          <div className="values">{reciever.lock_type}</div>
                        </div>
                        <div className="item">
                          <p>Bytes</p>
                          <div className="values">
                            <div className="address">{reciever.bytes}</div>
                          </div>
                        </div> */}
                            <div className="item">
                              <p>{t("LockType")}</p>
                              <div className="values">
                                {t(reciever.lock_type)}
                              </div>
                            </div>
                            <div className="item">
                              <p>{t("LockData")}</p>
                              <div className="values">
                                <div className="long_values">
                                  <TooltipComp
                                    id={index + "2"}
                                    limit={44}
                                    bytesText={Buffer.byteLength(
                                      reciever.bytes
                                    )}
                                    text={reciever.bytes}
                                  />
                                  <CopyAddressClipboard
                                    id={index + "3"}
                                    text={reciever.bytes}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xl={4} lg={4} md={6} sm={12}>
                          <div className="item-list">
                            {/* <div className="item">
                        <p>{t('Details')}</p>
                        <div className="values">
                          {t('Unspent')}
                        </div>
                      </div> */}
                            <div className="item">
                              <p>{t("Type")}</p>
                              <div className="values">
                                {reciever.type === 0
                                  ? t("Payment")
                                  : reciever.type === 1
                                  ? t("Freeze")
                                  : reciever.type === 2
                                  ? t("Coinbase")
                                  : reciever.type}
                              </div>
                            </div>
                            <div className="item">
                              <p>{t("Address")}</p>
                              <div className="values">
                                <div
                                  onClick={() => nodeDetails(reciever.address)}
                                  className="link-color"
                                >
                                  {reciever.address.slice(0, 6) +
                                    `…` +
                                    reciever.address.slice(-1 * 6)}
                                </div>
                              </div>
                            </div>
                            <div className="item">
                              <p>{t("Amount")}</p>
                              <div className="values">
                                {getPretty(Amount(reciever.amount))} BOA
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    ))}
              </div>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default withTranslation()(TransactionOverview);
