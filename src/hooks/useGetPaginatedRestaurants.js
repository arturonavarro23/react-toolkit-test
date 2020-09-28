import { usePaginatedQuery } from 'react-query';
import api from '../api';

const LIMIT = 4;

const getRestaurants = async (key, page) => {
  const { data, headers } = await api.get('/restaurants', {
    params: {
      _page: page,
      _limit: LIMIT,
    },
  });
  return {
    restaurants: data,
    total: headers['x-total-count'],
    pagitnation: {
      prev: page > 1 ? page - 1 : null,
      current: page,
      next: LIMIT * page < headers['x-total-count'] ? page + 1 : null,
      pages: Math.ceil(headers['x-total-count']/LIMIT),
    },
  };
};

export default (page = 0) => {
  return usePaginatedQuery(['paginated-restautrants', page], getRestaurants);
};
