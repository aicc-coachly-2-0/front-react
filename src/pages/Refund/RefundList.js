import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  TextField,
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RefundList = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: '전체',
    order: '최근 신고순',
    search: '',
  });

  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const rows = Array.from({ length: 50 }, (_, index) => ({
    id: 50 - index,
    applicant: `박준(123**qw)`,
    target: `박준(123**qw)`,
    appliedDate: '2024-12-21 / 05:23AM',
    processedDate: '2023-04-26',
    refundDate: '2023-04-26',
    status: '정상',
  }));

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleOrderChange = (e) => {
    setFilters((prev) => ({ ...prev, order: e.target.value }));
  };

  const handleRowClick = (id) => {
    navigate(`/dashboard/refund/${id}`);
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows.map((row) => row.id));
    }
  };

  const filteredRows = rows.filter((row) =>
    row.applicant.includes(filters.search)
  );

  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ padding: 3, width: '100%', height: '100%', margin: '0 auto' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        환불 접수
      </Typography>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Select
            value={filters.order}
            onChange={handleOrderChange}
            size="small"
            sx={{ width: 150 }}
          >
            <MenuItem value="최근 신고순">최근 신고순</MenuItem>
            <MenuItem value="오래된 신고순">오래된 신고순</MenuItem>
          </Select>
          <Select
            value={filters.category}
            onChange={handleCategoryChange}
            size="small"
            sx={{ width: 150 }}
          >
            <MenuItem value="전체">전체</MenuItem>
            <MenuItem value="카테고리1">카테고리1</MenuItem>
            <MenuItem value="카테고리2">카테고리2</MenuItem>
          </Select>
          <TextField
            variant="outlined"
            placeholder="여기에 검색어를 입력하세요."
            size="small"
            value={filters.search}
            onChange={handleSearchChange}
            sx={{ width: 300 }}
          />
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedRows.length === rows.length}
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < rows.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>NO</TableCell>
              <TableCell>환불 신청인</TableCell>
              <TableCell>환불 대상</TableCell>
              <TableCell>신청일</TableCell>
              <TableCell>처리일</TableCell>
              <TableCell>환불일</TableCell>
              <TableCell>처리 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(row.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleRowSelect(row.id)}
                  />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.applicant}</TableCell>
                <TableCell>{row.target}</TableCell>
                <TableCell>{row.appliedDate}</TableCell>
                <TableCell>{row.processedDate}</TableCell>
                <TableCell>{row.refundDate}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small">
                    {row.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredRows.length / itemsPerPage)}
        page={currentPage}
        onChange={(e, value) => setCurrentPage(value)}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
};

export default RefundList;
