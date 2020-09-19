import { useMutation, useQueryCache } from 'react-query';
import api from '../api';

const createRestaurant = async (restaurant) => {
  const res = await api.post('/restaurants', restaurant);
  return res.data;
};

export default () => {
  const queryCache = useQueryCache();

  return useMutation(createRestaurant, {
    onSuccess: () => {
      queryCache.invalidateQueries('restaurants');
    },
  });
};
