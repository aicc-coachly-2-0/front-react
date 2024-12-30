import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';

const InquiryDetailPage = ({ title, fields, isFAQ }) => {
  return (
    <Box p={3} width="100%" maxWidth="800px" margin="0 auto">
      <Typography variant="h5" fontWeight="bold" mb={3}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {fields.map((field, index) => (
          <Grid item xs={12} sm={field.fullWidth ? 12 : 6} key={index}>
            {field.type === 'select' ? (
              <Select
                fullWidth
                size="small"
                defaultValue={field.value}
                disabled={field.readOnly}
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
                defaultValue={field.value}
                fullWidth
                size="small"
                InputProps={{ readOnly: field.readOnly }}
              />
            )}
          </Grid>
        ))}
      </Grid>
      {!isFAQ && (
        <>
          <Typography variant="h6" fontWeight="bold" mt={3}>
            답변 정보
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="관리자(아이디)" fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="답변일" fullWidth size="small" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="답변 내용"
                multiline
                rows={4}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </>
      )}
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

export default InquiryDetailPage;
