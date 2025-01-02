import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  Stack,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';

const NoticeAdd = () => {
  const navigate = useNavigate();

  const initialData = {
    title: '',
    admin: 'admin123',
    date: '2024-12-21',
    photo: '',
    isPublic: false,
    content: '',
  };

  const handleSave = () => {
    alert('공지 추가 완료');
    navigate('/dashboard/notice');
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        padding: 4,
      }}
    >
      {/* 상단 제목 */}
      <Typography
        variant="h4"
        mb={4}
        sx={{
          textAlign: 'left', // 텍스트를 왼쪽 정렬
          width: '100%', // 부모 요소 너비에 맞춤
        }}
      >
        공지 추가
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
            label="제목"
            fullWidth
            size="large"
            defaultValue={initialData.title}
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

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6}>
            <TextField
              label="첨부사진"
              fullWidth
              size="large"
              InputProps={{
                endAdornment: (
                  <IconButton component="label">
                    <PhotoCamera />
                    <input type="file" hidden />
                  </IconButton>
                ),
              }}
              InputLabelProps={{ shrink: true }}
            />

            <FormControlLabel
              control={<Switch defaultChecked={initialData.isPublic} />}
              label="현재 공개 여부"
            />
          </Stack>

          <TextField
            label="내용"
            multiline
            rows={8}
            fullWidth
            size="large"
            defaultValue={initialData.content}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        {/* 하단 버튼 */}
        <Box mt={6} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/dashboard/notice')}
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
    </Box>
  );
};

export default NoticeAdd;
