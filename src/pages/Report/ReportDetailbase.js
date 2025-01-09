import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, Grid, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDetailReport, processReport, fetchProcessedReport } from '../../redux/slices/reportSlice'; 

// ReportDetail 컴포넌트: 신고 상세 정보와 처리 정보를 표시하고, 처리 결과를 저장하는 컴포넌트
const ReportDetail = ({ title, fields }) => {
  const theme = useTheme(); // 테마 가져오기
  const dispatch = useDispatch(); // Redux 디스패치 함수
  const navigate = useNavigate(); // 라우팅을 위한 navigate 함수

  // URL 쿼리 파라미터에서 domain과 NO를 추출
  const { domain, NO } = useParams(); // URL에서 domain과 NO를 추출

  // 상태 및 로딩, 에러 처리
  const { status, error, selectedReport } = useSelector((state) => state.reports);

  // 컴포넌트가 렌더링 될 때, URL에서 domain과 NO가 존재하면 해당 신고 정보를 가져옴
  useEffect(() => {
    if (domain && NO) {
      dispatch(fetchDetailReport({ domain, NO })); // 신고 상세 정보 가져오기
      dispatch(fetchProcessedReport({ domain, NO })); // 처리된 신고 정보 가져오기
    }
  }, [dispatch, domain, NO]);

  // 신고 처리 버튼 클릭 시 호출되는 함수
  const handleProcess = (processData) => {
    dispatch(processReport({ domain, NO, processData })); // 신고 처리 요청
  };

  // 로딩 중 표시
  if (status === 'loading') {
    return <Typography>로딩 중...</Typography>;
  }

  // 오류 발생 시 표시
  if (error) {
    return <Typography color="error">오류가 발생했습니다: {error}</Typography>;
  }

  // 신고 정보를 불러올 수 없을 경우
  if (!selectedReport) {
    return <Typography color="error">신고 정보를 불러올 수 없습니다.</Typography>;
  }

   // 필드 값이 없을 경우 처리
   if (!fields || !fields.general) {
    return <Typography color="error">필드 데이터가 존재하지 않습니다.</Typography>;
  }

  return (
    <Box
      p={3}
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      boxSizing="border-box"
      overflow="auto"
      bgcolor={theme.palette.background.default}
    >
      {/* 페이지 제목 */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        {title}
      </Typography>

      {/* 신고 정보 섹션 */}
      <Box
        mb={3}
        p={2}
        width="100%"
        height="100%"
        borderRadius="8px"
        bgcolor={theme.palette.background.paper}
        boxShadow={1}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          신고 정보
        </Typography>
        <Grid container spacing={2}>
          {/* general 필드에 해당하는 정보를 표시 */}
          {fields.general?.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                label={field.label}
                defaultValue={selectedReport?.[field.value]} // selectedReport에서 데이터 추출
                InputProps={{ readOnly: field.readOnly }} // 읽기 전용 설정
                fullWidth
                size="small"
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 추가 정보 섹션 */}
      {fields.additional && (
        <Box
          mb={3}
          p={2}
          width="100%"
          height="100%"
          borderRadius="8px"
          bgcolor={theme.palette.background.paper}
          boxShadow={1}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            추가 정보
          </Typography>
          <Grid container spacing={2}>
            {/* additional 필드에 해당하는 정보를 표시 */}
            {fields.additional?.map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  label={field.label}
                  defaultValue={selectedReport?.[field.value]} // selectedReport에서 데이터 추출
                  InputProps={{ readOnly: field.readOnly }} // 읽기 전용 설정
                  fullWidth
                  size="small"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* 처리 정보 섹션 */}
      <Box
        p={2}
        width="100%"
        height="100%"
        borderRadius="8px"
        bgcolor={theme.palette.background.paper}
        boxShadow={1}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          처리 정보
        </Typography>
        <Grid container spacing={2}>
          {/* processing 필드에 해당하는 정보를 표시 */}
          {fields.processing?.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              {field.type === 'select' ? (
                // 처리 결과가 select인 경우 Select 컴포넌트로 처리
                <Select defaultValue={field.value} fullWidth size="small">
                  {field.options.map((option, i) => (
                    <MenuItem value={option} key={i}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                // 그 외의 경우 TextField로 처리
                <TextField
                  label={field.label}
                  defaultValue={field.value}
                  InputProps={{ readOnly: field.readOnly }} // 읽기 전용 설정
                  fullWidth
                  size="small"
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 액션 버튼 */}
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* 취소 버튼: 이전 페이지로 돌아가기 */}
        <Button variant="outlined" color="secondary" size="large" onClick={() => navigate(-1)}>
          취소
        </Button>
        {/* 저장 버튼: 신고 처리 결과 저장 */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => handleProcess({ status: '기각' })} // 기각 처리 예시
        >
          저장
        </Button>
      </Box>
    </Box>
  );
};

export default ReportDetail;
