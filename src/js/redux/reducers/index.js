import { combineReducers } from 'redux'

// Reducers
import UserReducer from './UserReducer'
import PackageReducer from './PackageReducer'


const rootReducer = combineReducers({
  user: UserReducer,
  packages: PackageReducer,
})

export default rootReducer
