import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
// import { ReactSVG } from 'react-svg'
import { useDispatch, useSelector } from "react-redux";
import { RouterPathEnum } from "global/routes/RouterPathEnum";
import { pageChange } from "store/pagination/thunks";
import { searchDataUpdater } from "store/header/thunks";
// import from 'components/GenericSearchBar/GenericSearchBar'
// import copy from 'images/copy.svg'
import moment from "moment";
import { useTranslation } from "react-i18next";
import endpoints from "../../global/config/urlconfigs";
import request from "../../global/api/request";
import CopyAddressClipboard from "components/CopyAddressClipboard/CopyAddressClipboard";
import PageHelmet from "../../components/PageHelmet/PageHelmet";
import GenericSearchBar from "../../components/GenericSearchBar/GenericSearchBar";
import Table from "../../components/Table/Table";

const bigDecimal = require("js-big-decimal");

// import { login } from "../../store/auth/thunks";
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

const Blocks: React.FC = (props: any) => {
  // All states for current screen
  const dispatch = useDispatch(),
    [showRecord, setTotalRecords] = useState<any>(20),
    [currentPage, setCurrentPage] = useState(1),
    [pageCount, setPageCount] = useState(0),
    [blocksData, setBlocksData] = useState<any>([]),
    [blocks, setBlocks] = useState<any>([]),
    [CSVData, setCSVData] = useState([]),
    [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  //redux states
  const searchedData = useSelector((state: any) => state.header.searchedData);
  const pagination = useSelector((state: any) => state.pagination);

  const getPretty = (val: any) => {
    let value = bigDecimal.getPrettyValue(val);
    return value;
  };

  // const blocksDataPaginated = useSelector(
  //   (state: any) => state.header.blocksDataPaginated
  // );

  useEffect(() => {
    console.log("Blocks Init");
    //   getlatestBlocks()
  }, []);

  useEffect(() => {
    getlatestBlocks();
  }, [showRecord, currentPage]);

  // Get latest blocks API call
  const getlatestBlocks = () => {
    setLoading(true);
    // request("GET", `${endpoints.latestBlocks}`, {
    //   pageSize: showRecord,
    //   page: currentPage,
    // })
    //   .then((res: any) => {
    //     setBlocksData(res.data);
    //     let CSVData: any = [];
    //     setCSVData([]);
    //     for (let i = 0; i < res.data.length; i++) {
    //       CSVData.push({
    //         Height: getPretty(res.data[i].height),
    //         Hash: res.data[i].hash,
    //         MerkleRoot: res.data[i].merkle_root,
    //         Signature: res.data[i].signature,
    //         Validators: getPretty(res.data[i].validators),
    //         TXCount: getPretty(res.data[i].tx_count),
    //         EnrollmentCount: getPretty(res.data[i].enrollment_count),
    //         Timestamp:
    //           moment
    //             .utc(res.data[i].time_stamp * 1000)
    //             .format("YYYY-MM-DD HH:mm:ss") + " UTC",
    //       });
    //     }
    //     setCSVData(CSVData);
    //     setPageCount(res.data[0].full_count);
    //     setLoading(false);
    //   })
    //   .catch((err: any) => {
    //     setLoading(false);
    //     return err;
    //   });
  };
  // Show number of records in list function
  const numberOfRecordShow = (Record: Number) => {
    setTotalRecords(Record);
    setCurrentPage(1);
  };

  useEffect(() => {
    // const allBlocksonBlocksDetailsGetter = (page: number, limit: number) => {
    //   dispatch(getAllBlocksonBlocksDetails(page, limit))
    // }
    setCurrentPage(pagination.pageNumber);
    // allBlocksonBlocksDetailsGetter(pagination.pageNumber + 1, 11)
  }, [pagination.pageNumber]);

  useEffect(() => {
    if (blocks) {
      let blockNewData = blocks.concat(blocksData);
      setBlocksData(blockNewData);
      if (blockNewData.length > showRecord) {
        blockNewData.pop();
      }
    }
  }, [blocks]);

  const blockDetails = (hash: string, type: string) => {
    if (type === "hash") {
      props.history.push(`${RouterPathEnum.BLOCKS_DETAILS}/hash:${hash}`);
    } else {
      props.history.push(`${RouterPathEnum.BLOCKS_DETAILS}/height:${hash}`);
    }
  };

  return (
    <div className="page-container">
      <div id="blocks">
        <PageHelmet
          title={`THE9 Explorer - ${props.title}`}
          meta={{ name: "Blocks", content: "THE9 Explorer - Blocks" }}
        />
        <Container fluid="xl">
          <Row>
            <Col lg={12} md={12} sm={12}>
              {/* Blocks Top section  */}
              <div className="top-header2">
                <div className="left"></div>
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
          <Row>
            <Col lg={12} md={12} sm={12}>
              <h2>{t(props.title)}</h2>
            </Col>
          </Row>
          {/* All Blocks list  */}
          <Table
            headerData={[
              {
                Height: "",
                Hash: "",
                Merkle_Root: "",
                Signature: "",
                Validators: "",
                TX_Count: "",
                Enrollment_Count: "",
                Timestamp: "",
              },
            ]}
            headData={
              blocksData.length !== 0 &&
              blocksData.map((block: any, index: number) => {
                return {
                  Height: (
                    <div
                      onClick={() => blockDetails(block.height, "height")}
                      className="link-color"
                    >
                      {getPretty(block.height)}
                    </div>
                  ),
                  Hash: (
                    <div className="copy-address max_address">
                      <div
                        onClick={() => blockDetails(block.hash, "hash")}
                        className="link-color"
                      >
                        {block.hash.slice(0, 6) +
                          `…` +
                          block.hash.slice(-1 * 6)}
                      </div>
                      <CopyAddressClipboard id={index} text={block.hash} />
                    </div>
                  ),
                  Merkle_Root: (
                    <>
                      {block.merkle_root.slice(0, 6) +
                        `…` +
                        block.merkle_root.slice(-1 * 6)}
                    </>
                  ),
                  Signature: (
                    <>
                      {block.signature.slice(0, 6) +
                        `…` +
                        block.signature.slice(-1 * 6)}
                    </>
                  ),

                  Validators: getPretty(block.validators),
                  TX_Count: getPretty(block.tx_count),
                  Enrollment_Count: getPretty(block.enrollment_count),
                  Timestamp:
                    moment
                      .utc(block.time_stamp * 1000)
                      .format("YYYY-MM-DD HH:mm:ss") + " UTC",
                };
              })
            }
            loading={loading}
            currentPage={currentPage}
            pageCount={pageCount}
            props={props}
            data={blocksData}
            fileName={"Blocks List.csv"}
            pageChange={(pageNumber: number) =>
              dispatch(pageChange(pageNumber))
            }
            showRecord={showRecord}
            CSVData={CSVData}
            numberOfRecordShow={(Record: number) => numberOfRecordShow(Record)}
          />
        </Container>
      </div>
    </div>
  );
};

export default Blocks;
