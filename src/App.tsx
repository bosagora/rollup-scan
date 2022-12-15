import React from "react";
import { withTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "global/styles/darkMode/theme";
import { GlobalStyles } from "global/styles/darkMode/global";
import { BrowserRouter } from "react-router-dom";
import RoutesPage from "./global/routes";

const App: React.FC<any> = () => {
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
