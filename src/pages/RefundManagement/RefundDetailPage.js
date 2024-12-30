import React from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';

const RefundDetailPage = () => {
  return (
    <Box p={3} width="100%" maxWidth="800px" margin="0 auto">
      <Typography variant="h5" fontWeight="bold" mb={3}>
        환불 처리 관리 - 상세
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="회원(아이디)"
            defaultValue="user123(123***qw)"
            fullWidth
            size="small"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="환불 금액"
            defaultValue="50000원"
            fullWidth
            size="small"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="환불 사유"
            defaultValue="잘못된 결제"
            fullWidth
            size="small"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="관리자 메모"
            multiline
            rows={4}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="outlined" color="secondary">
          취소
        </Button>
        <Button variant="contained" color="primary">
          저장
        </Button>
      </Box>
    </Box>
  );
};

export default RefundDetailPage;
