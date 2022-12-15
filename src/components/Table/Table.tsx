import React, { ReactNode } from "react";
import { ReactSVG } from "react-svg";
import { MdFileDownload } from "react-icons/md";
import caretIco from "../../assets/images/show-caret.svg";
import {
  useTranslation,
  WithTranslation,
  withTranslation,
} from "react-i18next";
import "./Table.scss";
import Loader from "components/Loader/Loader";
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";
import { VscArrowSmallUp, VscArrowSmallDown } from "react-icons/vsc";

export interface tableData {
  Height: string | number;
  Hash: string | number;
  Markle_Root: string | number;
  Signature: string | number;
  Validators: string | number;
  TX_Count: string | number;
  Enrollment_Count: string | number;
  Timestamp: string | number;
  No: string | number;
  UTXO_Key: string | number;
  Public_Key: string | number;
  Agora_Version: string | number;
  Freezing: string | number;
  // Enrollment_Count: string | number,
  Preimage_Height: string | number;
  // Validators: string | number,
  Stashing: string | number;
  // No: string | number,
  // UTXO_Key: string | number,
  Uptime: string | number;
  Node_IP: string | number;
  // Preimage_Height: 12,
  Preimage_Hash: string | number;
  Freezing_Amount: string | number;
  // UTXO_Key: 666,
  // Public_Key: 666,
  // Preimage_Height: 666,
  // Preimage_Hash: 666,
  Slashing: string | number;
  Signed: string | number;
  Cycle_Length: string | number;
  Random_Seed: string | number;
  Enroll_Signature: string | number;
  // Hash: 333,
  Type: string | number;
  Amount: string | number;
  Fee: string | number;
  Size: string | number;
  Time: string | number;
  Address: string | number;
  UTXO: string | number;
}
export interface TableProps extends WithTranslation {
  children?: ReactNode;
  onClick?: () => void;
  onChange?: () => void;
  sortingData?: (a: string) => void;
  numberOfRecordShow?: any;
  headData?: object[];
  headerData?: any;
  currentPage?: any;
  pageCount?: any;
  pageChange?: any;
  props?: any;
  type?: string;
  pageSize?: any;
  data?: any;
  CSVData?: any;
  fileName?: any;
  showRecord?: any;
  loading?: boolean;
  sortingStatus?: any;
}

