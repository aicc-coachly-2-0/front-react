import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Pagination, Select, MenuItem 
} from '@mui/material';
import { fetchFaqs } from '../../../redux/slices/faqSlice';

// FAQ 목록 컴포넌트
const FAQList = () => {
  const dispatch = useDispatch();
  const { items: faqs, status, error } = useSelector((state) => state.faqs);
  const navigate = useNavigate();

  // 추가 페이지로 이동
  const handleAddFAQ = () => navigate('/dashboard/inquiry/faq/add');
   // 상세 페이지로 이동
  const handleRowClick = (faq_number) => {
    navigate(`/dashboard/inquiry/faq/${faq_number}`);
  };

  // 선택된 FAQ 항목 ID 저장
  const [selectedFaqs, setSelectedFaqs] = useState([]);
  
  // 필터 및 정렬 상태 저장
  const [filters, setFilters] = useState({
    search: '',
    sort: 'recent',
    category: 'all',
    status: 'all',
    sortDirection: 'desc',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // FAQ 데이터 로드
    if (status === 'idle') {
      dispatch(fetchFaqs());
    }
  }, [dispatch, status]);

  // 페이지 변경 시 선택 초기화
  useEffect(() => {
    setSelectedFaqs([]);
  }, [currentPage]);

  if (status === 'loading') return <p>로딩 중...</p>;
  if (status === 'failed') return <p>에러 발생: {error}</p>;

  // 필터 조건에 맞는 FAQ 필터링
  const filteredFaqs = faqs.filter(
    (faq) =>
      (filters.status === 'all' || faq.state === filters.status) &&
      (faq.content && faq.content.includes(filters.search)) // faq.content가 정의되어 있는지 확인
  );

  // 정렬된 FAQ 목록 생성
  const sortedFaqs = [...filteredFaqs].sort((a, b) => {
    const compareKey = filters.sort === 'recent' ? 'created_at' : 'faq_number';
    const isAscending = filters.sortDirection === 'asc';

    const aValue = new Date(a[compareKey]);
    const bValue = new Date(b[compareKey]);

    return isAscending ? aValue - bValue : bValue - aValue;
  });

  // 현재 페이지에 해당하는 FAQ 목록
  const paginatedFaqs = sortedFaqs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

 
  const handleDeleteSelected = () => {
    if (selectedFaqs.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }
    if (window.confirm('선택된 FAQ를 삭제하시겠습니까?')) {
      // 삭제 요청을 디스패치하거나 상태 관리
      alert('삭제 완료');
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedFaqs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleSortChange = (sortKey) => {
    setFilters((prev) => {
      const newSortDirection = sortKey === 'recent' ? 'desc' : 'asc';  // 'recent'은 내림차순, 'oldest'는 오름차순
      return {
        ...prev,
        sort: sortKey,
        sortDirection: newSortDirection,  // 정렬 기준에 맞게 방향을 설정
      };
    });
  };

  return (
    <Box p={3} width="100%" sx={{ overflowY: 'auto' }}>
      {/* 상단 영역 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          문의 사항 관리 (FAQ)
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={handleAddFAQ}>
            항목 추가
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteSelected}>
            선택 삭제
          </Button>
        </Box>
      </Box>

      {/* 검색 및 필터 영역 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" gap={2}>
          <Select
            value={filters.sort}
            onChange={(e) => 
              handleSortChange(e.target.value)}
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
            <MenuItem value="active">정상</MenuItem>
            <MenuItem value="inactive">정지</MenuItem>
          </Select>
        </Box>
        <TextField
          placeholder="검색어를 입력하세요"
          size="small"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />
      </Box>

      {/* FAQ 테이블 */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Checkbox />
              </TableCell>
              {['NO', '작성자', '카테고리', '제목', '게시일', '상태'].map(
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
            <TableRow key={faq.faq_number} onClick={() => handleRowClick(faq.faq_number)}>
              <TableCell align="center">
                <Checkbox
                  checked={selectedFaqs.includes(faq.faq_number)}
                  onChange={() => handleCheckboxChange(faq.faq_number)}
                />
              </TableCell>
              <TableCell align="center">{faq.faq_number}</TableCell>
              <TableCell align="center">{faq.admin_number}</TableCell>
              <TableCell align="center">{faq.question_classification_number}</TableCell>
              <TableCell align="center">{faq.content}</TableCell>
              <TableCell align="center">
                {new Date(faq.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">{faq.state}</TableCell>
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
