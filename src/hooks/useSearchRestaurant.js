import { useQuery } from 'react-query';
import api from '../api';

const getRestaurants = async (key, searchTerm) => {
  const res = await api.get('/restaurants', {
    params: {
      name_like: searchTerm,
    },
  });
  return res.data;
};

export default (searchTerm) => {
  return useQuery(['searchRestaurant', searchTerm], getRestaurants, {
    enabled: searchTerm,
  });
};
