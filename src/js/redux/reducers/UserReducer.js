import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_RIDES,
} from '../actions';

const initialState = {
  name: null,
  profilePicUrl: null,
  email: null,
  rides: {}
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        name: action.name,
        profilePicURL: action.profilePicURL,
        email: action.email,
      }
    case USER_LOGOUT:
      return {
        ...state,
        name: null,
        profilePicURL: null,
        email: null,
      }
    case SET_RIDES:
      return {
        ...state,
        rides: action.rides
      }

    default:
      return state
  }
}

export default UserReducer;
