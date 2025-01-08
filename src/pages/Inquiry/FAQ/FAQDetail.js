import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFaqDetail,
  createFaq,
  updateFaq,
  fetchFaqs, // 수정된 부분
} from '../../../redux/slices/faqSlice';
import {
  selectFaqDetail,
  selectStatus,
  selectError,
} from '../../../redux/slices/faqSlice';

const FAQDetail = () => {
  const navigate = useNavigate();
  const { faq_number } = useParams();
  const dispatch = useDispatch();

  // Redux 상태
  const faqData = useSelector(selectFaqDetail);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  // 카테고리 목록 및 번호 설정
  const categories = [
    { label: '계정', value: 1 },
    { label: '커뮤니티', value: 2 },
    { label: '미션', value: 3 },
    { label: 'AI', value: 4 },
    { label: '결제/환불', value: 5 },
    { label: '신고', value: 6 },
    { label: '기타', value: 7 },
  ];

  // 로컬 상태
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [category, setCategory] = useState(1);
  const [date, setDate] = useState('');
  const [adminId, setAdminId] = useState('');
  const [adminNumber, setAdminNumber] = useState('');

  // 관리자 아이디 및 작성시간 설정
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('user'));
    if (adminData) {
      setAdminId(adminData.admin_id);
      setAdminNumber(adminData.admin_number);
    }
  }, []);

  // FAQ 상세 데이터 불러오기
  useEffect(() => {
    if (faq_number) {
      dispatch(fetchFaqDetail(faq_number));
    }
  }, [faq_number, dispatch]);

  // FAQ 데이터를 로컬 상태로 업데이트
  useEffect(() => {
    if (faqData && faq_number) {
      setCategory(faqData.question_classification_number || 1);
      setAdminId(faqData.admin_id);
      setAdminNumber(faqData.admin_number);
      setDate(faqData.created_at.split('T')[0]);
      setQuestion(faqData.content);
      setAnswer(faqData.answer);
      setIsPublic(faqData.state === 'active');
    }
  }, [faqData, faq_number]);

  // 로딩 처리
  if (status === 'loading') {
    return (
      <Typography align="center" mt={4} variant="h6">
        불러오는 중...
      </Typography>
    );
  }

  // 에러 처리
  if (status === 'failed') {
    return (
      <Typography align="center" mt={4} color="error" variant="h6">
        에러 발생: {error}
      </Typography>
    );
  }

  // 저장 로직
  const handleSave = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // 오늘 날짜 (yyyy-mm-dd 형식)
    const faqPayload = {
      question_classification_number: category,
      content: question, // 질문
      answer: answer,
      admin_number: adminNumber, // admin_number로 변경하여 백엔드에 전송
      state: isPublic ? 'active' : 'inactive',
      created_at: new Date().toISOString(), // 작성시간 자동 추가
      date: currentDate, // 오늘 날짜 추가
    };

    console.log('faqPayload:', faqPayload);

    // API 요청
    if (faq_number) {
      dispatch(updateFaq({ faq_number, faqData: faqPayload }))
        .then(() => {
          // FAQ 업데이트 후 리스트를 다시 불러오기
          dispatch(fetchFaqs()); // FAQ 리스트를 다시 불러옴
          navigate('/dashboard/inquiry/faq'); // FAQ 리스트로 이동
        })
        .catch((err) => {
          console.error('수정 실패:', err.message);
        });
    } else {
      dispatch(createFaq(faqPayload))
        .then(() => {
          // FAQ 생성 후 리스트를 다시 불러오기
          dispatch(fetchFaqs()); // FAQ 리스트를 다시 불러옴
          navigate('/dashboard/inquiry/faq'); // FAQ 리스트로 이동
        })
        .catch((err) => {
          console.error('생성 실패:', err.message);
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
        <Stack spacing={6}>
          <FormControl fullWidth size="large">
            <InputLabel>카테고리</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="카테고리"
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6}>
            <TextField
              label="관리자(아이디)"
              fullWidth
              size="large"
              value={adminId}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="게시일"
              fullWidth
              size="large"
              value={date || new Date().toISOString().split('T')[0]}
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
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="답변"
            multiline
            rows={4}
            fullWidth
            size="large"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
            }
            label="현재 공개 여부"
          />
        </Stack>

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
