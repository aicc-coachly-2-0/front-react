import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/faqs';

// FAQ 전체 조회
export const fetchFaqs = createAsyncThunk(
  'faqs/fetchFaqs', 
  async () => {
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

// FAQ 상세 조회
export const fetchFaqDetail = createAsyncThunk(
  'faqs/fetchFaqDetail', 
    async (faq_number) => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 'token'을 가져옵니다.
    if (!token) {
      throw new Error('로그인이 필요합니다.'); // 토큰이 없으면 오류를 발생시킵니다.
    }
    // 서버에 요청을 보낼 때 토큰을 Authorization 헤더에 포함
    const response = await axios.get(`${BASE_URL}/${faq_number}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  return response.data; // 서버에서 받은 FAQ 상세 데이터
});

// FAQ 생성
export const createFaq = createAsyncThunk(
  'faqs/createFaq', 
  async (faqData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }
    const response = await axios.post(`${BASE_URL}`, faqData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  return response.data;
});

// FAQ 수정
export const updateFaq = createAsyncThunk(
  'faqs/updateFaq', 
  async ({ faq_number, faqData }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }
    console.log('수정될 FAQ 번호:', faq_number);
    console.log('수정될 데이터:', faqData);
  
    const response = await axios.patch(`${BASE_URL}/${faq_number}`, faqData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('API 응답:', response.data);

  return response.data;
});


const faqSlice = createSlice({
  name: 'faqs',
  initialState: {
    items: [],
    faqDetail: null,  // 상세 조회 데이터를 저장할 상태 추가
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
      })
      // 상세 조회 추가
      .addCase(fetchFaqDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFaqDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.faqDetail = action.payload;  // 상세 데이터를 저장
      })
      .addCase(fetchFaqDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
       // createFaq 액션 처리
       .addCase(createFaq.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createFaq.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload); // 새 FAQ를 추가
      })
      .addCase(createFaq.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // updateFaq 액션 처리
      .addCase(updateFaq.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateFaq.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // 수정된 FAQ 항목을 업데이트
        const index = state.items.findIndex(faq => faq.faq_number === action.payload.faq_number);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    },
});


export const selectFaqDetail = (state) => state.faqs.faqDetail;
export const selectStatus = (state) => state.faqs.status;
export const selectError = (state) => state.faqs.error;


export default faqSlice.reducer;
