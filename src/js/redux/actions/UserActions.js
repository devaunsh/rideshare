import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_RIDES
} from './actionTypes';
/**
* Save rides to redux
* @param: rides
*/
export const setRides = rides => {
  return dispatch => dispatch({
    type: SET_RIDES,
    rides
  });
};
/**
* Save user data to redux
* @param: user(Google login user basic profile)
*/
export const userLogin = user => {
  return dispatch => dispatch({
    type: USER_LOGIN,
    name: user.getName(),
    email: user.getEmail(),
    profilePicURL: user.getImageUrl()
  });
};

/**
* Log out and remove user data to redux
*/
export const userLogout = () => {
  return (dispatch, getState) => {
    const { gapi, firebase } = getState().packages;

    gapi.auth2.getAuthInstance().signOut().then(() => {
      firebase.auth().signOut().then(() => {
        return dispatch({
          type: USER_LOGOUT,
          name: null,
          email: null,
          profilePicURL: null
        });
      });
    })
  }
};
