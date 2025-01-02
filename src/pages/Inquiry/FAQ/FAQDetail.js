import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FAQDetail = () => {
  const navigate = useNavigate();

  const initialData = {
    category: '일반',
    admin: 'admin123',
    date: '2024-12-21',
    question: '',
    answer: '',
    isPublic: false,
  };

  const handleSave = () => {
    alert('FAQ 저장 완료');
    navigate('/dashboard/faq');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'background.default',
        padding: 4,
      }}
    >
      {/* 상단 제목 */}
      <Typography
        variant="h4"
        mb={4}
        sx={{
          textAlign: 'left',
          width: '100%',
        }}
      >
        FAQ 추가
      </Typography>

      <Box
        sx={{
          p: 4,
          width: '100%',
          height: '100%',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
          backgroundColor: 'background.paper',
          boxShadow: 3,
        }}
      >
        {/* 입력 필드 */}
        <Stack spacing={6}>
          <TextField
            label="카테고리"
            fullWidth
            size="large"
            defaultValue={initialData.category}
            InputLabelProps={{ shrink: true }}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6}>
            <TextField
              label="관리자(아이디)"
              fullWidth
              size="large"
              InputProps={{ readOnly: true }}
              value={initialData.admin}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="게시일"
              fullWidth
              size="large"
              InputProps={{ readOnly: true }}
              value={initialData.date}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <TextField
            label="질문"
            multiline
            rows={4}
            fullWidth
            size="large"
            defaultValue={initialData.question}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="답변"
            multiline
            rows={4}
            fullWidth
            size="large"
            defaultValue={initialData.answer}
            InputLabelProps={{ shrink: true }}
          />
          <FormControlLabel
            control={<Switch defaultChecked={initialData.isPublic} />}
            label="현재 공개 여부"
          />
        </Stack>

        {/* 하단 버튼 */}
        <Box mt={6} display="flex" justifyContent="right">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/dashboard/faq')}
            sx={{ padding: '12px 24px', fontSize: '16px', mr: '16px' }}
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
    </Box>
  );
};

export default FAQDetail;
