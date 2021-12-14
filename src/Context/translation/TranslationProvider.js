import React, { useEffect, useReducer, useState } from 'react'
import { useCookies } from 'react-cookie';

import { CircularProgress } from '@material-ui/core';

import { SET_LANGUAGE, UPDATE_TRANSLATE } from './TranslationTypes';
import { TranslationContext, initialState, navigatorLanguage } from './TranslationContext';
import TranslationReducer from './TranslationReducer';

import {languages, translates} from  './Language'

const TranslationProvider = (props) => {
  const [state, dispatch] = useReducer(TranslationReducer, initialState)
  const [cookieLang, setCookieLang, removeCookieLang] = useCookies(['stam_lang', 'stam_lang_expiry']);
  const [openWarningMessage, setOpenWarningMessage] = useState(false);
  const [onError, setOnError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appLanguages, ] = useState(languages.items);

  useEffect(() => {
    translatePublic();
  }, [])

  const translatePublic = async () => {
    let lng = cookieLang.stam_lang;
    let lngData = localStorage.getItem('lng-data');
    let lngExpiry = cookieLang.stam_lang_expiry;

    if(lngExpiry) {
      const now = new Date();
      if(now.getTime() > lngExpiry) {
        removeCookieLang('stam_lang');
        localStorage.removeItem('lng-data');
        removeCookieLang('stam_lang_expiry');
        lng = null;
        lngData = null;
        lngExpiry = null;
      }
    }

    if(!lng)
      await initialLanguageApp();

    if(!lngData) {
      await fetchTranslate();
    } else {
      let translateObject = JSON.parse(lngData);

      if(translateObject[lng]) {
       
          let languageObj = appLanguages.filter(item => (item.code === lng))
          setLanguage({ code: languageObj[0].code })
          updateTranslate(translateObject);
          setOnError(false);
          setLoading(false);
      
      } else {
        executeError()
        setLoading(false);
      }
    }
  }

  const executeError = () => {
    removeCookieLang('stam_lang');
    localStorage.removeItem('lng-data');
    localStorage.removeItem('lng-datap');
    removeCookieLang('stam_lang_expiry');
    setOnError(true);
    setOpenWarningMessage(true);
  }

  /**
   * function to initialize cookie of main language
   */
  const initialLanguageApp = async () => {

      //Filter navigatorLanguage from arrayLanguages to initialize language
      let validationLangCode = appLanguages.filter(item => (item.code === navigatorLanguage))
      setLanguage(validationLangCode.length > 0 ? validationLangCode[0] : appLanguages[0]);
      setCookieLang('stam_lang', validationLangCode.length > 0 ? validationLangCode[0].code.toUpperCase() : appLanguages[0].code.toUpperCase(), { path: '/' })
  }

  const fetchTranslate = async () => {
        updateTranslate(translates)
        localStorage.setItem('lng-data', JSON.stringify(translates))
        setOnError(false);
        setLoading(false);
  }

  const setLanguage = (langCode) => {
    dispatch({
      type: SET_LANGUAGE,
      payload: langCode,
    })
  }

  const updateTranslate = arrayTranslate => {
    dispatch({
      type: UPDATE_TRANSLATE,
      payload: arrayTranslate
    })
  }

  const handleWarningMessage = () => {
    setOpenWarningMessage(!openWarningMessage);
    window.location.reload();
  };

  return (
    <TranslationContext.Provider
      value={{
        langCode: state.langCode,
        translate: state.translate,
        cookieLang,
        setCookieLang,
        removeCookieLang,
        appLanguages,
        setLanguage,
        updateTranslate,
        
      }}
    >

      {loading && (
        <div>
          <CircularProgress size={68}/>
        </div>
      )}

      {!loading && (
        <>
        { onError && (
          <div>
            Error
          </div>
        )}
        { !onError && (
          <>
            {props.children}
          </>
        )}
        </>
      )}
    </TranslationContext.Provider>
  )
}

export default TranslationProvider
