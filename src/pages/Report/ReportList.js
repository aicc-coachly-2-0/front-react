import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Select, MenuItem, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReport } from '../../redux/slices/reportSlice'; // fetchReport 액션 추가

const ReportList = ({ title, columns, domain, detailPath }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // dispatch 사용
  const itemsPerPage = 10;

  // 리포트 상태 가져오기
  const reports = useSelector((state) => state.reports.items || []); // reports가 배열이 아닌 경우 빈 배열로 초기화
  const loading = useSelector((state) => state.reports.status === 'loading'); // 로딩 상태

  const [filters, setFilters] = useState({
    order: 'recent',
    search: '',
  });

  const [currentPage, setCurrentPage] = useState(1);

  // 도메인 값이 변경될 때마다 리포트 데이터를 새로 가져옴
  useEffect(() => {
    if (domain) {
      dispatch(fetchReport({ domain })); // domain 값이 존재할 때만 호출
    }
  }, [domain, dispatch]);

  // 필터링 및 정렬된 데이터 계산
  const filteredData = useMemo(() => {
    let filtered = [...reports];

    // 검색어 필터 적용
    if (filters.search) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }

    // 신고 날짜 기준 정렬 적용
    filtered.sort((a, b) => {
      if (filters.order === 'recent') {
        return new Date(b.report_at) - new Date(a.report_at);
      }
      return new Date(a.report_at) - new Date(b.report_at);
    });

    return filtered;
  }, [reports, filters]);

  // 페이지네이션 데이터
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowClick = (index) => {
    navigate(`${detailPath}/${index}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <Typography>Loading...</Typography>; // 로딩 중이면 메시지 표시
  }

  return (
    <Box p={3} width="100%" sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
          <Select
            value={filters.order}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, order: e.target.value }))
            }
            size="small"
          >
            <MenuItem value="recent">최근 신고순</MenuItem>
            <MenuItem value="oldest">오래된 신고순</MenuItem>
          </Select>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <TextField
            placeholder="여기에 검색어를 입력하세요"
            size="small"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
          <Button variant="outlined">검색</Button>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Checkbox />
              </TableCell>
              {columns.map((column, index) => (
                <TableCell key={index} align="center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                신고가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => handleRowClick(row.feed_report_number)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell align="center">
                  <Checkbox />
                </TableCell>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} align="center">
                    {column === '처리일' ? row.report_at || 'null' : row[column] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
        </Table>
      </TableContainer>

      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};



// 리스트 페이지별 내보내기 (각각의 리포트 리스트 컴포넌트)
export { ReportCommentList } from './Reportlist/ReportCommentList';
export { ReportUserList } from './Reportlist/ReportUserList';
export { ReportPostList } from './Reportlist/ReportPostList';
export { ReportMissionAuthList } from './Reportlist/ReportMissionAuthList';
export { ReportMissionRoomList } from './Reportlist/ReportMissionRoomList';
export { ReportFeedList } from './Reportlist/ReportFeedList';

export default ReportList;
