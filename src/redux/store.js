import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import postReducer from './slice/postSlice';
import feedReducer from './slice/feedSlice';
import userReducer from './slice/userSlice';
import missionReducer from './slice/missionSlice';
import faqReducer from './slice/faqSlice';
import qnaReducer from './slice/qnaSlice';
import noticeReducer from './slice/noticeSlice';
import reportReducer from './slice/reportSlice';

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
