import React, { useState, useMemo } from 'react';
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

const ReportList = ({ title, columns, data, detailPath }) => {
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    type: 'all',
    order: 'recent',
    search: '',
  });

  const [currentPage, setCurrentPage] = useState(1);

  // 필터링 및 정렬된 데이터 계산
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // 필터 적용
    if (filters.type !== 'all') {
      filtered = filtered.filter((item) => item.type === filters.type);
    }

    // 검색 적용
    if (filters.search) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }

    // 정렬 적용
    filtered.sort((a, b) => {
      if (filters.order === 'recent') {
        return new Date(b.date) - new Date(a.date);
      }
      return new Date(a.date) - new Date(b.date);
    });

    return filtered;
  }, [data, filters]);

  // 페이지네이션 데이터
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowClick = (index) => {
    navigate(`${detailPath}/${index}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
      </Box>

      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={2}>
          <Select
            value={filters.type}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, type: e.target.value }))
            }
            size="small"
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="warning">경고</MenuItem>
            <MenuItem value="report">신고</MenuItem>
            <MenuItem value="process">처리</MenuItem>
          </Select>
          <Select
            value={filters.order}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, order: e.target.value }))
            }
            size="small"
          >
            <MenuItem value="recent">최근 신고순</MenuItem>
            <MenuItem value="oldest">오래된 신고순</MenuItem>
          </Select>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <TextField
            placeholder="여기에 검색어를 입력하세요"
            size="small"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
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
            {paginatedData.map((row, rowIndex) => (
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
        <Pagination
          count={Math.ceil(filteredData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
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
