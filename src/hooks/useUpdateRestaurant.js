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
      console.log(newRestaurant);
      queryCache.cancelQueries('restaurants');
      queryCache.cancelQueries(['restaurants', newRestaurant.id]);

      const previousRestaurants = queryCache.getQueryData('restaurants');
      const previousRestaurant = queryCache.getQueryData([
        'restaurants',
        newRestaurant.id,
      ]);

      // Optimistically update to the new value
      queryCache.setQueryData('restaurants', (old) => [...old, newRestaurant]);
      queryCache.setQueryData(['restaurants', newRestaurant.id], newRestaurant);

      return () => {
        queryCache.setQueryData('restaurants', previousRestaurants);
        queryCache.setQueryData(
          ['restaurants', newRestaurant.id],
          previousRestaurant
        );
      };
    },
    onError: (err, newTodo, rollback) => rollback(),
    // Always refetch after error or success:
    onSettled: (newRestaurant) => {
      queryCache.invalidateQueries('restaurants');
      queryCache.invalidateQueries(['restaurants', newRestaurant.id]);
      queryCache.invalidateQueries('searchRestaurant');
    },
  });
};
