import React, { ReactNode, useEffect, useState } from "react";
import "./CopyAddressClipboard.scss";
import { Tooltip } from "reactstrap";
import copy from "assets/images/copy.svg";
// import { ReactSVG } from 'react-svg'
import { FaRegCheckCircle } from "react-icons/fa";
import {
  useTranslation,
  withTranslation,
  WithTranslation,
} from "react-i18next";

export interface CopyAddressClipboardProps extends WithTranslation {
  text: string;
  children?: ReactNode;
  onClick?: () => void;
  className?: any;
  id?: any;
  key?: any;
}

const CopyAddressClipboard: React.FC<CopyAddressClipboardProps> = ({
  text,
  children,
  id,
  onClick,
  className,
  i18n,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const { t } = useTranslation();
  const toggle = () => setTooltipOpen(!tooltipOpen);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);
  return (
    <div className="copy-clipboard">
      {copied ? (
        <div className="copied">
          <FaRegCheckCircle />
          <span>{t("Copied")}</span>
        </div>
      ) : (
        <>
          <img
            src={copy}
            alt="Copy"
            id={"Tooltip-" + id}
            onClick={() => {
              setCopied(true);
              setTooltipOpen(false);
              navigator.clipboard.writeText(text);
            }}
          />
          <Tooltip
            placement="top"
            isOpen={tooltipOpen}
            target={"Tooltip-" + id}
            toggle={toggle}
          >
            {t("Copy_to_Clipboard")}
          </Tooltip>
        </>
      )}
      {/* <ReactSVG src={copy} onClick={onClick} className={className}>
        {children}
      </ReactSVG> */}
    </div>
  );
};

export default withTranslation()(CopyAddressClipboard);
