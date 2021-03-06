import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import user from './user';
import repos from './repos';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  user,
  repos
});
