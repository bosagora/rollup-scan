import React from "react";
import { useTranslation, withTranslation } from "react-i18next";
import Loader from "../Loader/Loader";
import moment from "moment/moment";
import { Transaction } from "rollup-pm-sdk";
import { Amount } from "../../global/config/config";

interface TransactionProps {
  data?: Transaction[];

  isLoading?: boolean;
}
const TransactionBox: React.FC<TransactionProps> = (
  props: TransactionProps
) => {
  // const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading } = props;

  // const transactionOverview = (hash: string) => {
  //   navigate(`${RouterPathEnum.TRANSACTION_OVERVIEW}/${hash}`);
  // };

  return (
    <div className="transactions">
      <div className="bt-top">
        <h4>{t("Transactions")}</h4>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Sequence number</th>
              <th>Type</th>
              <th>Amount</th>
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
                {data.map((item: any, index: any) => (
                  <tr key={index}>
                    <td>
                      <div
                        className="link-color"
                        // onClick={() => transactionOverview(item.sequence)}
                      >
                        {item.sequence}
                      </div>
                    </td>
                    <td>{t(item.state === "0" ? "Charge" : "Discharge")}</td>
                    <td>
                      {item?.amount ? Amount(item?.amount) : item?.amount}
                    </td>
                    <td>
                      {moment
                        .utc(item.timestamp * 1000)
                        .locale("en")
                        .fromNow()}
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
