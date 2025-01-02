import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/signIn/SignIn';

// app이라고 생각하자 바꿔도 된다. app으로
import App from './App';

// 대시보드
import Dashboard from './pages/dashboard/Dashboard';
// 유저
import UserManagement from './pages/UserManagement/UserManagement';
import UserDetailManagement from './pages/UserManagement/UserDetailManagement';
// 공지
import Notice from './pages/Notice/Notice';
import NoticeAdd from './pages/Notice/NoticeAdd';
// 환불
import RefundList from './pages/Refund/RefundList';
import RefundDetail from './pages/Refund/RefundDetail';
// 문의사항
import FAQList from './pages/Inquiry/FAQ/FAQList';
import FAQDetail from './pages/Inquiry/FAQ/FAQDetail';
import QNAList from './pages/Inquiry/QNA/QNAList';
import QNADetail from './pages/Inquiry/QNA/QNADetail';
// 신고
import {
  ReportCommentList,
  ReportUserList,
  ReportPostList,
  ReportMissionAuthList,
  ReportMissionRoomList,
  ReportFeedList,
} from './pages/Report/ReportList';
import ReportDetails from './pages/Report/ReportDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/dashboard',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      // 유저관리 페이지
      { path: 'UserManagement', element: <UserManagement /> },
      { path: 'UserManagement/:id', element: <UserDetailManagement /> },
      // 공지 페이지
      { path: 'notice', element: <Notice /> },
      {
        path: 'notice/add',
        element: <NoticeAdd />,
      },
      // 환불 페이지
      { path: 'refund', element: <RefundList /> },
      { path: 'refund/:id', element: <RefundDetail /> },
      // 문의 사항 페이지
      { path: 'inquiry/faq', element: <FAQList /> },
      { path: 'inquiry/faq/add', element: <FAQDetail /> },
      { path: 'inquiry/qna', element: <QNAList /> },
      { path: 'inquiry/qna/:id', element: <QNADetail /> },
      // 신고 접수
      { path: 'reports/comments', element: <ReportCommentList /> },
      { path: 'reports/users', element: <ReportUserList /> },
      { path: 'reports/posts', element: <ReportPostList /> },
      { path: 'reports/mission-auth', element: <ReportMissionAuthList /> },
      { path: 'reports/mission-room', element: <ReportMissionRoomList /> },
      { path: 'reports/feeds', element: <ReportFeedList /> },
      { path: 'reports/comments/:id', element: <ReportDetails.Comment /> },
      { path: 'reports/users/:id', element: <ReportDetails.User /> },
      { path: 'reports/posts/:id', element: <ReportDetails.Post /> },
      {
        path: 'reports/mission-auth/:id',
        element: <ReportDetails.MissionAuth />,
      },
      {
        path: 'reports/mission-room/:id',
        element: <ReportDetails.MissionRoom />,
      },
      { path: 'reports/feeds/:id', element: <ReportDetails.Feed /> },
    ],
  },
  {
    path: '*', // 정의되지 않은 경로 처리
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
