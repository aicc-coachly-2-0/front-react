import React, { useState, useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeeds } from '../../../redux/slices/feedSlice';
import { fetchPosts } from '../../../redux/slices/postSlice';
import { fetchReport } from '../../../redux/slices/reportSlice';

export const UserHistory = ({ userNumber }) => {
  const dispatch = useDispatch();

  const [activeHistory, setActiveHistory] = useState('feed');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { items: feedData = [], status: feedStatus } = useSelector(
    (state) => state.feeds
  );
  const { items: postData = [], status: postStatus } = useSelector(
    (state) => state.posts
  );
  const { items: reportData = [], status: reportStatus } = useSelector(
    (state) => state.reports
  );

  const headers = {
    feed: ['NO', '피드 ID', '피드 제목', '작성일', '조회수'],
    post: ['NO', '게시글 ID', '게시글 제목', '작성일', '댓글 수'],
    report: ['NO', '신고 ID', '신고 내용', '신고 날짜', '처리 상태'],
  };

  const filteredData = {
    feed: Array.isArray(feedData)
      ? feedData.filter(
          (item) => String(item.user_number) === String(userNumber)
        )
      : [],
    post: Array.isArray(postData)
      ? postData.filter(
          (item) => String(item.user_number) === String(userNumber)
        )
      : [],
    report: Array.isArray(reportData)
      ? reportData.filter(
          (item) => String(item.user_number) === String(userNumber)
        )
      : [],
  };

  const statuses = {
    feed: feedStatus,
    post: postStatus,
    report: reportStatus,
  };

  useEffect(() => {
    switch (activeHistory) {
      case 'feed':
        if (feedStatus === 'idle') dispatch(fetchFeeds());
        break;
      case 'post':
        if (postStatus === 'idle') dispatch(fetchPosts());
        break;
      case 'report':
        if (reportStatus === 'idle') dispatch(fetchReport({ domain: 'user' }));
        break;
      default:
        break;
    }
  }, [dispatch, activeHistory, feedStatus, postStatus, reportStatus]);

  const handleButtonClick = (historyType) => {
    setActiveHistory(historyType);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentStatus = statuses[activeHistory];
  const currentData = filteredData[activeHistory] || [];

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
            {key === 'feed'
              ? '피드 내역'
              : key === 'post'
              ? '커뮤니티 내역'
              : '신고 내역'}
          </Button>
        ))}
      </Box>
      <TableContainer>
        {currentStatus === 'loading' ? (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        ) : currentStatus === 'failed' ? (
          <Typography color="error" textAlign="center" my={3}>
            데이터를 불러오는데 실패했습니다.
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
              {currentData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={headers[activeHistory]?.length + 1}
                    align="center"
                  >
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                currentData
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((entry, index) => (
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
                  ))
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(currentData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};
