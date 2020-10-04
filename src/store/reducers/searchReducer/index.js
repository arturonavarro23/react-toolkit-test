import { createSlice } from '@reduxjs/toolkit';

import { search } from '../../actions/searchActions';

const initialState = {
  items: [],
  loading: 'idle',
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  extraReducers: {
    [search.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    [search.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.items = action.payload;
    },
    [search.rejected]: (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    },
  },
});

export default searchSlice.reducer;
