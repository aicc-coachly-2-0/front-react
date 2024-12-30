import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useParams, useNavigate } from 'react-router-dom';

const NoticeAddPage = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialData =
    mode === 'edit'
      ? {
          title: `수정할 공지 ${id}`,
          admin: 'admin123',
          date: '2024-12-21',
          photo: '',
          isPublic: true,
          content: '수정할 공지 내용',
        }
      : {
          title: '',
          admin: 'admin123',
          date: '2024-12-21',
          photo: '',
          isPublic: false,
          content: '',
        };

  const handleSave = () => {
    alert(mode === 'edit' ? '공지 수정 완료' : '공지 추가 완료');
    navigate('/dashboard/notice');
  };

  return (
    <Box
      p={3}
      width="100%"
      maxWidth="800px"
      margin="0 auto"
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: 'background.paper', // 시스템 테마 배경색
      }}
    >
      {/* 상단 제목 */}
      <Typography variant="h5" mb={3}>
        {mode === 'edit' ? '공지 수정' : '공지 추가'}
      </Typography>

      {/* 입력 필드 */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="제목"
            fullWidth
            size="small"
            defaultValue={initialData.title}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="관리자(아이디)"
            fullWidth
            size="small"
            InputProps={{ readOnly: true }}
            value={initialData.admin}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="게시일"
            fullWidth
            size="small"
            InputProps={{ readOnly: true }}
            value={initialData.date}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="첨부사진"
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton component="label">
                  <PhotoCamera />
                  <input type="file" hidden />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Switch defaultChecked={initialData.isPublic} />}
            label="현재 공개 여부"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="내용"
            multiline
            rows={6}
            fullWidth
            defaultValue={initialData.content}
          />
        </Grid>
      </Grid>

      {/* 하단 버튼 */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/dashboard/notice')}
        >
          취소
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          저장
        </Button>
      </Box>
    </Box>
  );
};

export default NoticeAddPage;
