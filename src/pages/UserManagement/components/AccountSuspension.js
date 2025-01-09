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

  const [reportList, setReportList] = useState(
    reports.sort((a, b) => new Date(b.date) - new Date(a.date))
  );
  const [suspensionReasons, setSuspensionReasons] = useState([]);

  const handleMoveToSuspension = (index) => {
    const selectedReport = reportList[index];
    const updatedReportList = reportList.filter((_, i) => i !== index);
    const updatedSuspensionReasons = [...suspensionReasons, selectedReport];

    setReportList(
      updatedReportList.sort((a, b) => new Date(b.date) - new Date(a.date))
    );
    setSuspensionReasons(
      updatedSuspensionReasons.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
    );
  };

  const handleRemoveFromSuspension = (index) => {
    const removedReport = suspensionReasons[index];
    const updatedSuspensionReasons = suspensionReasons.filter(
      (_, i) => i !== index
    );
    const updatedReportList = [...reportList, removedReport];

    setReportList(
      updatedReportList.sort((a, b) => new Date(b.date) - new Date(a.date))
    );
    setSuspensionReasons(
      updatedSuspensionReasons.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
    );
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        계정 정지 관리
      </Typography>
      <Box display="flex" gap={3}>
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
          {reportList.map((report, index) => (
            <Box
              key={index}
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
          ))}
        </Box>

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
          {suspensionReasons.map((report, index) => (
            <Box
              key={index}
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
          ))}
        </Box>

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
