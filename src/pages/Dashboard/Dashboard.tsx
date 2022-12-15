import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import height from "assets/images/height.svg";
import transactionIcon from "assets/images/transaction.svg";
import circulate from "assets/images/circulate.svg";
import { ReactSVG } from "react-svg";
import { useTranslation, withTranslation } from "react-i18next";
import { searchDataUpdater } from "store/header/thunks";
import "moment/locale/ko";
import { getPretty } from "../../global/utils/CalcUtils";
import BlocksBox from "../../components/Dashboard/Blocks";
import TransactionBox from "../../components/Dashboard/TransactionBox";
import PageHelmet from "../../components/PageHelmet/PageHelmet";
import SearchBar from "../../components/SearchBar/SearchBar";

import RollupAbi from "global/contracts/abis/RollUp.json";
import { Contract, utils } from "ethers";
import { useContractFunction } from "@usedapp/core";

const rollupAddress = process.env.REACT_APP_ROLLUP_CONTRACT_ADDRESS || "";
console.log(rollupAddress);
// const rollupInterface = new utils.Interface(RollupAbi.abi);
// const rollup = new Contract(rollupAddress, rollupInterface);

const Dashboard: React.FC = () => {
  // states for current screen
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchedData = useSelector((state: any) => state.header.searchedData);

  const [blockLoading, setBlockLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);

  const [stats, setStats] = useState<any>("0");
  const [currentTime] = useState(new Date());
  const [blocksData] = useState<any>([]);
  const [transactionsData] = useState<any>([]);
  // const { state, send } = useContractFunction(rollup, "");

  useEffect(() => {
    console.log("DASHBOARD INIT");
    setBlockLoading(false);
    setTransactionLoading(false);
    setStats({});
  }, [dispatch]);

  const getLatestHeightTime = (time: any) => {
    let t1 = currentTime;
    let t2 = new Date(time * 1000);
    let dif = (t1.getTime() - t2.getTime()) / 1000;

    let d = Math.floor(dif / (3600 * 24));
    let h = Math.floor((dif % (3600 * 24)) / 3600);
    let m = Math.floor((dif % 3600) / 60);
    let s = Math.floor(dif % 60);

    let dDisplay = d > 0 ? d + (d === 1 ? t("Day") : t("Days")) : " ";
    let hDisplay = h > 0 ? h + (h === 1 ? t("Hour") : t("Hours")) : " ";
    let mDisplay = m > 0 ? m + (m === 1 ? t("Min") : t("Mins")) : " ";
    let sDisplay =
      s > 0 ? s + (s === 1 ? t("Sec") : t("Secs")) : "0" + t("Sec");
    return (
      t("Last") + " " + dDisplay + hDisplay + mDisplay + sDisplay + t("Ago")
    );
  };

  return (
    <div id="dashboard">
      <PageHelmet
        title={`The9 Rollup Explorer - Dashboard`}
        meta={{ name: "Dashboard", content: "Lorem Ipsum" }}
      />
      <div className="dashboard-top">
        <div className="bg" />
        <Container fluid="xl">
          <Row>
            <Col xl={12} lg={12}>
              <h1>{t("the_9_rollup_explorer")}</h1>
              <SearchBar
                searchedDataGet={(searchId: any) =>
                  dispatch(searchDataUpdater(searchId))
                }
                searchedData={searchedData}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="dashboard">
        <Container fluid="xl">
          <div className="d-lg">
            <div className="market-values">
              <Card>
                <div className="head">
                  <div className="title">
                    <ReactSVG src={height} />
                    <p>{t("Block_height")}</p>
                  </div>
                </div>
                <div className="values">
                  <h4>{stats?.height && getPretty(stats.height)}</h4>
                  <p>
                    {getLatestHeightTime(stats?.time_stamp && stats.time_stamp)}
                  </p>
                </div>
              </Card>
              <Card>
                <div className="head">
                  <div className="title">
                    <ReactSVG src={transactionIcon} />
                    <p>{t("Transactions")}</p>
                  </div>
                </div>
                <div className="values">
                  <h4>
                    {stats?.transactions && getPretty(stats.transactions)}
                  </h4>
                  <p>{t("Total")}</p>
                </div>
              </Card>
              <Card>
                <div className="head">
                  <div className="title" style={{ cursor: "unset" }}>
                    <ReactSVG src={circulate} />
                    <p>{t("Block_Time")}</p>
                  </div>
                </div>
                <div className="values">
                  <h4>{stats?.block_time && getPretty(stats.block_time)}</h4>
                  <p>ms</p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
        <Container fluid="xl">
          <div className="bt-container">
            {/* Top Blocks section */}
            <BlocksBox data={blocksData} isLoading={blockLoading} />
            {/* Top Transactions section */}
            <TransactionBox
              data={transactionsData}
              isLoading={transactionLoading}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default withTranslation()(Dashboard);
