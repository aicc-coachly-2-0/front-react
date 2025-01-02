import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QNAList = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    sort: 'recent',
    category: 'all',
    status: 'all',
    search: '',
  });

  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const data = Array.from({ length: 50 }, (_, index) => ({
    id: 50 - index,
    NO: 50 - index,
    '회원(아이디)': `박준(123***qw)`,
    카테고리: index % 3 === 0 ? '결제' : index % 3 === 1 ? '신고' : '미션',
    제목: `N 번째 문의사항 제목입니다`,
    작성일: '2023-04-26',
    답변일: '2024-12-21 / 05:23AM',
    답변상태: index % 2 === 0 ? '완료' : '대기',
  }));

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sort: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleStatusChange = (e) => {
    setFilters((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleRowClick = (id) => {
    navigate(`/dashboard/inquiry/qna/${id}`);
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
  };

  const filteredData = data.filter((row) => {
    return (
      (filters.category === 'all' || row.카테고리 === filters.category) &&
      (filters.status === 'all' || row.답변상태 === filters.status) &&
      row.제목.includes(filters.search)
    );
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box p={3} width="100%" sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      {/* 상단 제목 및 버튼 */}
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight="bold">
          문의 사항 관리 (Q&A)
        </Typography>
      </Box>

      {/* 검색 및 필터 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" gap={2}>
          <Select value={filters.sort} onChange={handleSortChange} size="small">
            <MenuItem value="recent">최근 작성순</MenuItem>
            <MenuItem value="oldest">오래된 작성순</MenuItem>
          </Select>
          <Select
            value={filters.category}
            onChange={handleCategoryChange}
            size="small"
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="결제">결제</MenuItem>
            <MenuItem value="신고">신고</MenuItem>
            <MenuItem value="미션">미션</MenuItem>
          </Select>
          <Select
            value={filters.status}
            onChange={handleStatusChange}
            size="small"
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="완료">완료</MenuItem>
            <MenuItem value="대기">대기</MenuItem>
          </Select>
        </Box>
        <TextField
          placeholder="여기에 검색어를 입력하세요"
          size="small"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </Box>

      {/* 테이블 */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Checkbox
                  checked={selectedRows.length === data.length}
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < data.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell align="center">NO</TableCell>
              <TableCell align="center">회원(아이디)</TableCell>
              <TableCell align="center">카테고리</TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">작성일</TableCell>
              <TableCell align="center">답변일</TableCell>
              <TableCell align="center">답변상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(row.id)}
              >
                <TableCell align="center">
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleRowSelect(row.id)}
                  />
                </TableCell>
                <TableCell align="center">{row.NO}</TableCell>
                <TableCell align="center">{row['회원(아이디)']}</TableCell>
                <TableCell align="center">{row.카테고리}</TableCell>
                <TableCell align="center">{row.제목}</TableCell>
                <TableCell align="center">{row.작성일}</TableCell>
                <TableCell align="center">{row.답변일}</TableCell>
                <TableCell align="center">{row.답변상태}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredData.length / itemsPerPage)}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default QNAList;
