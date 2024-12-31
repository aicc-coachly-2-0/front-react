import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from '@mui/material';

const RefundDetail = () => {
  const logs = [
    { id: 1, log: 'Coachly AI 서비스 사용', date: '2023-04-26' },
    { id: 2, log: 'Coachly AI 서비스 사용', date: '2023-04-26' },
    { id: 3, log: 'Coachly AI 서비스 사용', date: '2023-04-26' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        환불 접수
      </Typography>
      <Box
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}
      >
        <TextField label="접수 번호" variant="outlined" size="small" />
        <TextField
          label="환불 신청인(아이디)"
          variant="outlined"
          size="small"
        />
        <TextField label="환불 대상" variant="outlined" size="small" />
        <TextField label="환불 사유" variant="outlined" size="small" />
        <TextField label="처리 상태" variant="outlined" size="small" />
        <TextField label="환불 완료일" variant="outlined" size="small" />
      </Box>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        AI 서비스 사용 내역
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>사용 로그</TableCell>
              <TableCell>사용 시각</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.log}</TableCell>
                <TableCell>{log.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={2} sx={{ mt: 2 }} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
          mt: 3,
        }}
      >
        <TextField label="관리자(아이디)" variant="outlined" size="small" />
        <TextField label="처리일" variant="outlined" size="small" />
        <TextField
          label="내용"
          variant="outlined"
          size="small"
          multiline
          rows={3}
          sx={{ gridColumn: 'span 2' }}
        />
      </Box>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="outlined">취소</Button>
        <Button variant="contained">저장</Button>
      </Box>
    </Box>
  );
};

export default RefundDetail;
