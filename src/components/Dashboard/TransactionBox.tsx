import { RouterPathEnum } from "../../global/routes/RouterPathEnum";
import { getPretty } from "../../global/utils/CalcUtils";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useTranslation, withTranslation } from "react-i18next";
import Loader from "../Loader/Loader";
import moment from "moment/moment";

interface TransactionProps {
  data?: any;

  isLoading?: boolean;
}
const TransactionBox: React.FC<TransactionProps> = (
  props: TransactionProps
) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading } = props;

  const transactionOverview = (hash: string) => {
    navigate(`${RouterPathEnum.TRANSACTION_OVERVIEW}/${hash}`);
  };

  return (
    <div className="transactions">
      <div className="bt-top">
        <h4>{t("Transactions")}</h4>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>{t("Tx_Hash")}</th>
              <th>{t("Type")}</th>
              <th>{t("Height")}</th>
              <th>{t("Time")}</th>
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
                {data.slice(0, 10).map((item: any, index: any) => (
                  <tr key={index}>
                    <td>
                      <div
                        className="link-color"
                        onClick={() => transactionOverview(item.tx_hash)}
                      >
                        {item.tx_hash.slice(0, 6) +
                          `…` +
                          item.tx_hash.slice(-1 * 6)}
                      </div>
                    </td>
                    <td>{t(item.type)}</td>
                    <td>
                      {item.height ? getPretty(item.height) : item.height}
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
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default withTranslation()(TransactionBox);
