import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNotice } from '../../redux/slices/noticeSlice';

const NoticeAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 또는 Context에서 관리자 ID 가져오기
  const adminId = useSelector((state) => state.auth.user?.admin_id);
  const adminNumber = useSelector((state) => state.auth.user?.admin_number);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    photos: null, // 다중 파일 저장
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
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('admin_id', adminId);
    data.append('admin_number', adminNumber);
    data.append('imageType', 'notice');

    // 파일 추가
    formData.photos.forEach((photo) => {
      data.append('noticePicture', photo);
    });

    // FormData에 어떤 데이터가 들어갔는지 확인
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    dispatch(addNotice(data));
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
          textAlign: 'left',
          width: '100%',
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
          <input
            type="text"
            placeholder="제목을 입력하세요"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />

          <textarea
            placeholder="내용을 입력하세요"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="8"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />

          <Box>
            <Typography variant="subtitle1" mb={1}>
              첨부사진:
            </Typography>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </Box>
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
