import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { NextPageContext } from "next";

export const COOKIE_NAME = "googtrans";

export const getLanguageConfig = () => {
  let cfg;

  if (process.env.GOOGLE_TRANSLATION_CONFIG) {
    try {
      cfg = JSON.parse(process.env.GOOGLE_TRANSLATION_CONFIG ?? "{}");
    } catch (e) {}
  }

  return cfg;
};

export const useLanguageSwitcher = ({ context }) => {
  const [currentLanguage, setCurrentLanguage] = useState("");

  useEffect(() => {
    const cfg = getLanguageConfig();
    const cookies = parseCookies(context);
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue = "";
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    if (cfg && !languageValue) {
      languageValue = cfg.defaultLanguage;
    }
    setCurrentLanguage(languageValue);
  }, []);

  const switchLanguage = (lang) => () => {
    setCookie(context, COOKIE_NAME, "/auto/" + lang);
    window.location.reload();
  };

  return {
    currentLanguage,
    switchLanguage,
    languageConfig: getLanguageConfig(),
  };
};

export default useLanguageSwitcher;
