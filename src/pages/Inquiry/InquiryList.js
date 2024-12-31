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
  Checkbox,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';

const InquiryList = ({ title, columns, data }) => {
  return (
    <Box p={3} width="100%" sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Button variant="contained" color="primary">
          항목 추가
        </Button>
      </Box>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={2}>
          <Select defaultValue="recent" size="small">
            <MenuItem value="recent">최근 작성순</MenuItem>
            <MenuItem value="oldest">오래된 작성순</MenuItem>
          </Select>
          <Select defaultValue="all" size="small">
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="answered">답변 완료</MenuItem>
            <MenuItem value="pending">미답변</MenuItem>
          </Select>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <TextField placeholder="검색어를 입력하세요" size="small" />
          <Button variant="outlined">검색</Button>
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Checkbox />
              </TableCell>
              {columns.map((column, index) => (
                <TableCell key={index} align="center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={row.onClick} // 클릭 이벤트 추가
                sx={{ cursor: row.onClick ? 'pointer' : 'default' }}
              >
                <TableCell align="center">
                  <Checkbox />
                </TableCell>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} align="center">
                    {row[column] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination count={5} color="primary" />
      </Box>
    </Box>
  );
};

export default InquiryList;
