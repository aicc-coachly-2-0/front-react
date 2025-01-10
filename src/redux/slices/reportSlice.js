import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/reports';

// 공통 액션 처리 함수
const handlePending = (state) => {
  state.status = 'loading';
};

const handleRejected = (state, action) => {
  state.status = 'failed';
  state.error = action.error.message;
};

// 도메인별 신고 상세 조회
export const fetchDetailReport = createAsyncThunk(
  'reports/fetchDetailReport',
  async ({ domain, NO }) => {
    const cleanedDomain =
      typeof domain === 'string' && domain.endsWith('s')
        ? domain.slice(0, -1)
        : domain;
    const response = await axios.get(
      `${BASE_URL}/report/${cleanedDomain}/${NO}`
    );
    return response.data;
  }
);

// 도메인별 전체 신고 조회
export const fetchReport = createAsyncThunk(
  'reports/fetchReport',
  async ({ domain }) => {
    const cleanedDomain =
      typeof domain === 'string' && domain.endsWith('s')
        ? domain.slice(0, -1)
        : domain;
    const response = await axios.get(`${BASE_URL}/report/${cleanedDomain}`);
    return response.data;
  }
);
// 도메인별 신고 접수
export const createReport = createAsyncThunk(
  'reports/createReport',
  async ({ domain, reportData }) => {
    const cleanedDomain =
      typeof domain === 'string' && domain.endsWith('s')
        ? domain.slice(0, -1)
        : domain;
    const response = await axios.post(
      `${BASE_URL}/report/${cleanedDomain}`,
      reportData
    );
    return response.data;
  }
);

// 특정 유저가 한 신고 조회 라우터
export const fetchMyReporting = createAsyncThunk(
  'reports/fetchMyReporting',
  async ({ user_number }) => {
    const response = await axios.get(`${BASE_URL}/my_reports/${user_number}`);
    return response.data;
  }
);

// 특정 유저가 도메인별로 받은 신고 조회
export const fetchMyReported = createAsyncThunk(
  'reports/fetchMyReported',
  async ({ user_number, domain }) => {
    const cleanedDomain =
      typeof domain === 'string' && domain.endsWith('s')
        ? domain.slice(0, -1)
        : domain;
    const response = await axios.get(
      `${BASE_URL}/user/${user_number}?domain=${cleanedDomain}`
    );
    return response.data;
  }
);

// 신고 처리 생성
export const processReport = createAsyncThunk(
  'reports/processReport',
  async ({ domain, NO, processData }) => {
    const cleanedDomain =
      typeof domain === 'string' && domain.endsWith('s')
        ? domain.slice(0, -1)
        : domain;
    const response = await axios.put(
      `${BASE_URL}/process/${cleanedDomain}/${NO}`,
      processData
    );
    return response.data;
  }
);

// 신고 처리 조회
export const fetchProcessedReport = createAsyncThunk(
  'reports/fetchProcessedReport',
  async ({ domain, NO }) => {
    const cleanedDomain =
      typeof domain === 'string' && domain.endsWith('s')
        ? domain.slice(0, -1)
        : domain;
    const response = await axios.get(
      `${BASE_URL}/process/${cleanedDomain}/${NO}`
    );
    return response.data;
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    items: [],
    selectedReport: null,
    reportManagement: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetSelectedReport(state) {
      state.selectedReport = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 공통 액션 처리
      .addCase(fetchDetailReport.pending, handlePending)
      .addCase(fetchReport.pending, handlePending)
      .addCase(fetchMyReporting.pending, handlePending)
      .addCase(fetchMyReported.pending, handlePending)
      .addCase(processReport.pending, handlePending)
      .addCase(fetchProcessedReport.pending, handlePending)

      // 성공 처리
      .addCase(fetchDetailReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reportManagement = action.payload;
        state.items = action.payload;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMyReporting.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMyReported.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProcessedReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedReport = action.payload;
      })

      // 실패 처리
      .addCase(fetchDetailReport.rejected, handleRejected)
      .addCase(fetchReport.rejected, handleRejected)
      .addCase(fetchMyReporting.rejected, handleRejected)
      .addCase(fetchMyReported.rejected, handleRejected)
      .addCase(processReport.rejected, handleRejected)
      .addCase(fetchProcessedReport.rejected, handleRejected)

      // 신고 처리 후 업데이트
      .addCase(processReport.fulfilled, (state, action) => {
        // 처리 후 받은 데이터로 상태 업데이트
        state.items = state.items.map((report) =>
          report.report_number === action.payload.report_number
            ? action.payload
            : report
        );
      });
  },
});

export default reportSlice.reducer;
