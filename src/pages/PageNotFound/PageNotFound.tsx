import React from "react";
// import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./PageNotFound.scss";
import { useTranslation, withTranslation } from "react-i18next";

const PageNotFound: React.FC<any> = () => {
  const { t } = useTranslation();
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
          <h2>{t("Oops_Page_Not_Found")}</h2>
        </div>
        <Link to="/">{t("Back_to_Dashboard")}</Link>
      </div>
    </div>
    // <div id="page-not-found">
    //   <Container fluid="xl">
    //     <div className="pnf-content">
    //       <h1>404</h1>
    //       <p>{t('Oops_Page_Not_Found')}</p>
    //       <Link to="/">{t('Back_to_Dashboard')}</Link>
    //     </div>
    //   </Container>
    // </div>
  );
};

export default withTranslation()(PageNotFound);
