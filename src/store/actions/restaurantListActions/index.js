import api from '../../../api';
import { LIMIT, actions } from '../../reducers/restaurantListReducer';

export const getRestaurantList = (page) => async (dispatch) => {
  dispatch(actions.setIsPending());
  try {
    const { data, headers } = await api.get('/restaurants', {
      params: {
        _page: page,
        _limit: LIMIT,
      },
    });

    dispatch(
      actions.setRestaurantList({
        items: data,
        total: headers['x-total-count'],
        page,
      })
    );
  } catch (e) {
    dispatch(actions.setError(e));
  }
};

export const createRestaurant = (restaurant) => async (dispatch, store) => {
  try {
    await api.post('/restaurants', restaurant);
    const { restaurantList } = store();
    dispatch(getRestaurantList(restaurantList.pagination.current));
    dispatch(actions.setRestaurantIsCreated());
  } catch (e) {
    console.log(e);
    dispatch(actions.setError(e));
  }
};

export default {
  getRestaurantList,
  createRestaurant,
};
