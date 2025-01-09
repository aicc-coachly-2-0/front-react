import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Pagination, Select, MenuItem, Button 
} from '@mui/material';
import { fetchQnas } from '../../../redux/slices/qnaSlice';

const QNAList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: qnas, status, error } = useSelector((state) => state.qnas);

  // 선택된 질문 상태
  const [selectedQnas, setSelectedQnas] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    sort: 'recent',
    status: 'all',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQnas());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <p>로딩 중...</p>;
  if (status === 'failed') return <p>에러 발생: {error}</p>;

  // 필터링 및 정렬
  const filteredQnas = qnas.filter(
    (qna) =>
      (filters.status === 'all' || qna.status === filters.status) &&
      qna.title.toLowerCase().includes(filters.search.toLowerCase())
  );

  const sortedQnas = [...filteredQnas].sort((a, b) => {
    return filters.sort === 'recent'
      ? new Date(b.created_at) - new Date(a.created_at)
      : new Date(a.created_at) - new Date(b.created_at);
  });

  const paginatedQnas = sortedQnas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 이벤트 핸들러
  const handleSearchChange = (e) => setFilters((prev) => ({ ...prev, search: e.target.value }));
  const handlePageChange = (event, value) => setCurrentPage(value);

  return (
    <Box p={3} width="100%" sx={{ overflowY: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">Q&A 관리</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" gap={2}>
          <Select
            value={filters.sort}
            onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
            size="small"
          >
            <MenuItem value="recent">최신순</MenuItem>
            <MenuItem value="oldest">오래된 순</MenuItem>
          </Select>
        </Box>
        <TextField
          placeholder="검색"
          value={filters.search}
          onChange={handleSearchChange}
          size="small"
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">NO</TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">작성일</TableCell>
              <TableCell align="center">상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedQnas.map((qna) => (
              <TableRow key={qna.id} onClick={() => navigate(`/dashboard/inquiry/qna/${qna.question_number}`)}>
                <TableCell align="center">{qna.question_number}</TableCell>
                <TableCell align="center">{qna.title}</TableCell>
                <TableCell align="center">{new Date(qna.created_at).toLocaleDateString()}</TableCell>
                <TableCell align="center">{qna.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredQnas.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default QNAList;