const Table: React.FC<TableProps> = ({
  props,
  children,
  onClick,
  onChange,
  sortingData,
  numberOfRecordShow,
  headData,
  headerData,
  i18n,
  currentPage,
  showRecord,
  pageCount,
  pageChange,
  type,
  pageSize,
  data,
  CSVData,
  fileName,
  loading,
  sortingStatus,
}) => {
  // const [pageLength, setPageLength] = useState<any>('')
  const { t } = useTranslation();
  const handleChangePageNumber = (e: any, page: number) => {
    pageChange(page);
  };

  const getKeys = () => {
    return Object.keys(
      headerData !== undefined && headerData.length !== 0 && headerData
        ? headerData[0]
        : []
    );
  };

  const getHeader = () => {
    let keys = getKeys();
    return keys.map((key, index) => {
      // return <th key={key}>{t(key)}</th>
      if (type === "Node") {
        return key === "No" ? (
          <th key={key}>
            {i18n.language === "korean" || i18n.language === "chinese"
              ? key === "No"
                ? t("Number")
                : t(key)
              : key.replace(/[^a-zA-Z ]/g, " ")}
          </th>
        ) : (
          <th key={key}>
            {i18n.language === "korean" || i18n.language === "chinese"
              ? t(key)
              : key.replace(/[^a-zA-Z ]/g, " ")}
          </th>
        );
      } else if (type === "Holder") {
        return key === "No" ? (
          <th key={key}>
            {i18n.language === "korean" || i18n.language === "chinese"
              ? key === "No"
                ? t("Number")
                : t(key)
              : key.replace(/[^a-zA-Z ]/g, " ")}
          </th>
        ) : key === "Balance" ? (
          <th key={key}>
            {i18n.language === "korean" || i18n.language === "chinese"
              ? t(key)
              : key.replace(/[^a-zA-Z ]/g, " ")}
            {sortingStatus.Balance ? (
              <VscArrowSmallDown
                onClick={() => sortingData && sortingData("Balance")}
              />
            ) : (
              <VscArrowSmallUp
                onClick={() => sortingData && sortingData("Balance")}
              />
            )}
          </th>
        ) : key === "Freezing" ? (
          <th key={key}>
            {i18n.language === "korean" || i18n.language === "chinese"
              ? t(key)
              : key.replace(/[^a-zA-Z ]/g, " ")}
            {sortingStatus.Freezing ? (
              <VscArrowSmallDown
                onClick={() => sortingData && sortingData("Freezing")}
              />
            ) : (
              <VscArrowSmallUp
                onClick={() => sortingData && sortingData("Freezing")}
              />
            )}
          </th>
        ) : key === "Received_Rewards" ? (
          <th key={key}>
            {i18n.language === "korean" || i18n.language === "chinese"
              ? t(key)
              : key.replace(/[^a-zA-Z ]/g, " ")}
            {sortingStatus.RecivedReward ? (
              <VscArrowSmallDown
                onClick={() => sortingData && sortingData("Received_Rewards")}
              />
            ) : (
              <VscArrowSmallUp
                onClick={() => sortingData && sortingData("Received_Rewards")}
              />
            )}
          </th>
        ) : (
          <th key={key}>
            {i18n.language === "korean" || i18n.language === "chinese"
              ? t(key)
              : key.replace(/[^a-zA-Z ]/g, " ")}
          </th>
        );
      } else if (type === "Proposals") {
        return key === "No" ? (
          <th key={key}>
            {i18n.language === "korean" || i18n.language === "chinese"
              ? key === "No"
                ? t("Number")
                : t(key)
              : key.replace(/[^a-zA-Z ]/g, " ")}
          </th>
        ) : (
          <th key={key}>
            {i18n.language === "korean" || i18n.language === "chinese"
              ? t(key)
              : key.replace(/[^a-zA-Z ]/g, " ")}
          </th>
        );
      } else {
        return (
          <th key={key}>
            {i18n.language === "korean" || i18n.language === "chinese"
              ? t(key)
              : key.replace(/[^a-zA-Z ]/g, " ")}
          </th>
        );
      }
    });
  };

  const RenderRow = (props: any) => {
    return props.keys.map((key: any, index: number) => {
      if (type === "Node") {
        return key === "No" ? (
          // key={props.data[key]
          <td key={index}>{props.data[key]}</td>
        ) : (
          <td key={index}>{props.data[key]}</td>
        );
      } else {
        return <td key={index}>{props.data[key]}</td>;
      }
    });
  };
  // const ddData = (e: any) => {
  //   // pageLength(e.target.value)
  //   pageSize(e.target.value)

  //   if (pageLength === '20') {
  //     const items = pageSize.slice(0, 20)
  //   }
  // }

  const getRowsData = () => {
    var items = headData ? headData : [];
    var keys = getKeys();
    return loading ? (
      <tr className="no-data">
        <td>
          <Loader />
        </td>
      </tr>
    ) : items.length === 0 ? (
      <tr className="no-data">
        <td>
          <h4>{t("NoRecord")}</h4>
        </td>
      </tr>
    ) : (
      items.map((row, index) => {
        return (
          <tr key={index} onClick={onClick}>
            <RenderRow key={index} data={row} keys={keys} />
          </tr>
        );
      })
    );
  };

  return (
    <div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>{getHeader()}</tr>
          </thead>
          <tbody>{getRowsData()}</tbody>
        </table>
      </div>
      {data?.length > 0 ? (
        <div className="table-footer">
          <div className="show-list d-lg">
            <p>{t("Show")}</p>
            <div className="select-cont">
              <select
                className="form-control"
                onChange={(e) => numberOfRecordShow(parseInt(e.target.value))}
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <ReactSVG src={caretIco} />
            </div>
          </div>
          <div className="pagination_cont">
            <Pagination
              hideDisabled
              activePage={currentPage}
              itemsCountPerPage={showRecord}
              totalItemsCount={pageCount}
              pageRangeDisplayed={10}
              onChange={(e) => handleChangePageNumber("0", e)}
            />
          </div>
          <div className="show-list d-sm">
            <p>{t("Show")}</p>
            <div className="select-cont">
              <select
                className="form-control"
                onChange={(e) => numberOfRecordShow(parseInt(e.target.value))}
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <ReactSVG src={caretIco} />
            </div>
          </div>
          <div className="csv-dld">
            <p>{t("Download")}</p>
            <CSVLink data={CSVData} filename={fileName}>
              {t("CSV_Export")} <MdFileDownload />
            </CSVLink>
            {/* <Button>
            {t('CSV_Export')} <MdFileDownload />
          </Button> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default withTranslation()(Table);
