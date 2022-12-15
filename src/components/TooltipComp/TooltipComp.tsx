import React, { ReactNode, useEffect, useState } from "react";
import "./Tooltip.scss";
import { Tooltip } from "reactstrap";
// import copy from 'images/copy.svg'
// import { ReactSVG } from 'react-svg'
// import { FaRegCheckCircle } from 'react-icons/fa'
import { withTranslation, WithTranslation } from "react-i18next";

export interface TooltipProps extends WithTranslation {
  text: string;
  children?: ReactNode;
  onClick?: () => void;
  className?: any;
  id?: any;
  key?: any;
  bytesText?: any;
  limit?: number;
}

const TooltipComp: React.FC<TooltipProps> = ({
  text,
  children,
  id,
  onClick,
  className,
  limit,
  bytesText,
  i18n,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);
  return (
    <div className="tooltip_comp">
      <div
        className="bytes"
        id={"Tooltip-" + id}
        onClick={() => {
          setTooltipOpen(false);
        }}
      >
        {limit && limit > 0
          ? bytesText > limit
            ? limit
            : text
          : text.slice(0, 6) + `…` + text.slice(-1 * 6)}
      </div>
      {!limit || bytesText > limit ? (
        <Tooltip
          placement="top"
          isOpen={tooltipOpen}
          target={"Tooltip-" + id}
          toggle={toggle}
        >
          {text}
        </Tooltip>
      ) : null}
    </div>
  );
};

export default withTranslation()(TooltipComp);
