import React, { FC, ReactNode } from "react";
import { Container } from "reactstrap";
import { FaRegCopyright } from "react-icons/fa";
import {
  useTranslation,
  withTranslation,
  WithTranslation,
} from "react-i18next";

import "./Footer.scss";

export interface FooterProps extends WithTranslation {
  children?: ReactNode;
  onClick?: () => void;
}

const Footer: FC<FooterProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div id="footer">
      <Container fluid="xl">
        <div className="footer-links">
          <div className="copyright">
            <FaRegCopyright />
            <p>{t("BOSAGORA_Foundation")}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default withTranslation()(Footer);
