import {SET_LANGUAGE, UPDATE_TRANSLATE} from './TranslationTypes';
import { getTranslate } from './TranslationContext';

const TranslationReducer = (state, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        langCode: action.payload,
      }
    case UPDATE_TRANSLATE:
      return {
        ...state,
        translate: getTranslate(state.langCode, action.payload),
      }
    default:
      return {...state};
  }
}

export default TranslationReducer;