import {
  SET_FIREBASE,
  SET_GAPI,
  SET_GMAIL
} from '../actions';

const initialState = {
  firebase: null,
  gapi: null,
  gmail: null
}

const PackageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FIREBASE:
      return {
        ...state,
        firebase: payload
      }
    case SET_GAPI:
      return {
        ...state,
        gapi: payload
      }
      case SET_GMAIL:
        return {
          ...state,
          gmail: payload
        }
    default:
      return state
  }
}

export default PackageReducer;
