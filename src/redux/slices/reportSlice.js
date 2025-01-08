import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = '/reports';

// 신고 리스트 조회
export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (domain) => {
    const response = await axios.get(`${BASE_URL}/${domain}`);
    return response.data;
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default reportSlice.reducer;
