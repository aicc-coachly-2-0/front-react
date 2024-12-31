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
import { useNavigate } from 'react-router-dom';

// ReportListPage 기본 컴포넌트
const ReportList = ({ title, columns, data, detailPath }) => {
  const navigate = useNavigate();

  const handleRowClick = (index) => {
    navigate(`${detailPath}/${index}`);
  };

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
          <Select defaultValue="all" size="small">
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="warning">경고</MenuItem>
            <MenuItem value="report">신고</MenuItem>
            <MenuItem value="process">처리</MenuItem>
          </Select>
          <Select defaultValue="recent" size="small">
            <MenuItem value="recent">최근 신고순</MenuItem>
            <MenuItem value="oldest">오래된 신고순</MenuItem>
          </Select>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <TextField placeholder="여기에 검색어를 입력하세요" size="small" />
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
                onClick={() => handleRowClick(row.NO)}
                sx={{ cursor: 'pointer' }}
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

export default ReportList;

// 리스트 페이지별 내보내기 (정확한 경로 확인 필요)
export { ReportCommentList } from './Reportlist/ReportCommentList';
export { ReportUserList } from './Reportlist/ReportUserList';
export { ReportPostList } from './Reportlist/ReportPostList';
export { ReportMissionAuthList } from './Reportlist/ReportMissionAuthList';
export { ReportMissionRoomList } from './Reportlist/ReportMissionRoomList';
export { ReportFeedList } from './Reportlist/ReportFeedList';
