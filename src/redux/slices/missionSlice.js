import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/missions';

// 미션 생성
export const createMission = createAsyncThunk(
  'missions/createMission',
  async (data) => {
    const response = await axios.post(`${BASE_URL}`, data);
    return response.data;
  }
);

const missionSlice = createSlice({
  name: 'missions',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMission.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createMission.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(createMission.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default missionSlice.reducer;
