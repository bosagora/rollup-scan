import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./index.scss";
import "./global/styles/bootstrap.min.css";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "./global/config/i18n";
import { DAppProvider } from "@usedapp/core";
import { getChainConfig } from "./global/config/AgoraChain";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root")!);
root.render(
  <DAppProvider config={getChainConfig()}>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  </DAppProvider>
);
