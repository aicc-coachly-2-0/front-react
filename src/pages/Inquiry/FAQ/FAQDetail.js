import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Stack, FormControlLabel, Switch } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFaqDetail, createFaq, updateFaq } from '../../../redux/slices/faqSlice';
import { selectFaqDetail, selectStatus, selectError } from '../../../redux/slices/faqSlice';

const FAQDetail = () => {
  const navigate = useNavigate();
  const { faq_number } = useParams();
  const dispatch = useDispatch();

  // redux store에서 상태를 가져옵니다
  const faqData = useSelector(selectFaqDetail);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  // 상태 초기화
  const [localFaqData, setLocalFaqData] = useState({
    category: '일반',  // 초기값을 기본값으로 설정
    admin: '',
    date: '',
    question: '',
    answer: '',
    isPublic: false,
  });

  // 로컬 스토리지에서 관리자 아이디 가져오기
  useEffect(() => {
    const adminId = localStorage.getItem('adminId');  // 로컬 스토리지에서 adminId를 가져옵니다.
    if (adminId) {
      setLocalFaqData((prevData) => ({
        ...prevData,
        admin: adminId,  // admin 값을 로컬 스토리지에서 가져온 값으로 설정
      }));
    }
  }, []);

  useEffect(() => {
    if (faq_number) {
      dispatch(fetchFaqDetail(faq_number));  // FAQ 수정 시, 상세 데이터 불러오기
    } else {
      // FAQ 추가 시, 초기 상태로 설정
      setLocalFaqData({
        category: '일반',
        admin: '',
        date: '',
        question: '',
        answer: '',
        isPublic: false,
      });
    }
  }, [faq_number, dispatch]);

  // faqData가 있으면 로컬 상태 업데이트
  useEffect(() => {
    if (faqData && faq_number) {
      setLocalFaqData({
        category: faqData.category || '일반',  // 카테고리 기본값 설정
        admin: faqData.admin_id,  // admin_id 사용
        date: faqData.created_at,  // 생성일 사용
        question: faqData.content,  // 질문 내용 사용
        answer: faqData.answer,  // 답변 사용
        isPublic: faqData.state === 'active',  // 상태가 'active'이면 공개
      });
    }
  }, [faqData, faq_number]);

  // 로딩 상태 처리
  if (status === 'loading') return <p>로딩 중...</p>;

  // 에러 처리
  if (status === 'failed') return <p>{error}</p>;

  const handleSave = () => {
    const currentData = { ...localFaqData };
    console.log("전송될 데이터:", currentData); // 요청 전에 데이터 출력
    if (faq_number) {
      // FAQ 수정 로직
      dispatch(updateFaq({ faq_number, faqData: currentData }))
        .then(() => {
          console.log('수정된 데이터 저장', currentData);
        })
        .catch((error) => {
          console.error('수정 실패:', error.message);
        });
    } else {
      // FAQ 새로 생성
      dispatch(createFaq(currentData))
        .then(() => {
          console.log('새 FAQ 저장', currentData);
        })
        .catch((error) => {
          console.error('FAQ 생성 실패:', error.message);
        });
    }
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
        {faq_number ? 'FAQ 수정' : 'FAQ 추가'}
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
            value={localFaqData.category}  // 초기값 설정
            onChange={(e) => setLocalFaqData({ ...localFaqData, category: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6}>
            <TextField
              label="관리자(아이디)"
              fullWidth
              size="large"
              value={localFaqData.admin}  // 초기값 설정
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="게시일"
              fullWidth
              size="large"
              value={localFaqData.date}  // 초기값 설정
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <TextField
            label="질문"
            multiline
            rows={4}
            fullWidth
            size="large"
            value={localFaqData.question}  // 초기값 설정
            onChange={(e) => setLocalFaqData({ ...localFaqData, question: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="답변"
            multiline
            rows={4}
            fullWidth
            size="large"
            value={localFaqData.answer}  // 초기값 설정
            onChange={(e) => setLocalFaqData({ ...localFaqData, answer: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={localFaqData.isPublic}  // 초기값 설정
                onChange={(e) => setLocalFaqData({ ...localFaqData, isPublic: e.target.checked })}
              />
            }
            label="현재 공개 여부"
          />
        </Stack>

        {/* 하단 버튼 */}
        <Box mt={6} display="flex" justifyContent="right">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/dashboard/inquiry/faq')}
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
            {faq_number ? '수정 저장' : '저장'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FAQDetail;
