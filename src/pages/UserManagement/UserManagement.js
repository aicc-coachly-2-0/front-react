import React, { useEffect, useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/slices/userSlice'; // Redux Slice 연결

const UserManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 상태 가져오기
  const usersFromRedux = useSelector((state) => state.users?.items || []); // Redux에서 가져온 users
  const status = useSelector((state) => state.users?.status || 'idle');
  const error = useSelector((state) => state.users?.error);

  const [users, setUsers] = useState([]); // 주어진 데이터를 가공한 로컬 상태
  const itemsPerPage = 10; // 페이지당 표시할 아이템 수
  const [filters, setFilters] = useState({
    activityState: 'all',
    status: 'all',
    search: '',
    sortKey: 'user_number',
    sortDirection: 'asc',
  });
  const [currentPage, setCurrentPage] = useState(1);

  // 주어진 데이터를 Redux와 연결된 로직으로 변환
  useEffect(() => {
    // Redux에서 데이터를 가져오는 비동기 호출
    dispatch(fetchUsers())
      .unwrap()
      .then((data) => {
        // 주어진 유저 데이터 구조를 변환
        const transformedData = data.map((user) => ({
          user_number: user.user_number, // Redux에서 사용하는 ID 구조에 맞춤
          name: user.user_name,
          email: user.user_email,
          contact: user.user_phone,
          joinDate: new Date(user.created_at).toLocaleDateString(),
          lastActivity: user.created_at, // 예제에서는 생성일을 사용
          reportCount: 0, // 초기화
          status: user.status === 'active' ? '정상' : '정지',
          activityState: '활동', // 기본 값 설정
        }));
        setUsers(transformedData); // 로컬 상태로 설정
      })
      .catch((err) => console.error('API 호출 실패:', err));
  }, [dispatch]);

  // 필터링 및 정렬된 데이터 계산
  const filteredUsers = users
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
      filters.sortKey === key && filters.sortDirection === 'asc'
        ? 'desc'
        : 'asc';

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

  const handleRowClick = (user_number) => {
    navigate(`/dashboard/UserManagement/${user_number}`);
  };

  if (status === 'loading') {
    return <Typography>로딩 중...</Typography>;
  }

  if (status === 'failed') {
    return <Typography color="error">에러: {error}</Typography>;
  }

  return (
    <Box
      p={3}
      width="100%"
      height="100%"
      sx={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
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

      {/* 검색 및 정렬 */}
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
            <MenuItem value="user_number">번호</MenuItem>
            <MenuItem value="name">이름</MenuItem>
            <MenuItem value="joinDate">가입일</MenuItem>
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
            placeholder="검색어 입력"
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
              <TableCell>상태</TableCell>
              <TableCell>활동 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.user_number}
                onClick={() => handleRowClick(user.user_number)}
              >
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{user.user_number}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.activityState}</TableCell>
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
