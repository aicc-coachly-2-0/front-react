import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  CircularProgress,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNotice } from '../../redux/slices/noticeSlice';

const NoticeAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    photos: [], // 다중 파일 저장
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // 요청 중 상태

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: files,
    }));
  };

  const handleSave = async () => {
    const { title, content, photos } = formData;

    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('content', content);

    // 선택적으로 사진 추가
    photos.forEach((photo) => data.append('photos', photo));

    setIsSubmitting(true);

    dispatch(addNotice(data)).then((result) => {
      setIsSubmitting(false);

      if (addNotice.fulfilled.match(result)) {
        alert('공지 추가 완료');
        navigate('/dashboard/notice');
      } else {
        alert(
          '공지 추가 실패: ' +
            (result.payload?.message || '알 수 없는 오류가 발생했습니다.')
        );
      }
    });
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
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6}>
            <TextField
              label="관리자(아이디)"
              fullWidth
              size="large"
              InputProps={{ readOnly: true }}
              value="admin123" // 관리자 ID는 하드코딩된 값으로 설정
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="게시일"
              fullWidth
              size="large"
              InputProps={{ readOnly: true }}
              value={new Date().toLocaleDateString()} // 현재 날짜
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
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                  </IconButton>
                ),
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>

          <TextField
            label="내용"
            multiline
            rows={8}
            fullWidth
            size="large"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
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
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ padding: '12px 24px', fontSize: '16px' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : '저장'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NoticeAdd;
