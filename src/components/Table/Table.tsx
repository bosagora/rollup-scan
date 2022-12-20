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

export interface TableProps {
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
  const { t, i18n } = useTranslation();
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
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
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
          <div className="show-list d-lg" style={{ width: "107px" }}></div>
          {CSVData && (
            <div className="csv-dld">
              <p>{t("Download")}</p>
              <CSVLink data={CSVData} filename={fileName}>
                {t("CSV_Export")} <MdFileDownload />
              </CSVLink>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default withTranslation()(Table);
