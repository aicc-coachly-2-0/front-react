import React from 'react';
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
import { useNavigate } from 'react-router-dom'; // 추가

const UserManagementPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const users = Array.from({ length: 10 }, (_, index) => ({
    id: 20 - index,
    name: index % 2 === 0 ? '박준' : '이주',
    email: 'musi****@gmail.com',
    contact: index % 2 === 0 ? '010-****-4545' : '031-***-****',
    joinDate: '2023-04-26',
    lastActivity: '2024-12-21 / 05:23AM',
    reportCount: `${index % 3}회`,
    status: index % 2 === 0 ? '정지' : '정상',
    activityState: index % 2 === 0 ? '활동' : '탈퇴',
  }));

  const handleRowClick = (id) => {
    navigate(`/dashboard/UserManagementPage/${id}`); // 클릭 시 해당 경로로 이동
  };

  return (
    <Box
      p={3}
      width="100%"
      height="100vh"
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
        <Button variant="contained" color="primary">
          + 항목 추가
        </Button>
      </Box>

      {/* 검색 및 필터 영역 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" gap={2}>
          <Select defaultValue="all" size="small">
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="active">활동</MenuItem>
            <MenuItem value="inactive">탈퇴</MenuItem>
          </Select>
          <Select defaultValue="recent" size="small">
            <MenuItem value="recent">최근 가입순</MenuItem>
            <MenuItem value="oldest">오래된 가입순</MenuItem>
          </Select>
          <Select defaultValue="all" size="small">
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="banned">정지</MenuItem>
            <MenuItem value="normal">정상</MenuItem>
          </Select>
        </Box>
        <Box display="flex" alignItems="center">
          <TextField placeholder="여기에 검색어를 입력하세요" size="small" />
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
            {users.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleRowClick(user.id)} // 클릭 이벤트 추가
                style={{ cursor: 'pointer' }} // 마우스 커서 변경
              >
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.lastActivity}</TableCell>
                <TableCell>{user.reportCount}</TableCell>
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
        <Pagination count={5} color="primary" />
      </Box>
    </Box>
  );
};

export default UserManagementPage;
