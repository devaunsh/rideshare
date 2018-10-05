import {
  USER_LOGIN,
  USER_LOGOUT,
} from '../actions';

const initialState = {
  name: null,
  profilePicUrl: null,
  email: null,
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

    default:
      return state
  }
}

export default UserReducer;
