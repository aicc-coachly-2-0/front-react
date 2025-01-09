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

const UserManagement = () => {
  const navigate = useNavigate();

  const itemsPerPage = 10; // 페이지당 표시할 아이템 수
  const allUsers = Array.from({ length: 50 }, (_, index) => ({
    id: 50 - index,
    name: index % 2 === 0 ? '박준' : '이주',
    email: 'musi****@gmail.com',
    contact: index % 2 === 0 ? '010-****-4545' : '031-***-****',
    joinDate: `2023-04-${26 + index}`,
    lastActivity: '2024-12-21 / 05:23AM',
    reportCount: index % 3,
    status: index % 2 === 0 ? '정지' : '정상',
    activityState: index % 2 === 0 ? '활동' : '탈퇴',
  }));

  const [filters, setFilters] = useState({
    activityState: 'all',
    status: 'all',
    search: '',
    sortKey: 'id',
    sortDirection: 'desc',
  });

  const [currentPage, setCurrentPage] = useState(1);

  // 필터링 및 정렬된 데이터 계산
  const filteredUsers = allUsers
    .filter((user) =>
      user.name.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter((user) => {
      const matchesActivity =
        filters.activityState === 'all' ||
        user.activityState === filters.activityState;
      const matchesStatus =
        filters.status === 'all' || user.status === filters.status;

      return matchesActivity && matchesStatus;
    })
    .sort((a, b) => {
      const { sortKey, sortDirection } = filters;
      if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  // 현재 페이지에 표시할 데이터 계산
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 검색 핸들러
  const handleSearchChange = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, search: e.target.value }));
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  // 필터 핸들러
  const handleActivityStateChange = (value) => {
    setFilters((prevFilters) => ({ ...prevFilters, activityState: value }));
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  const handleStatusChange = (value) => {
    setFilters((prevFilters) => ({ ...prevFilters, status: value }));
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  // 정렬 핸들러
  const handleSortChange = (key) => {
    const direction =
      filters.sortKey === key && filters.sortDirection === 'desc'
        ? 'asc'
        : 'desc';

    setFilters((prevFilters) => ({
      ...prevFilters,
      sortKey: key,
      sortDirection: direction,
    }));
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
  };

  // 페이지 변경 핸들러
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowClick = (id) => {
    navigate(`/dashboard/UserManagement/${id}`);
  };

  return (
    <Box
      p={3}
      width="100%"
      height="100%"
      sx={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
      {/* 상단 제목과 버튼 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          유저 관리
        </Typography>
      </Box>

      {/* 검색 및 정렬 영역 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" gap={2}>
          <Select
            value={filters.activityState}
            onChange={(e) => handleActivityStateChange(e.target.value)}
            size="small"
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="활동">활동</MenuItem>
            <MenuItem value="탈퇴">탈퇴</MenuItem>
          </Select>
          <Select
            value={filters.sortKey}
            onChange={(e) => handleSortChange(e.target.value)}
            size="small"
          >
            <MenuItem value="joinDate">가입일</MenuItem>
            <MenuItem value="id">번호</MenuItem>
            <MenuItem value="name">이름</MenuItem>
            <MenuItem value="reportCount">신고 횟수</MenuItem>
          </Select>
          <Select
            value={filters.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            size="small"
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="정상">정상</MenuItem>
            <MenuItem value="정지">정지</MenuItem>
          </Select>
        </Box>

        <Box display="flex" alignItems="center">
          <TextField
            placeholder="여기에 검색어를 입력하세요"
            size="small"
            value={filters.search}
            onChange={handleSearchChange}
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
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>NO</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>가입일</TableCell>
              <TableCell>최근 활동</TableCell>
              <TableCell>신고 누적 횟수</TableCell>
              <TableCell>정지 상태</TableCell>
              <TableCell>가입 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleRowClick(user.id)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Checkbox onClick={(e) => e.stopPropagation()} />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.lastActivity}</TableCell>
                <TableCell>{user.reportCount}회</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color={user.status === '정지' ? 'primary' : 'default'}
                    size="small"
                  >
                    {user.status}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color={
                      user.activityState === '활동' ? 'default' : 'secondary'
                    }
                    size="small"
                  >
                    {user.activityState}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredUsers.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default UserManagement;
