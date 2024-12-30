import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/signInpage/SignIn';
import Dashboard from './Dashboard';
import MainGrid from './pages/dashboardpage/MainGrid';
import UserManagementPage from './pages/UserManagementPage/UserManagementPage';
import UserDetailManagementPage from './pages/UserManagementPage/UserDetailManagementPage';
import NoticePage from './pages/NoticePage/NoticePage';
import RefundListPage from './pages/RefundManagement/RefundListPage';
import RefundDetailPage from './pages/RefundManagement/RefundDetailPage';
import FAQListPage from './pages/InquiryManagement/FAQListPage';
import FAQDetailPage from './pages/InquiryManagement/FAQDetailPage';
import QNAListPage from './pages/InquiryManagement/QNAListPage';
import QNADetailPage from './pages/InquiryManagement/QNADetailPage';
import {
  ReportCommentListPage,
  ReportUserListPage,
  ReportPostListPage,
  ReportMissionAuthListPage,
  ReportMissionRoomListPage,
  ReportFeedListPage,
} from './pages/ReportPage/ReportListPage';
import ReportDetailPages from './pages/ReportPage/ReportDetailPages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      { index: true, element: <MainGrid /> },
      { path: 'UserManagementPage', element: <UserManagementPage /> },
      { path: 'UserManagementPage/:id', element: <UserDetailManagementPage /> },
      { path: 'announcement', element: <NoticePage /> },
      // 환불 페이지
      { path: 'refund', element: <RefundListPage /> },
      { path: 'refund/:id', element: <RefundDetailPage /> },
      // 문의 사항 페이지
      { path: 'inquiry/faq', element: <FAQListPage /> },
      { path: 'inquiry/faq/:id', element: <FAQDetailPage /> },
      { path: 'inquiry/qna', element: <QNAListPage /> },
      { path: 'inquiry/qna/:id', element: <QNADetailPage /> },
      // 신고 접수
      { path: 'reports/comments', element: <ReportCommentListPage /> },
      { path: 'reports/users', element: <ReportUserListPage /> },
      { path: 'reports/posts', element: <ReportPostListPage /> },
      { path: 'reports/mission-auth', element: <ReportMissionAuthListPage /> },
      { path: 'reports/mission-room', element: <ReportMissionRoomListPage /> },
      { path: 'reports/feeds', element: <ReportFeedListPage /> },
      { path: 'reports/comments/:id', element: <ReportDetailPages.Comment /> },
      { path: 'reports/users/:id', element: <ReportDetailPages.User /> },
      { path: 'reports/posts/:id', element: <ReportDetailPages.Post /> },
      {
        path: 'reports/mission-auth/:id',
        element: <ReportDetailPages.MissionAuth />,
      },
      {
        path: 'reports/mission-room/:id',
        element: <ReportDetailPages.MissionRoom />,
      },
      { path: 'reports/feeds/:id', element: <ReportDetailPages.Feed /> },
    ],
  },
  {
    path: '*', // 정의되지 않은 경로 처리
    element: <Dashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
