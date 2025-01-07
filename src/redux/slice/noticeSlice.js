import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = '/notice';

// 공지사항 조회
export const fetchNotices = createAsyncThunk(
  'notices/fetchNotices',
  async () => {
    const response = await axios.get(`${BASE_URL}/notices`);
    return response.data;
  }
);

const noticeSlice = createSlice({
  name: 'notices',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default noticeSlice.reducer;
