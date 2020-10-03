import { renderHook } from '@testing-library/react-hooks';
import nock from 'nock';
import { queryCache } from 'react-query';

import { wrapper } from '../utils/test';
import { useCreateRestaurant } from './useCreateRestaurant';

function setup() {
  return renderHook(() => useCreateRestaurant(), {
    wrapper,
  });
}

// function setupWithSuccesfullRequest() {
//   nock('http://localhost:3001')
//     .defaultReplyHeaders({
//       'x-total-count': 1,
//     })
//     .get('/restaurants')
//     .query({
//       _page: 1,
//       _limit: 4,
//     })
//     .reply(200, [{ id: 1, name: 'Restaurant', img: 'image' }]);

//   return setup();
// }

// function setupWithErrorRequest() {
//   nock('http://localhost:3001')
//     .defaultReplyHeaders({
//       'x-total-count': 1,
//     })
//     .get('/restaurants')
//     .query({
//       _page: 1,
//       _limit: 4,
//     })
//     .reply(500);

//   return setup();
// }

describe('useCreateRestaurant', () => {
  afterAll(() => {
    nock.restore();
    queryCache.clear({ notify: false });
  });

  test('should return a list of restaurants', async () => {
  });
});