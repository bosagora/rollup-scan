import React from "react";
import { Helmet } from "react-helmet";

export interface HelmetProps {
  title: any;
  meta: { name: string; content: string };
}

const PageHelmet: React.FC<HelmetProps> = ({ title, meta }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name={meta.name} content={meta.content} />
      <link rel="canonical" href={window.location.origin} />
    </Helmet>
  );
};

export default PageHelmet;
