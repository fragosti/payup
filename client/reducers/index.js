
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import listings from './listings'

export default combineReducers({
  routing,
  listings
})

// We would add an auth reducer as well. 
