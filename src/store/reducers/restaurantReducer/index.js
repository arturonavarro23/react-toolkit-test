import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: {},
  loading: 'idle',
  updatingLoading: 'idle',
  error: null,
};

const restaurant = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setIsPending: (state) => {
      state.loading = 'pending';
    },
    setUpdatingLoading: (state) => {
      state.updatingLoading = 'idle';
    },
    setRestaurant: (state, action) => {
      state.content = action.payload;
      state.loading = 'idle';
      state.updatingLoading = 'idle';
    },
    setError: (state, action) => {
      state.loading = 'idle';
      state.updatingLoading = 'idle';
      state.error = action.payload;
    },
  },
});

export const actions = restaurant.actions;

export default restaurant.reducer;
