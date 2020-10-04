import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../../api';

export const search = createAsyncThunk(
  'search',
  async (searchTerm, _) => {
    if (!searchTerm) {
      return [];
    }

    const res = await api.get('/restaurants', {
      params: {
        name_like: searchTerm,
      },
    });
    return res.data;
  },
);

export default {
  search,
};
