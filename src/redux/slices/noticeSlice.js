import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/notice';

// 공지사항 리스트 가져오기
export const fetchNotices = createAsyncThunk(
  'notices/fetchNotices',
  async () => {
    const response = await axios.get(`${BASE_URL}/notices`);
    return response.data;
  }
);

// 공지 상세보기 Thunk 추가
export const fetchNoticeDetail = createAsyncThunk(
  'notices/fetchNoticeDetail',
  async (noticeId) => {
    const response = await axios.get(`${BASE_URL}/notices/${noticeId}`);
    return response.data;
  }
);

// 공지 추가 Thunk
export const addNotice = createAsyncThunk(
  'notices/addNotice',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/notices`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const noticeSlice = createSlice({
  name: 'notices',
  initialState: {
    items: [], // 공지 리스트
    selectedNotice: null, // 상세보기용 공지
    status: 'idle', // 요청 상태
    error: null, // 에러 상태
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 공지 리스트 처리
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
      })
      // 공지 상세보기 처리
      .addCase(fetchNoticeDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNoticeDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedNotice = action.payload;
      })
      .addCase(fetchNoticeDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // 공지 추가 처리
      .addCase(addNotice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNotice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload); // 리스트에 새 공지 추가
      })
      .addCase(addNotice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default noticeSlice.reducer;
