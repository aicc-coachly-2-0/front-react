import React from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  TextField,
  IconButton,
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const RefundList = () => {
  const rows = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    applicant: `박준(123**qw)`,
    target: `박준(123**qw)`,
    appliedDate: '2024-12-21 05:23AM',
    processedDate: '2023-04-26',
    refundDate: '2023-04-26',
    status: '정상',
  }));

  return (
    <Box sx={{ padding: 3, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        환불 접수
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Select defaultValue="전체" size="small" sx={{ width: 120 }}>
            <MenuItem value="전체">전체</MenuItem>
            <MenuItem value="최근 신고순">최근 신고순</MenuItem>
          </Select>
          <Select defaultValue="전체" size="small" sx={{ width: 120 }}>
            <MenuItem value="전체">전체</MenuItem>
            <MenuItem value="카테고리1">카테고리1</MenuItem>
          </Select>
          <TextField
            variant="outlined"
            placeholder="여기에 검색어를 입력하세요."
            size="small"
            sx={{ width: 300 }}
          />
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>NO</TableCell>
              <TableCell>환불 신청인</TableCell>
              <TableCell>환불 대상</TableCell>
              <TableCell>신청일</TableCell>
              <TableCell>처리일</TableCell>
              <TableCell>환불일</TableCell>
              <TableCell>처리 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.applicant}</TableCell>
                <TableCell>{row.target}</TableCell>
                <TableCell>{row.appliedDate}</TableCell>
                <TableCell>{row.processedDate}</TableCell>
                <TableCell>{row.refundDate}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small">
                    {row.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={3}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
};

export default RefundList;
