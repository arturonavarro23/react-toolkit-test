import { useMutation, useQueryCache } from 'react-query';
import api from '../api';

const updateRestaurant = async (restaurant) => {
  const res = await api.put(`/restaurants/${restaurant.id}`, restaurant);
  return res.data;
};

export default () => {
  const queryCache = useQueryCache();

  return useMutation(updateRestaurant, {
    onMutate: (newRestaurant) => {
      queryCache.cancelQueries(['restaurants', newRestaurant.id.toString()]);

      const previousRestaurant = queryCache.getQueryData([
        'restaurants',
        newRestaurant.id.toString(),
      ]);

      queryCache.setQueryData(['restaurants', newRestaurant.id.toString()], newRestaurant);

      return () => {
        queryCache.setQueryData(
          ['restaurants', newRestaurant.id.toString()],
          previousRestaurant
        );
      };
    },
    onError: (err, newRestaurant, rollback) => rollback(),
    onSettled: (newRestaurant) => {
      queryCache.invalidateQueries(['restaurants', newRestaurant.id.toString()]);
    },
  });
};
