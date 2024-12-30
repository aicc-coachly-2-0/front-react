import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Checkbox,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';

const UserDetailManagementPage = () => {
  const user = {
    id: 'abc1234',
    name: '김OO',
    nickname: 'sirspdia',
    email: 'abcd123@gmail.com',
    contact: '010-1234-1234',
    birthDate: '1987-12-12',
    gender: '남성',
  };

  const paymentHistory = [
    {
      id: 20,
      serviceName: 'Coachly AI 서비스 사용',
      amount: '₩9,900/month',
      paymentDate: '2023-04-26',
      status: '구독중',
    },
    {
      id: 19,
      serviceName: 'Coachly AI 서비스 사용',
      amount: '₩9,900/month',
      paymentDate: '2023-04-26',
      status: '구독중',
    },
  ];

  const missionHistory = [
    {
      id: 1,
      serviceName: '미션 1 완료',
      amount: '-',
      paymentDate: '2023-05-01',
      status: '완료',
    },
    {
      id: 2,
      serviceName: '미션 2 실패',
      amount: '-',
      paymentDate: '2023-05-02',
      status: '실패',
    },
  ];

  const communityHistory = [
    {
      id: 1,
      serviceName: '게시글 작성',
      amount: '-',
      paymentDate: '2023-06-01',
      status: '완료',
    },
    {
      id: 2,
      serviceName: '댓글 작성',
      amount: '-',
      paymentDate: '2023-06-02',
      status: '완료',
    },
  ];

  const [currentHistory, setCurrentHistory] = useState(paymentHistory);
  const [currentTitle, setCurrentTitle] = useState('결제 내역');

  const handleHistoryChange = (history, title) => {
    setCurrentHistory(history);
    setCurrentTitle(title);
  };

  return (
    <Box p={3} width="100%" sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      {/* 유저 정보 */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          유저 세부 관리
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(user).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <TextField
                label={key.toUpperCase()}
                value={value}
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 유저 히스토리 */}
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          유저 히스토리
        </Typography>
        {/* 히스토리 필터 버튼 */}
        <Box display="flex" gap={2} mb={3}>
          <Button
            variant={
              currentHistory === paymentHistory ? 'contained' : 'outlined'
            }
            color="primary"
            onClick={() => handleHistoryChange(paymentHistory, '결제 내역')}
          >
            결제 내역
          </Button>
          <Button
            variant={
              currentHistory === missionHistory ? 'contained' : 'outlined'
            }
            onClick={() => handleHistoryChange(missionHistory, '미션 내역')}
          >
            미션 내역
          </Button>
          <Button
            variant={
              currentHistory === communityHistory ? 'contained' : 'outlined'
            }
            onClick={() =>
              handleHistoryChange(communityHistory, '커뮤니티 내역')
            }
          >
            커뮤니티 내역
          </Button>
        </Box>

        {/* 히스토리 테이블 제목 */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {currentTitle}
        </Typography>

        {/* 히스토리 테이블 */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Checkbox />
                </TableCell>
                <TableCell align="center">NO</TableCell>
                <TableCell align="center">서비스명</TableCell>
                <TableCell align="center">금액</TableCell>
                <TableCell align="center">서비스 결제일</TableCell>
                <TableCell align="center">구독 상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentHistory.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell align="center">
                    <Checkbox />
                  </TableCell>
                  <TableCell align="center">{entry.id}</TableCell>
                  <TableCell align="center">{entry.serviceName}</TableCell>
                  <TableCell align="center">{entry.amount}</TableCell>
                  <TableCell align="center">{entry.paymentDate}</TableCell>
                  <TableCell align="center">{entry.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* 페이지네이션 */}
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination count={5} color="primary" />
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetailManagementPage;
