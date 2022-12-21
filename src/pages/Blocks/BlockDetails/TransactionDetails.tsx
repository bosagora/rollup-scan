import moment from "moment/moment";
import { formatEther } from "ethers/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { Transaction } from "rollup-pm-sdk";
import { BigNumber } from "ethers";

export interface TransactionDetailsProps {
  tx?: Transaction;
}
const TransactionDetails: React.FC<TransactionDetailsProps> = (
  props: TransactionDetailsProps
) => {
  const { t } = useTranslation();

  const { tx } = props;

  return (
    <div className="more-detail">
      <div className="item">
        <p>{t("Seq")}</p>
        <div className="values">
          <div className="hash-copy copy-address">
            {tx?.sequence && <>{tx.sequence}</>}
          </div>
        </div>
      </div>
      <div className="item">
        <p>{t("Trade_Id")}</p>
        <div className="values">
          <div className="hash-copy copy-address">
            {tx?.trade_id && tx.trade_id}
          </div>
        </div>
      </div>
      <div className="item">
        <p>{t("User_Id")}</p>
        <div className="values">
          <div className="hash-copy copy-address">
            {tx?.user_id && <>{tx.user_id}</>}
          </div>
        </div>
      </div>
      <div className="item">
        <p>{t("Type")}</p>
        <div className="values">
          <div className="hash-copy copy-address">
            {tx?.state && tx.state === "0" ? "Charge" : "Discharge"}
          </div>
        </div>
      </div>
      <div className="item">
        <p>{t("Timestamp")}</p>
        <div className="values">
          {moment.utc(tx.timestamp * 1000).format("YYYY-MM-DD HH:mm:ssZZ")}
        </div>
      </div>
      <div className="item">
        <p>{t("Amount")}</p>
        <div className="values">{formatEther(BigNumber.from(tx.amount))}</div>
      </div>
      <div className="item">
        <p>{t("Exchange_Id")}</p>
        <div className="values">{tx?.exchange_id && tx.exchange_id}</div>
      </div>
      <div className="item">
        <p>{t("Exchange_User_Id")}</p>
        <div className="values">
          {tx?.exchange_user_id && tx.exchange_user_id}
        </div>
      </div>
      <div className="item">
        <p>{t("Signer")}</p>
        <div className="values">{tx?.signer && tx.signer}</div>
      </div>
      <div className="item">
        <p>{t("Signature")}</p>
        <div className="values">{tx?.signature && tx.signature}</div>
      </div>
      <div className="item">
        <p>{t("Timestamp")}</p>
        <div className="values">
          {moment.utc(tx.timestamp * 1000).format("YYYY-MM-DD HH:mm:ssZZ")}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
