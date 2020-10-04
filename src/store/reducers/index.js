import { combineReducers } from 'redux';

import search from './searchReducer';
import restaurantList from './restaurantListReducer';

export default combineReducers({
  search,
  restaurantList,
});
