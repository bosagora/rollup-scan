import React from "react";
import { withTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "global/styles/darkMode/theme";
import { GlobalStyles } from "global/styles/darkMode/global";
import { BrowserRouter } from "react-router-dom";
import RoutesPage from "./global/routes";
import moment from "moment";

const App: React.FC<any> = () => {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      w: "a week",
      ww: "%d weeks",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
  });

  return (
    <div className="main">
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyles />
          <RoutesPage />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default withTranslation()(App);
