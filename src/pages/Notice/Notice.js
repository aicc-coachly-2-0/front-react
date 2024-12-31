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
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Notice = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: 20 - index,
      author: index % 2 === 0 ? '박준' : '이주',
      title: `${20 - index} 번째 공지사항 제목입니다`,
      date: '2024-12-21 / 05:23AM',
      status: index % 2 === 0 ? '공지' : '정상',
    }))
  );

  const handleAddNotice = () => {
    navigate('/dashboard/notice/add');
  };

  const handleEditNotice = (id) => {
    navigate(`/dashboard/notice/edit/${id}`);
  };

  const handleDeleteNotice = (id) => {
    if (window.confirm('이 공지를 삭제하시겠습니까?')) {
      setNotices((prevNotices) =>
        prevNotices.filter((notice) => notice.id !== id)
      );
      alert('공지 삭제 완료');
    }
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
          공지
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddNotice}>
          항목 추가
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
          <Select defaultValue="recent" size="small">
            <MenuItem value="recent">최근 작성순</MenuItem>
            <MenuItem value="oldest">오래된 작성순</MenuItem>
          </Select>
          <Select defaultValue="all" size="small">
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="notice">공지</MenuItem>
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
              <TableCell>작성자</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>게시일</TableCell>
              <TableCell>노출상태</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{notice.id}</TableCell>
                <TableCell>{notice.author}</TableCell>
                <TableCell>{notice.title}</TableCell>
                <TableCell>{notice.date}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color={notice.status === '공지' ? 'primary' : 'default'}
                    size="small"
                  >
                    {notice.status}
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditNotice(notice.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteNotice(notice.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
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

export default Notice;
