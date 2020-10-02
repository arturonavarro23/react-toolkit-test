import { renderHook } from '@testing-library/react-hooks';
import nock from 'nock';
import { queryCache } from 'react-query';

import { wrapper } from '../utils/test';
import { useGetPaginatedRestaurants } from './useGetPaginatedRestaurants';

function setup() {
  return renderHook(({ page }) => useGetPaginatedRestaurants(page), {
    wrapper,
    initialProps: { page: 1 },
  });
}

function setupWithSuccesfullRequest() {
  nock('http://localhost:3001')
    .defaultReplyHeaders({
      'x-total-count': 1,
    })
    .get('/restaurants')
    .query({
      _page: 1,
      _limit: 4,
    })
    .reply(200, [{ id: 1, name: 'Restaurant', img: 'image' }]);

  return setup();
}

function setupWithErrorRequest() {
  nock('http://localhost:3001')
    .defaultReplyHeaders({
      'x-total-count': 1,
    })
    .get('/restaurants')
    .query({
      _page: 1,
      _limit: 4,
    })
    .reply(500);

  return setup();
}

describe('useGetPaginatedRestaurants', () => {
  afterAll(() => {
    nock.restore();
    queryCache.clear({ notify: false });
  });

  test('should return a list of restaurants', async () => {
    // arrange
    const { result, waitFor } = setupWithSuccesfullRequest();

    //assert
    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });
    expect(result.current.resolvedData.restaurants).toHaveLength(1);
  });

  test('should return an error status', async () => {
    // arrange
    const { result, waitFor } = setupWithErrorRequest();

    //assert
    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });
  });
});
