import React from 'react';
import { Box } from '@mui/material';
import { UserInfo } from './components/UserInfo.js';
import { AccountSuspension } from './components/AccountSuspension.js';
import { UserHistory } from './components/UserHistory.js';
import { mockUser, mockReports, mockHistory } from './components/mockData.js';

const UserDetailManagement = () => {
  return (
    <Box p={3} width="100%" sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <UserInfo user={mockUser} />
      <AccountSuspension reports={mockReports} />
      <UserHistory histories={mockHistory} />
    </Box>
  );
};

export default UserDetailManagement;
