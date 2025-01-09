import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotices } from '../../redux/slices/noticeSlice';

const Notice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 상태
  const {
    items: notices = [],
    status,
    error,
  } = useSelector((state) => state.notices);

  // 상태 관리
  const [filters, setFilters] = useState({
    search: '',
    sort: 'recent',
    status: 'all',
  });
  const [selectedNotices, setSelectedNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNotices());
    }
  }, [status, dispatch]);

  const handleAddNotice = () => {
    navigate('/dashboard/notice/add');
  };

  const handleDeleteSelected = () => {
    if (selectedNotices.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }
    if (window.confirm('선택된 공지를 삭제하시겠습니까?')) {
      alert('선택된 공지가 삭제되었습니다.');
    }
  };

  const handleCheckboxChange = (noticeId) => {
    setSelectedNotices((prev) =>
      prev.includes(noticeId)
        ? prev.filter((id) => id !== noticeId)
        : [...prev, noticeId]
    );
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSortChange = (sortKey) => {
    setFilters((prev) => ({
      ...prev,
      sort: sortKey,
    }));
  };

  // 필터링된 공지 목록
  const filteredNotices = notices.filter(
    (notice) =>
      (filters.status === 'all' || notice.state === filters.status) &&
      notice.title?.toLowerCase().includes(filters.search.toLowerCase())
  );

  // 페이지네이션 처리
  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (status === 'loading') {
    return (
      <Typography variant="h6" align="center">
        공지사항을 불러오는 중입니다...
      </Typography>
    );
  }

  if (status === 'failed') {
    return (
      <Typography variant="h6" align="center" color="error">
        에러 발생: {error}
      </Typography>
    );
  }

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
            <MenuItem value="active">활성</MenuItem>
            <MenuItem value="archived">보관</MenuItem>
            <MenuItem value="deleted">삭제</MenuItem>
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
              <TableRow
                key={notice.notice_number}
                onClick={() =>
                  navigate(`/dashboard/notice/${notice.notice_number}`)
                }
                style={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedNotices.includes(notice.notice_number)}
                    onChange={() => handleCheckboxChange(notice.notice_number)}
                  />
                </TableCell>
                <TableCell>{notice.notice_number}</TableCell>
                <TableCell>{notice.admin_number}</TableCell>
                <TableCell>{notice.title}</TableCell>
                <TableCell>{notice.created_at}</TableCell>
                <TableCell>{notice.state}</TableCell>
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
