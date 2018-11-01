import {
  SET_FIREBASE,
  SET_GAPI,
  SET_GMAIL
} from './actionTypes';

/**
* Save Google API object to redux
* @param: payload(gapi object)
*/
export const setGAPI = payload => {
  return {
		type: SET_GAPI,
    payload
	}
};

/**
* Save Firebase object to redux
* @param: payload(firebase object)
*/
export const setFirebase = payload => {
  return {
		type: SET_FIREBASE,
    payload
	}
};

/**
* Save Gmail object to redux
* @param: payload(gmail object)
*/
export const setGmail = payload => {
  return {
		type: SET_GMAIL,
    payload
	}
};
