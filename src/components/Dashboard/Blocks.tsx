import Loader from "../Loader/Loader";
import { RouterPathEnum } from "../../global/routes/RouterPathEnum";
import { getPretty } from "../../global/utils/CalcUtils";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";
import { headerClassUpdater } from "../../store/header/thunks";
import { useDispatch } from "react-redux";
import moment from "moment";

interface BlockProps {
  data?: any;

  isLoading?: boolean;
}
const BlocksBox: React.FC<BlockProps> = (props: BlockProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading } = props;

  const changeRoute = (route: string) => {
    navigate(route);
    dispatch(headerClassUpdater("newclass2", "layout-generic"));
  };

  return (
    <div className="blocks">
      <div className="bt-top">
        <h4>{t("Blocks")}</h4>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>{t("Height")}</th>
              <th>{t("Timestamp")}</th>
              <th>{t("Transactions")}</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="no-data">
                <td className="w-100">
                  <Loader />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr className="no-data">
                <td className="w-100">
                  <h4>{t("NoRecord")}</h4>
                </td>
              </tr>
            ) : (
              <>
                {data.slice(0, 10).map((item: any, index: number) => (
                  <tr key={index}>
                    <td>
                      <div
                        className="link-color"
                        onClick={() =>
                          changeRoute(
                            `${RouterPathEnum.BLOCKS_DETAILS}/height:${item.height}`
                          )
                        }
                      >
                        {getPretty(item.height)}
                      </div>
                    </td>
                    <td>
                      {moment
                        .utc(item.time_stamp * 1000)
                        .fromNow()
                        .includes("day") ||
                      moment
                        .utc(item.time_stamp * 1000)
                        .fromNow()
                        .includes("month") ||
                      moment
                        .utc(item.time_stamp * 1000)
                        .fromNow()
                        .includes("year")
                        ? moment
                            .utc(item.time_stamp * 1000)
                            .format("YYYY-MM-DD HH:mm:ss") + " UTC"
                        : ""}
                    </td>
                    <td>{item.tx_count}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="bt-bottom">
        <Link to="/blocks">{t("View_All_Blocks")}</Link>
      </div>
    </div>
  );
};
export default BlocksBox;