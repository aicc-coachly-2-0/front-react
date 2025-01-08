import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/qnas';

// QnA 전체 조회
export const fetchQnas = createAsyncThunk('qnas/fetchQnas', async () => {
  const response = await axios.get(`${BASE_URL}/questions`);
  return response.data;
});

// 단일 질문 조회
export const fetchQuestionDetail = createAsyncThunk('qnas/fetchQuestionDetail', async (question_number) => {
  const response = await axios.get(`${BASE_URL}/questions/${question_number}`);
  return response.data;
});

// 답변 작성
export const createAnswer = createAsyncThunk('qnas/createAnswer', async (answerData) => {
  const response = await axios.post(`${BASE_URL}/answers`, answerData);
  return response.data;
});

// 답변 조회 (질문별)
export const fetchAnswersByQuestion = createAsyncThunk('qnas/fetchAnswersByQuestion', async (question_number) => {
  const response = await axios.get(`${BASE_URL}/questions/${question_number}/answers`);
  return response.data;
});

// 답변 수정
export const updateAnswer = createAsyncThunk('qnas/updateAnswer', async ({ answer_number, answerData }) => {
  const response = await axios.put(`${BASE_URL}/answers/${answer_number}`, answerData);
  return response.data;
});

const qnaSlice = createSlice({
  name: 'qnas',
  initialState: {
    items: [],
    questionDetail: null,
    answers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 전체 QnA 조회
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
      })

      // 단일 질문 조회
      .addCase(fetchQuestionDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestionDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questionDetail = action.payload;
      })
      .addCase(fetchQuestionDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // 답변 작성
      .addCase(createAnswer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAnswer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.answers.push(action.payload); // 작성된 답변을 추가
      })
      .addCase(createAnswer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // 질문에 대한 답변 조회
      .addCase(fetchAnswersByQuestion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnswersByQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.answers = action.payload;
      })
      .addCase(fetchAnswersByQuestion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // 답변 수정
      .addCase(updateAnswer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAnswer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.answers.findIndex(answer => answer.answer_number === action.payload.answer_number);
        if (index !== -1) {
          state.answers[index] = action.payload;
        }
      })
      .addCase(updateAnswer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectQnaStatus = (state) => state.qnas.status;
export const selectQnaError = (state) => state.qnas.error;
export const selectAllQnas = (state) => state.qnas.items;
export const selectQuestionDetail = (state) => state.qnas.questionDetail;
export const selectAnswers = (state) => state.qnas.answers;

export default qnaSlice.reducer;
