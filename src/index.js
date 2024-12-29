import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/signInpage/SignIn';
import Dashboard from './Dashboard';
import MainGrid from './pages/dashboardpage/MainGrid';
import UserManagementPage from './pages/UserManagementPage/UserManagementPage';
import UserDetailManagementPage from './pages/UserManagementPage/UserDetailManagementPage';
import CircularProgressVariants from './components/CircularProgressVariants'; // 로딩 컴포넌트
import NoticePage from './pages/NoticePage/NoticePage';

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
      {
        path: 'UserDetailManagementPage',
        element: <UserDetailManagementPage />,
      },
      { path: 'announcement', element: <NoticePage /> },
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
    <RouterProvider
      router={router}
      fallbackElement={<CircularProgressVariants />} // 로딩 화면 추가
    />
  </React.StrictMode>
);
