import {
  USER_LOGIN,
  USER_LOGOUT,
} from '../actions';

const initialState = {
  name: null,

}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        name: action.name,
      }
    case USER_LOGOUT:
      return {
        ...state,
        name: null,
      }

    default:
      return state
  }
}

export default UserReducer;
