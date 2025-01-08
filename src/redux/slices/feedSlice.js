import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = '/feeds';

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
});

export const createFeed = createAsyncThunk('feeds/createFeed', async (data) => {
  const response = await axios.post(`${BASE_URL}`, data);
  return response.data;
});

const feedSlice = createSlice({
  name: 'feeds',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createFeed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createFeed.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(createFeed.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default feedSlice.reducer;
