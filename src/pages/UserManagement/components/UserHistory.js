import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  Pagination,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

export const UserHistory = ({ userNumber }) => {
  const [activeHistory, setActiveHistory] = useState('payment'); // 현재 활성화된 히스토리 타입
  const [data, setData] = useState([]); // 서버에서 가져온 데이터
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const itemsPerPage = 5; // 페이지당 표시할 아이템 수

  const headers = {
    payment: ['NO', '결제 ID', '결제 날짜', '금액', '결제 상태'],
    mission: ['NO', '미션 ID', '미션 이름', '참여 날짜', '상태'],
    community: ['NO', '게시글 ID', '게시글 제목', '작성일', '댓글 수'],
    feed: ['NO', '피드 ID', '피드 제목', '작성일', '조회수'],
    report: ['NO', '신고 ID', '신고 내용', '신고 날짜', '처리 상태'],
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const endpoints = {
      payment: `/user/${userNumber}`, // 유저 데이터에서 결제 정보 가공
      mission: `/missions`, // 미션 참여 데이터를 클라이언트에서 처리
      community: `/posts/users/${userNumber}`, // 특정 유저의 게시글
      feed: `/feeds/users/${userNumber}`, // 특정 유저의 피드
      report: `/reports/my_reports/${userNumber}`, // 신고 내역
    };

    try {
      const url = endpoints[activeHistory];
      const response = await axios.get(url, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      });

      // 데이터 형식 가공
      const fetchedData =
        activeHistory === 'payment'
          ? response.data.paymentHistory || [] // 결제 데이터는 가공 필요
          : response.data.items || response.data; // 일반 데이터

      setData(fetchedData);
      setTotalPages(response.data.totalPages || 1); // 페이지 수 처리
    } catch (err) {
      setError(err.message || '데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [activeHistory, userNumber, currentPage]);

  useEffect(() => {
    if (userNumber) {
      fetchData();
    }
  }, [fetchData, userNumber]);

  const handleButtonClick = (historyType) => {
    setActiveHistory(historyType);
    setCurrentPage(1); // 히스토리 변경 시 첫 페이지로 이동
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        유저 히스토리
      </Typography>
      <Box display="flex" gap={2} mb={3}>
        {Object.keys(headers).map((key) => (
          <Button
            key={key}
            variant={activeHistory === key ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick(key)}
          >
            {key === 'payment'
              ? '결제 내역'
              : key === 'mission'
              ? '미션 내역'
              : key === 'community'
              ? '커뮤니티 내역'
              : key === 'feed'
              ? '피드 내역'
              : '신고 내역'}
          </Button>
        ))}
      </Box>
      <TableContainer>
        {loading ? (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center" my={3}>
            {error}
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Checkbox />
                </TableCell>
                {headers[activeHistory]?.map((header, index) => (
                  <TableCell key={index} align="center">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <Checkbox />
                  </TableCell>
                  {Object.values(entry).map((value, idx) => (
                    <TableCell key={idx} align="center">
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};
