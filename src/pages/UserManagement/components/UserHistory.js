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
    payment: ['NO', '서비스명', '금액', '서비스 결제일', '구독 상태'],
    mission: ['NO', '미션명', '완료일', '상태'],
    community: ['NO', '게시글 제목', '작성일', '댓글 수'],
    feed: ['NO', '피드 제목', '업로드 날짜', '조회수'],
    inquiry: ['NO', '문의 제목', '문의 날짜', '처리 상태'],
    report: ['NO', '신고 내용', '신고 날짜', '처리 상태'],
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const endpoints = {
      payment: '/api/paymentHistory',
      mission: '/api/missionHistory',
      community: '/api/communityHistory',
      feed: '/api/feedHistory',
      inquiry: '/api/inquiryHistory',
      report: '/api/reportHistory',
    };

    const url = `${endpoints[activeHistory]}/${userNumber}`;

    try {
      const response = await axios.get(url, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setData(response.data.items); // 서버에서 가져온 데이터
      setTotalPages(response.data.totalPages); // 총 페이지 수 설정
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
  }, [fetchData]);

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
              : key === 'inquiry'
              ? '문의 내역'
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
                  {Object.values(entry).map((value, index) => (
                    <TableCell key={index} align="center">
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
