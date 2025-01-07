import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/auth';

// 비밀번호 재설정
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email) => {
    const response = await axios.post(`${BASE_URL}/reset-password`, { email });
    return response.data;
  }
);

export const adminSignin = createAsyncThunk(
  'auth/adminSignin',
  async (credentials) => {
    const response = await axios.post(`${BASE_URL}/admin-signin`, credentials);
    return response.data; // JWT 토큰 반환
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminSignin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminSignin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token; // JWT 토큰 저장
        state.user = action.payload.user;
      })
      .addCase(adminSignin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
