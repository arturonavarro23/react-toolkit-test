import { useQuery } from 'react-query';
import api from '../api';

const getRestaurants = async () => {
  console.log('enter');
  const res = await api.get('/restaurants');
  return res.data;
};

export default () => {
  return useQuery('restaurants', getRestaurants);
};
