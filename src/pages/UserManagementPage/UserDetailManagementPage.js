import React from 'react';
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
import SearchIcon from '@mui/icons-material/Search';

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

  const reports = [
    {
      date: '2024-12-20',
      reason: '폭력적인 언어를 지속적으로 사용했습니다',
      reporter: 'p3in',
    },
    {
      date: '2024-12-11',
      reason: '폭력적인 언어를 지속적으로 사용했습니다',
      reporter: 'p3in',
    },
  ];

  const history = Array.from({ length: 5 }, (_, index) => ({
    id: 20 - index,
    serviceName: 'Coachly AI 서비스 사용',
    amount: '₩9,900/month',
    paymentDate: '2023-04-26',
    status: index === 0 ? '미구독' : index === 1 ? '환불 신청중' : '구독중',
  }));

  return (
    <Box p={3} width="100%" sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      {/* 유저 정보 */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          유저 세부 관리
        </Typography>
        <Box mb={2} display="flex" alignItems="center">
          <TextField
            placeholder="검색어를 입력하세요"
            size="small"
            InputProps={{
              startAdornment: (
                <SearchIcon style={{ marginRight: '8px', color: 'gray' }} />
              ),
            }}
            fullWidth
          />
        </Box>

        <Grid container spacing={2} alignItems="center">
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

      {/* 계정 정지 관리 */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          계정 정지 관리
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box>
              {reports.map((report, index) => (
                <Box key={index} mb={1}>
                  <Typography>{`${report.date}: ${report.reason}`}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography>최근 정지 일자: 2024-12-20</Typography>
              <Select defaultValue="정지" size="small">
                <MenuItem value="정지">정지</MenuItem>
                <MenuItem value="해제">해제</MenuItem>
              </Select>
              <Button variant="contained" color="error" sx={{ width: '100%' }}>
                적용
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 유저 히스토리 */}
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          유저 히스토리
        </Typography>
        <Box display="flex" gap={2} mb={3}>
          <Button variant="contained" color="primary">
            결제 내역
          </Button>
          <Button variant="outlined">미션 내역</Button>
          <Button variant="outlined">커뮤니티 내역</Button>
          <Button variant="outlined">피드 내역</Button>
          <Button variant="outlined">문의 내역</Button>
          <Button variant="outlined">신고 내역</Button>
        </Box>
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
              {history.map((entry) => (
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
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination count={5} color="primary" />
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetailManagementPage;
