import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Grid,
} from '@mui/material';

const RefundDetail = () => {
  const logs = [
    { id: 1, log: 'Coachly AI 서비스 사용', date: '2023-04-26' },
    { id: 2, log: 'Coachly AI 서비스 사용', date: '2023-04-26' },
    { id: 3, log: 'Coachly AI 서비스 사용', date: '2023-04-26' },
  ];

  const [reviewResult, setReviewResult] = React.useState('');

  const handleReviewResult = (result) => {
    setReviewResult(result);
  };

  const handleSave = () => {
    alert('환불 정보가 저장되었습니다.');
  };

  const handleCancel = () => {
    alert('수정을 취소합니다.');
  };

  return (
    <Box sx={{ padding: 3, width: '100%', height: '100%', margin: '0 auto' }}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        환불 접수
      </Typography>

      {/* 접수 정보 */}
      <Box
        sx={{
          p: 3,
          width: '100%',
          height: '100%',
          mb: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
          backgroundColor: 'background.paper',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField label="접수 번호" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="환불 신청인(아이디)" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="환불 신청일" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="환불 대상" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="환불 완료일" fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="outlined" color="primary" size="small">
              완료
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="환불 사유"
              fullWidth
              size="small"
              multiline
              sx={{
                width: '100%',
                height: '100%',
                overflow: 'auto', // 스크롤 가능
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* AI 서비스 사용 내역 */}
      <Box
        sx={{
          p: 3,
          mb: 4,
          width: '100%',
          height: '100%',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          AI 서비스 사용 내역
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>사용 로그</TableCell>
                <TableCell>사용 시각</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.log}</TableCell>
                  <TableCell>{log.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination count={Math.ceil(logs.length / 10)} sx={{ mt: 2 }} />
      </Box>

      {/* 처리 정보 */}
      <Box
        sx={{
          p: 3,
          width: '100%',
          height: '100%',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
          backgroundColor: 'background.paper',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="관리자(아이디)"
              fullWidth
              size="small"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="처리일" fullWidth size="small" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography sx={{ mr: 2, fontWeight: 'bold' }}>
              심사 결과
            </Typography>
            <Button
              variant={reviewResult === '기각' ? 'contained' : 'outlined'}
              onClick={() => handleReviewResult('기각')}
              sx={{ mr: 1 }}
            >
              기각
            </Button>
            <Button
              variant={reviewResult === '승인' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleReviewResult('승인')}
            >
              승인
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="내용"
              fullWidth
              size="small"
              sx={{ width: '100%', height: '100%' }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* 하단 버튼 */}
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
          sx={{
            padding: '8px 16px',
            fontSize: '14px',
            minWidth: '100px',
            mr: '16px',
          }}
        >
          취소
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ padding: '8px 16px', fontSize: '14px', minWidth: '100px' }}
        >
          저장
        </Button>
      </Box>
    </Box>
  );
};

export default RefundDetail;
