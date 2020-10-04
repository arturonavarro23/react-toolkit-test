import { combineReducers } from 'redux';

import search from './searchReducer';
import restaurantList from './restaurantListReducer';
import restaurant from './restaurantReducer';

export default combineReducers({
  search,
  restaurantList,
  restaurant,
});
