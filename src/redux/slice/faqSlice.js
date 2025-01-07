import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/faqs';

// FAQ 전체 조회
export const fetchFaqs = createAsyncThunk('faqs/fetchFaqs', async () => {
  // 로컬 스토리지에서 토큰 가져오기
  const token = localStorage.getItem('token'); // 로컬 스토리지에서 'token'을 가져옵니다.

  if (!token) {
    throw new Error('로그인이 필요합니다.'); // 토큰이 없으면 오류를 발생시킵니다.
  }

  // 서버에 요청을 보낼 때 토큰을 Authorization 헤더에 포함
  const response = await axios.get(`${BASE_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data; // 서버에서 받은 FAQ 데이터
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
