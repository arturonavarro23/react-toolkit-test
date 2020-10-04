import { createSlice } from '@reduxjs/toolkit';

export const LIMIT = 4;

const initialState = {
  items: [],
  total: 0,
  pagination: null,
  loading: 'idle',
  createLoading: 'idle',
  restaurantIsCreated: false,
  error: null,
};

const restaurantList = createSlice({
  name: 'resaurantList',
  initialState,
  reducers: {
    setIsPending: (state) => {
      state.loading = 'pending';
    },
    setCreateLoading: (state) => {
      state.createLoading = 'pending';
      state.restaurantIsCreated = false;
    },
    setRestaurantIsCreated: (state) => {
      state.restaurantIsCreated = true;
    },
    setRestaurantList: (state, action) => {
      const {
        payload: { items, total, page },
      } = action;
      state.loading = 'idle';
      state.createLoading = 'idle';
      state.items = items;
      state.total = total;
      state.pagination = {
        prev: page > 1 ? page - 1 : null,
        current: page,
        next: LIMIT * page < total ? page + 1 : null,
        pages: Math.ceil(total / LIMIT),
      };
    },
    setError: (state, action) => {
      state.loading = 'idle';
      state.createLoading = 'idle';
      state.error = action.payload;
    },
  },
});

export const actions = restaurantList.actions;

export default restaurantList.reducer;
