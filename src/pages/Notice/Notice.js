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
  Checkbox,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
const Notice = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState(
    Array.from({ length: 50 }, (_, index) => ({
      id: 50 - index,
      author: index % 2 === 0 ? '박준' : '이주',
      title: `${50 - index} 번째 공지사항 제목입니다`,
      date: '2024-12-21 / 05:23AM',
      status: index % 2 === 0 ? '공지' : '정상',
    }))
  );

  const [selectedNotices, setSelectedNotices] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    sort: 'recent',
    status: 'all',
    sortDirection: 'desc',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleAddNotice = () => {
    navigate('/dashboard/notice/add');
  };

  const handleDeleteSelected = () => {
    if (selectedNotices.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }
    if (window.confirm('선택된 공지를 삭제하시겠습니까?')) {
      setNotices((prev) =>
        prev.filter((notice) => !selectedNotices.includes(notice.id))
      );
      setSelectedNotices([]);
      alert('삭제 완료');
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedNotices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredNotices = notices.filter(
    (notice) =>
      (filters.status === 'all' || notice.status === filters.status) &&
      notice.title.includes(filters.search)
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleSortChange = (sortKey) => {
    setFilters((prev) => ({
      ...prev,
      sort: sortKey,
      sortDirection:
        prev.sort === sortKey && prev.sortDirection === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedNotices = [...filteredNotices].sort((a, b) => {
    const compareKey = filters.sort === 'recent' ? 'date' : 'id';
    const isAscending = filters.sortDirection === 'asc';

    const comparison =
      compareKey === 'date'
        ? new Date(a[compareKey]) - new Date(b[compareKey])
        : a[compareKey] - b[compareKey];

    return isAscending ? comparison : -comparison;
  });

  const paginatedNotices = sortedNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box p={3} width="100%" height="100%" sx={{ overflowY: 'auto' }}>
      {/* 상단 영역 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          공지
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={handleAddNotice}>
            항목 추가
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected}
          >
            선택 삭제
          </Button>
        </Box>
      </Box>

      {/* 검색 및 필터 영역 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" gap={2}>
          <Select
            value={filters.sort}
            onChange={(e) => handleSortChange(e.target.value)}
            size="small"
          >
            <MenuItem value="recent">최근 작성순</MenuItem>
            <MenuItem value="oldest">오래된 작성순</MenuItem>
          </Select>
          <Select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            size="small"
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="공지">공지</MenuItem>
            <MenuItem value="정상">정상</MenuItem>
          </Select>
        </Box>
        <Box display="flex" alignItems="center">
          <TextField
            placeholder="검색어를 입력하세요"
            size="small"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
          <Button>
            <SearchIcon />
          </Button>
        </Box>
      </Box>

      {/* 테이블 */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>NO</TableCell>
              <TableCell>작성자</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>게시일</TableCell>
              <TableCell>노출상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedNotices.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedNotices.includes(notice.id)}
                    onChange={() => handleCheckboxChange(notice.id)}
                  />
                </TableCell>
                <TableCell>{notice.id}</TableCell>
                <TableCell>{notice.author}</TableCell>
                <TableCell>{notice.title}</TableCell>
                <TableCell>{notice.date}</TableCell>
                <TableCell>{notice.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredNotices.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Notice;
