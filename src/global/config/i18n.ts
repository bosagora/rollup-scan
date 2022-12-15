import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import { english } from "./languages/english";

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      english: {
        translations: english,
      },
    },
    // lng:"eng",
    fallbackLng: "english",
    debug: false,
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ",",
    },
  });

export default i18n;
