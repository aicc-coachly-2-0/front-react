import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { UserInfo } from './components/UserInfo.js';
import { AccountSuspension } from './components/AccountSuspension.js';
import { UserHistory } from './components/UserHistory.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/slices/userSlice.js';
import { fetchReport } from '../../redux/slices/reportSlice';
import { useParams } from 'react-router-dom';

const UserDetailManagement = () => {
  const { user_number } = useParams();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user?.items || []);
  const reports = useSelector((state) => state.reports?.items || []);
  const userStatus = useSelector((state) => state.user?.status || 'idle');
  const reportStatus = useSelector((state) => state.reports?.status || 'idle');

  const user = users.find((u) => String(u.user_number) === String(user_number));

  useEffect(() => {
    if (!users.length && userStatus !== 'loading') {
      dispatch(fetchUsers());
    }
    if (!reports.length && reportStatus !== 'loading') {
      dispatch(fetchReport({ domain: 'post' })); // 예: posts 도메인 사용
    }
  }, [dispatch, users.length, reports.length, userStatus, reportStatus]);
  console.log('user_number from params:', user_number);
  console.log('users from Redux:', users);
  if (userStatus === 'loading' || reportStatus === 'loading') {
    return <div>로딩 중...</div>;
  }
  console.log(user);
  if (!user) {
    return <div>유저 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <Box p={3} width="100%" sx={{ overflowY: 'auto' }}>
      <UserInfo user={user} />
      <AccountSuspension reports={reports} />
      <UserHistory userNumber={user.user_number} />
    </Box>
  );
};

export default UserDetailManagement;
