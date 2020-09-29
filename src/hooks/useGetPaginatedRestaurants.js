import React from 'react';
import { usePaginatedQuery, useQueryCache } from 'react-query';
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
    pagination: {
      prev: page > 1 ? page - 1 : null,
      current: page,
      next: LIMIT * page < headers['x-total-count'] ? page + 1 : null,
      pages: Math.ceil(headers['x-total-count'] / LIMIT),
    },
  };
};

export default (page = 0) => {
  const cache = useQueryCache();
  const { latestData, ...rest } = usePaginatedQuery(
    ['paginated-restautrants', page],
    getRestaurants
  );

  React.useEffect(() => {
    if (latestData?.pagination?.next) {
      cache.prefetchQuery(['paginated-restautrants', page + 1], getRestaurants);
    }
  }, [latestData, page, cache]);

  return {
    latestData,
    ...rest,
  };
};
