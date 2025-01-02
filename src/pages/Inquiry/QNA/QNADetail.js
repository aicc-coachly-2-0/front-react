import React from 'react';
import { Box, Typography, TextField, Grid, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QNADetail = () => {
  const navigate = useNavigate();

  const questionData = {
    title: '',
    category: '',
    author: 'user123',
    date: '2024-12-21',
    content: '',
  };

  const answerData = {
    title: '',
    admin: 'admin123',
    answerDate: '2024-12-21 / 05:23AM',
    content: '',
  };

  const handleSave = () => {
    alert('Q&A 저장 완료');
    navigate('/dashboard/inquiry/qna');
  };

  return (
    <Box p={3} width="100%" sx={{ backgroundColor: 'background.default' }}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        문의 사항 관리 (Q&A)
      </Typography>

      {/* 질문 영역 */}
      <Box
        sx={{
          p: 4,
          mb: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
          backgroundColor: 'background.paper',
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={3}>
          질문 정보
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="제목"
            fullWidth
            size="small"
            defaultValue={questionData.title}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="카테고리"
                fullWidth
                size="small"
                defaultValue={questionData.category}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="작성자(아이디)"
                fullWidth
                size="small"
                defaultValue={questionData.author}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="작성일"
                fullWidth
                size="small"
                defaultValue={questionData.date}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
          <TextField
            label="내용"
            multiline
            rows={5}
            fullWidth
            size="small"
            defaultValue={questionData.content}
          />
        </Stack>
      </Box>

      {/* 답변 영역 */}
      <Box
        sx={{
          p: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
          backgroundColor: 'background.paper',
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={3}>
          답변 정보
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="제목"
            fullWidth
            size="small"
            defaultValue={answerData.title}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="관리자(아이디)"
                fullWidth
                size="small"
                defaultValue={answerData.admin}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="답변일"
                fullWidth
                size="small"
                defaultValue={answerData.answerDate}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
          <TextField
            label="내용"
            multiline
            rows={5}
            fullWidth
            size="small"
            defaultValue={answerData.content}
          />
        </Stack>
      </Box>

      {/* 하단 버튼 */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/dashboard/inquiry/qna')}
          sx={{ padding: '12px 24px', fontSize: '16px' }}
        >
          취소
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ padding: '12px 24px', fontSize: '16px' }}
        >
          저장
        </Button>
      </Box>
    </Box>
  );
};

export default QNADetail;
