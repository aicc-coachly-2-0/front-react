import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  IconButton,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';

export const AccountSuspension = ({ reports }) => {
  const theme = useTheme();

  // 날짜를 기준으로 정렬하는 유틸리티 함수
  const sortByDate = (array) =>
    [...array].sort((a, b) => new Date(b.date) - new Date(a.date));

  const [reportList, setReportList] = useState(sortByDate(reports));
  const [suspensionReasons, setSuspensionReasons] = useState([]);

  const handleMoveToSuspension = (index) => {
    const selectedReport = reportList[index];
    setReportList((prev) => sortByDate(prev.filter((_, i) => i !== index)));
    setSuspensionReasons((prev) => sortByDate([...prev, selectedReport]));
  };

  const handleRemoveFromSuspension = (index) => {
    const removedReport = suspensionReasons[index];
    setSuspensionReasons((prev) =>
      sortByDate(prev.filter((_, i) => i !== index))
    );
    setReportList((prev) => sortByDate([...prev, removedReport]));
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        계정 정지 관리
      </Typography>
      <Box display="flex" gap={3}>
        {/* 신고 접수 내역 */}
        <Box
          flex={1}
          border="1px solid #e0e0e0"
          borderRadius="8px"
          p={2}
          bgcolor={theme.palette.background.paper}
        >
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            신고 접수 내역
          </Typography>
          {reportList.length > 0 ? (
            reportList.map((report, index) => (
              <Box
                key={report.id} // 고유 ID 사용
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Box>
                  <Typography variant="body2">
                    <strong>{report.date}</strong> - {report.reason} (
                    {report.reporter})
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => handleMoveToSuspension(index)}
                  aria-label="Move to suspension"
                >
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              신고 내역이 없습니다.
            </Typography>
          )}
        </Box>

        {/* 정지 사유 등록 */}
        <Box
          flex={1}
          border="1px solid #e0e0e0"
          borderRadius="8px"
          p={2}
          bgcolor={theme.palette.background.paper}
        >
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            정지 사유 등록
          </Typography>
          {suspensionReasons.length > 0 ? (
            suspensionReasons.map((report, index) => (
              <Box
                key={report.id} // 고유 ID 사용
                mb={1}
                p={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bgcolor={
                  theme.palette.mode === 'dark'
                    ? theme.palette.grey[800]
                    : '#f9f9f9'
                }
                borderRadius="4px"
              >
                <Typography variant="body2" color="text.primary">
                  <strong>{report.date}</strong> - {report.reason} (
                  {report.reporter})
                </Typography>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => handleRemoveFromSuspension(index)}
                >
                  제거
                </Button>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              정지 사유가 없습니다.
            </Typography>
          )}
        </Box>

        {/* 정지 관리 */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          gap={2}
          border="1px solid #e0e0e0"
          borderRadius="8px"
          p={2}
          bgcolor={theme.palette.background.paper}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            정지 관리
          </Typography>
          <Typography variant="body2">최근 정지 일자: 2024-12-20</Typography>
          <Typography variant="body2">
            정지 기간 설정: YYYY-MM-DD ~ YYYY-MM-DD
          </Typography>
          <Button variant="contained" size="small" color="primary">
            기간 선택
          </Button>
          <Typography variant="body2">누적 정지 횟수: 2회</Typography>
          <Select defaultValue="정지" size="small">
            <MenuItem value="정지">정지</MenuItem>
            <MenuItem value="해제">해제</MenuItem>
          </Select>
          <Button variant="contained" color="error" sx={{ width: '100%' }}>
            적용
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
