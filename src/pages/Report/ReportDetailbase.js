import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchDetailReport,
  processReport,
  fetchProcessedReport,
} from '../../redux/slices/reportSlice';

const ReportDetail = ({ title, fields, domain, NO }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, selectedReport } = useSelector(
    (state) => state.reports
  );

  useEffect(() => {
    if (domain && NO) {
      dispatch(fetchDetailReport({ domain, NO }));
      dispatch(fetchProcessedReport({ domain, NO }));
    }
  }, [dispatch, domain, NO]);

  const handleProcess = (processData) => {
    dispatch(processReport({ domain, NO, processData }));
  };

  // 로딩 상태 표시
  if (status === 'loading') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // 오류 상태 표시
  if (error) {
    return (
      <Typography color="error" align="center" mt={3}>
        오류가 발생했습니다: {error}
      </Typography>
    );
  }

  // 데이터가 없을 경우 처리
  if (!selectedReport || !fields?.general) {
    return (
      <Typography color="error" align="center" mt={3}>
        신고 정보를 불러올 수 없습니다.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        height: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      {/* 페이지 제목 */}
      <Typography variant="h5" fontWeight="bold" mb={2} align="center">
        {title}
      </Typography>

      {/* 신고 정보 섹션 */}
      <Box sx={sectionStyle}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          신고 정보
        </Typography>
        <Grid container spacing={2}>
          {fields.general.map((field, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TextField
                label={field.label}
                value={field.value}
                InputProps={{ readOnly: field.readOnly }}
                fullWidth
                size="small"
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 추가 정보 섹션 */}
      {fields.additional && (
        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            추가 정보
          </Typography>
          <Grid container spacing={2}>
            {fields.additional.map((field, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <TextField
                  label={field.label}
                  value={field.value}
                  InputProps={{ readOnly: field.readOnly }}
                  fullWidth
                  size="small"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* 처리 정보 섹션 */}
      <Box sx={sectionStyle}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          처리 정보
        </Typography>
        <Grid container spacing={2}>
          {fields.processing.map((field, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {field.type === 'select' ? (
                <Select
                  value={field.value}
                  onChange={(e) =>
                    handleProcess({ [field.key]: e.target.value })
                  }
                  fullWidth
                  size="small"
                >
                  {field.options.map((option, i) => (
                    <MenuItem value={option} key={i}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <TextField
                  label={field.label}
                  value={field.value}
                  fullWidth
                  size="small"
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 액션 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(-1)}
          size="large"
        >
          취소
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleProcess({ status: '기각' })}
          size="large"
        >
          저장
        </Button>
      </Box>
    </Box>
  );
};

const sectionStyle = {
  p: 3,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 1,
};

export default ReportDetail;
