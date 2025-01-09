import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL =
  'http://192.168.0.28:4001/auth' || 'http://222.112.27.120:4001/auth';

// 비밀번호 재설정
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/reset-password`, {
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || '비밀번호 재설정 실패');
    }
  }
);

// 관리자 로그인
export const adminSignin = createAsyncThunk(
  'auth/adminSignin',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin-signin`,
        credentials
      );
      return response.data; // JWT 토큰 및 사용자 정보 반환
    } catch (error) {
      return rejectWithValue(error.response.data || '로그인 실패');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    status: 'idle', // 요청 상태
    error: null, // 에러 메시지
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      // localStorage에서 제거
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // 로그인 처리
      .addCase(adminSignin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(adminSignin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token; // JWT 토큰 저장
        state.user = action.payload.admin; // 사용자 정보 저장
        // localStorage에 저장
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.admin));
      })
      .addCase(adminSignin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || '로그인 요청 실패';
      })
      // 비밀번호 재설정 처리
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || '비밀번호 재설정 요청 실패';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
