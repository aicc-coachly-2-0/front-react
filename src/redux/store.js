import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import feedReducer from './slices/feedSlice';
import userReducer from './slices/userSlice';
import missionReducer from './slices/missionSlice';
import faqReducer from './slices/faqSlice';
import qnaReducer from './slices/qnaSlice';
import noticeReducer from './slices/noticeSlice';
import reportReducer from './slices/reportSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    feeds: feedReducer,
    user: userReducer,
    missions: missionReducer,
    faqs: faqReducer,
    qnas: qnaReducer,
    notices: noticeReducer,
    reports: reportReducer,
  },
});

export default store;
