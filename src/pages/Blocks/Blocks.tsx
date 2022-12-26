import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { RouterPathEnum } from "global/routes/RouterPathEnum";
import { pageChange } from "store/pagination/thunks";
import { searchDataUpdater } from "store/header/thunks";
import moment from "moment";
import { useTranslation } from "react-i18next";
import CopyAddressClipboard from "components/CopyAddressClipboard/CopyAddressClipboard";
import PageHelmet from "../../components/PageHelmet/PageHelmet";
import GenericSearchBar from "../../components/GenericSearchBar/GenericSearchBar";
import Table from "../../components/Table/Table";
import { getPretty, hashPretty } from "../../global/utils/CalcUtils";
import { useByFromHeight } from "../../hooks/useRollup";
import { useNavigate } from "react-router-dom";

const Blocks: React.FC = (props: any) => {
  // All states for current screen
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showRecord, setTotalRecords] = useState<any>(10);

  const [pageCount, setPageCount] = useState(1);
  const [blocksData, setBlocksData] = useState<any>([]);
  // const [blocks, setBlocks] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  //redux states
  const blockHeight = useSelector((state: any) => state.header.blockHeight);
  const searchedData = useSelector((state: any) => state.header.searchedData);
  const pageNumber = useSelector((state: any) => state.pagination.pageNumber);

  const [currentPage, setCurrentPage] = useState(pageNumber);
  const { blocksHeader } = useByFromHeight(
    blockHeight - (pageNumber - 1) * showRecord,
    showRecord
  );

  useEffect(() => {
    console.log("BLOCKS page: change block height", blockHeight);
  }, [blockHeight]);

  useEffect(() => {
    // console.log("headers", blocksHeader);
    setBlocksData(blocksHeader);
    setPageCount(blockHeight);
    setLoading(false);
  }, [blocksHeader]);

  useEffect(() => {}, [showRecord, currentPage]);

  const numberOfRecordShow = (Record: Number) => {
    setTotalRecords(Record);
    setCurrentPage(1);
  };

  const handlerPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(pageChange(pageNumber));
  };

  const blockDetails = (hash: string, type: string) => {
    navigate(`${RouterPathEnum.BLOCKS_DETAILS}/${hash}`);
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
                    searchedDataGet={(searchID: string) =>
                      dispatch(searchDataUpdater(searchID))
                    }
                    searchedData={searchedData}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12} className="mt-3 mb-3">
              <h4>{t("Blocks")}</h4>
            </Col>
          </Row>
          {/* All Blocks list  */}
          <Table
            headerData={[
              {
                Height: "",
                Hash: "",
                Merkle_Root: "",
                CID: "",
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
                        onClick={() => blockDetails(block.curBlock, "hash")}
                        className="link-color"
                      >
                        {hashPretty(block.curBlock)}
                      </div>
                      <CopyAddressClipboard id={index} text={block.curBlock} />
                    </div>
                  ),
                  Merkle_Root: <>{hashPretty(block.merkleRoot)}</>,
                  CID: <>{hashPretty(block.CID)}</>,
                  Timestamp: moment
                    .utc(block.timestamp * 1000)
                    .format("YYYY-MM-DD HH:mm:ssZZ"),
                };
              })
            }
            loading={loading}
            currentPage={currentPage}
            pageCount={pageCount}
            props={props}
            data={blocksData}
            fileName={"Blocks List.csv"}
            pageChange={handlerPageChange}
            showRecord={showRecord}
            numberOfRecordShow={numberOfRecordShow}
          />
        </Container>
      </div>
    </div>
  );
};

export default Blocks;
