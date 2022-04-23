import api from '../../../api';
import { actions } from '../../reducers/restaurantReducer';

export const getRestaurant = (id) => async (dispatch) => {
  dispatch(actions.setIsPending());
  try {
    const { data } = await api.get(`/restaurants/${id}`);

    dispatch(actions.setRestaurant(data));
  } catch (e) {
    dispatch(actions.setError(e));
  }
};

export const updateRestaurant = (restaurant) => async (dispatch, store) => {
  const {
    restaurant: { content },
  } = store();
  try {
    dispatch(actions.setRestaurant(restaurant));
    await api.put(`/restaurants/${restaurant.id}`, restaurant);
  } catch (e) {
    dispatch(actions.setError(e));
    dispatch(actions.setRestaurant(content));
  }
};

export default {
  getRestaurant,
  updateRestaurant,
};
