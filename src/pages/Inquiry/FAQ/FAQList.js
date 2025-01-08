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
import { fetchFaqs } from '../../../redux/slices/faqSlice';

const FAQ = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 상태
  const {
    items: faqs = [],
    status,
    error,
  } = useSelector((state) => state.faqs);

  // 상태 관리
  const [filters, setFilters] = useState({
    search: '',
    sort: 'recent',
    status: 'all',
  });
  const [selectedFaqs, setSelectedFaqs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFaqs());
    }
  }, [status, dispatch]);

  // FAQ 추가 페이지로 이동
  const handleAddFAQ = () => {
    navigate('/dashboard/inquiry/faq/add'); // 경로 수정
  };

  // FAQ 선택 삭제
  const handleDeleteSelected = () => {
    if (selectedFaqs.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }
    if (window.confirm('선택된 FAQ를 삭제하시겠습니까?')) {
      alert('선택된 FAQ가 삭제되었습니다.');
    }
  };

  // FAQ 선택 처리
  const handleCheckboxChange = (faqId) => {
    setSelectedFaqs((prev) =>
      prev.includes(faqId)
        ? prev.filter((id) => id !== faqId)
        : [...prev, faqId]
    );
  };

  // 페이지 변경 처리
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // 정렬 변경 처리
  const handleSortChange = (sortKey) => {
    setFilters((prev) => ({
      ...prev,
      sort: sortKey,
    }));
  };

  // 필터링된 FAQ 목록
  const filteredFaqs = faqs.filter(
    (faq) =>
      (filters.status === 'all' || faq.state === filters.status) &&
      faq.content?.toLowerCase().includes(filters.search.toLowerCase())
  );

  // 페이지네이션 처리
  const paginatedFaqs = filteredFaqs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // FAQ 상태에 따른 로딩 및 에러 처리
  if (status === 'loading') {
    return (
      <Typography variant="h6" align="center">
        FAQ를 불러오는 중입니다...
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
          자주 묻는 질문 (FAQ)
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={handleAddFAQ}>
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
              <TableCell>내용</TableCell>
              <TableCell>게시일</TableCell>
              <TableCell>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFaqs.map((faq) => (
              <TableRow
                key={faq.faq_number}
                onClick={() => navigate(`/dashboard/inquiry/faq/${faq.faq_number}`)} // 경로 수정
                style={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedFaqs.includes(faq.faq_number)}
                    onChange={() => handleCheckboxChange(faq.faq_number)}
                  />
                </TableCell>
                <TableCell>{faq.faq_number}</TableCell>
                <TableCell>{faq.admin_number}</TableCell>
                <TableCell>{faq.content}</TableCell>
                <TableCell>{faq.created_at}</TableCell>
                <TableCell>{faq.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredFaqs.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default FAQ;
