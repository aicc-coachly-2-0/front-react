import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = '/faqs';

// FAQ 전체 조회
export const fetchFaqs = createAsyncThunk('faqs/fetchFaqs', async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
});

const faqSlice = createSlice({
  name: 'faqs',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default faqSlice.reducer;
