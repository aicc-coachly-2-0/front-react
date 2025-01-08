import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNoticeDetail } from '../../redux/slices/noticeSlice';

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedNotice, status, error } = useSelector(
    (state) => state.notices
  );

  useEffect(() => {
    if (noticeId) {
      dispatch(fetchNoticeDetail(noticeId));
    }
  }, [noticeId, dispatch]);

  if (status === 'loading') {
    return (
      <Typography align="center" mt={4} variant="h6">
        불러오는 중...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography align="center" mt={4} color="error" variant="h6">
        에러 발생: {error}
      </Typography>
    );
  }

  if (!selectedNotice) {
    return (
      <Typography align="center" mt={4} variant="h6">
        공지 정보를 찾을 수 없습니다.
      </Typography>
    );
  }

  return (
    <Box p={4} sx={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      {/* 상단 제목 */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          {selectedNotice.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          작성일: {new Date(selectedNotice.created_at).toLocaleDateString()}
        </Typography>
      </Box>

      {/* 이미지 표시 */}
      {selectedNotice.images && selectedNotice.images.length > 0 ? (
        <Stack direction="row" spacing={2} mb={4}>
          {selectedNotice.images.map((image, index) => (
            <Card key={index} sx={{ maxWidth: 200 }}>
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt={`공지 이미지 ${index + 1}`}
              />
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary" mb={4}>
          첨부된 이미지가 없습니다.
        </Typography>
      )}

      {/* 공지 내용 */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="body1" mb={2}>
            {selectedNotice.content}
          </Typography>
        </CardContent>
      </Card>

      {/* 버튼 영역 */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          variant="outlined"
          onClick={() => navigate('/dashboard/notice')}
        >
          뒤로가기
        </Button>
      </Stack>
    </Box>
  );
};

export default NoticeDetail;
