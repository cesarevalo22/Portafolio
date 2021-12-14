import { createContext } from "react";

export const navigatorLanguage = (navigator.language.charAt(0) + navigator.language.charAt(1)).toUpperCase();
// const languagesApp = ["EN", "ES"];

export const getTranslate = 
  (langCode, arrayTranslation) => (page, key) => {
    if (arrayTranslation) {
      if (arrayTranslation[langCode.code][page]) {
        return arrayTranslation[langCode.code][page][key] || key
      } else {
        return key
      }
    }
  };

export const initialState = {}

export const TranslationContext = createContext(initialState)
