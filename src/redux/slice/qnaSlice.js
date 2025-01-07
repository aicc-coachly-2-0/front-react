import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = '/qnas';

// QnA 전체 조회
export const fetchQnas = createAsyncThunk('qnas/fetchQnas', async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
});

const qnaSlice = createSlice({
  name: 'qnas',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQnas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQnas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchQnas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default qnaSlice.reducer;
