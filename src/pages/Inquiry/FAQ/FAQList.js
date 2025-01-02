import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';

const FAQList = () => {
  const navigate = useNavigate();

  const [faqs, setFaqs] = useState(
    Array.from({ length: 50 }, (_, index) => ({
      id: 50 - index,
      author: index % 2 === 0 ? '박준' : '이수',
      category: index % 3 === 0 ? '공지' : '이벤트',
      title: `${50 - index}번째 FAQ 제목입니다.`,
      date: `2024-12-${21 - (index % 10)}T05:23:00Z`, // ISO 형식으로 날짜 저장
      status: index % 2 === 0 ? '정상' : '정지',
    }))
  );

  const [selectedFaqs, setSelectedFaqs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    sort: 'recent',
    category: 'all',
    status: 'all',
    sortDirection: 'desc',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleAddFAQ = () => {
    navigate('/dashboard/inquiry/faq/add');
  };

  const handleDeleteSelected = () => {
    if (selectedFaqs.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }
    if (window.confirm('선택된 FAQ를 삭제하시겠습니까?')) {
      setFaqs((prev) => prev.filter((faq) => !selectedFaqs.includes(faq.id)));
      setSelectedFaqs([]);
      alert('삭제 완료');
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedFaqs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    // 페이지나 데이터 변경 시 선택 초기화
    setSelectedFaqs([]);
  }, [currentPage, faqs]);

  const filteredFaqs = faqs.filter(
    (faq) =>
      (filters.status === 'all' || faq.status === filters.status) &&
      (filters.category === 'all' || faq.category === filters.category) &&
      faq.title.includes(filters.search)
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

  const sortedFaqs = [...filteredFaqs].sort((a, b) => {
    const compareKey = filters.sort === 'recent' ? 'date' : 'id';
    const isAscending = filters.sortDirection === 'asc';

    const aValue = compareKey === 'date' ? new Date(a.date) : a.id;
    const bValue = compareKey === 'date' ? new Date(b.date) : b.id;

    return isAscending ? aValue - bValue : bValue - aValue;
  });

  const paginatedFaqs = sortedFaqs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box p={3} width="100%" sx={{ overflowY: 'auto' }}>
      {/* 상단 영역 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          문의 사항 관리 (FAQ)
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
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
            size="small"
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="공지">공지</MenuItem>
            <MenuItem value="이벤트">이벤트</MenuItem>
          </Select>
          <Select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            size="small"
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="정상">정상</MenuItem>
            <MenuItem value="정지">정지</MenuItem>
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
        </Box>
      </Box>

      {/* 테이블 */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Checkbox />
              </TableCell>
              {['NO', '작성자', '카테고리', '제목', '게시일', '노출상태'].map(
                (column, index) => (
                  <TableCell key={index} align="center">
                    {column}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFaqs.map((faq) => (
              <TableRow key={faq.id}>
                <TableCell align="center">
                  <Checkbox
                    checked={selectedFaqs.includes(faq.id)}
                    onChange={() => handleCheckboxChange(faq.id)}
                  />
                </TableCell>
                <TableCell align="center">{faq.id}</TableCell>
                <TableCell align="center">{faq.author}</TableCell>
                <TableCell align="center">{faq.category}</TableCell>
                <TableCell align="center">{faq.title}</TableCell>
                <TableCell align="center">
                  {new Date(faq.date).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{faq.status}</TableCell>
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

export default FAQList;
