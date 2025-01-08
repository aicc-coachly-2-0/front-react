import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQnas, fetchQuestionDetail, fetchAnswersByQuestion, updateAnswer, createAnswer } from '../../../redux/slices/qnaSlice';
import { selectQuestionDetail, selectAnswers, selectQnaStatus, selectQnaError } from '../../../redux/slices/qnaSlice';

const QNADetail = () => {
  const navigate = useNavigate();
  const { question_number } = useParams();
  const dispatch = useDispatch();

  // Redux 상태
  const questionData = useSelector(selectQuestionDetail);
  const answers = useSelector(selectAnswers);
  console.log('Answers from Redux:', answers);  // Redux에서 가져온 답변 상태 확인
  const status = useSelector(selectQnaStatus);
  const error = useSelector(selectQnaError);

  // 컴포넌트 마운트 시 QNA 리스트를 불러옵니다.
  useEffect(() => {
    dispatch(fetchQnas());
  }, [dispatch]);

  // 로컬에 저장된 관리자 정보 가져오기
  const [user, setUser] = useState({
    admin_number: '',
    admin_id: '',
  });

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('user'));
    if (adminData) {
      setUser({
        admin_number: adminData.admin_number,
        admin_id: adminData.admin_id,
      });
    }
  }, []);


  // 답변 내용 상태 관리
  const [answerContent, setAnswerContent] = useState('');

  // 답변 내용 초기화 및 데이터 업데이트
  useEffect(() => {
    // QNA 데이터를 불러오기 위해서 질문과 답변을 다시 가져옵니다.
    if (question_number) {
      dispatch(fetchQuestionDetail(question_number));
      dispatch(fetchAnswersByQuestion(question_number));
    }
  }, [question_number, dispatch]);

  // 답변이 있으면 해당 내용으로 상태 업데이트
  useEffect(() => {
    if (answers.length > 0) {
      setAnswerContent(answers[0].answer_content);  // 첫 번째 답변의 내용으로 설정
    } else {
      setAnswerContent('');  // 답변이 없으면 빈 내용으로 설정
    }
  }, [answers]);  // answers가 변경될 때마다 실행

  // 답변 데이터 처리
  const answer = answers[0] || {};  // 답변이 존재하지 않으면 빈 객체를 사용

  // 답변 내용 변경 핸들러
  const handleAnswerChange = (e) => {
    setAnswerContent(e.target.value); // 입력 값만 상태에 반영
  };

  // 저장 핸들러
  const handleSave = () => {
    const payload = {
      question_number: question_number,  // 질문 번호
      admin_number: user.admin_number,    // 관리자 번호
      answer_content: answerContent || '', // 답변 내용
    };

    if (answer.answer_number) {
      // 기존 답변 수정
      dispatch(updateAnswer({ answer_number: answer.answer_number, payload }))
        .then(() => {
          alert('답변이 수정되었습니다.');
          dispatch(fetchQnas()); // FAQ 리스트를 다시 불러옴
          navigate('/dashboard/inquiry/qna');
        })
        .catch((err) => {
          console.error('수정 실패:', err.message);
        });
    } else {
      // 새로운 답변 생성
      dispatch(createAnswer(payload))
        .then(() => {
          alert('답변이 생성되었습니다.');
          dispatch(fetchQnas()); // FAQ 리스트를 다시 불러옴
          navigate('/dashboard/inquiry/qna');
        })
        .catch((err) => {
          console.error('생성 실패:', err.message);
        });
    }
  };

  // 로딩 및 에러 처리
  if (status === 'loading') return <p>로딩 중...</p>;
  if (status === 'failed') return <p>{error}</p>;

  // questionData가 null인 경우 처리
  if (!questionData) return <p>질문 데이터를 불러오는 중입니다...</p>;

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
            value={questionData.title || ''}
            InputProps={{ readOnly: true }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="카테고리"
                fullWidth
                size="small"
                value={questionData.question_classification_number || ''}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="작성자(아이디)"
                fullWidth
                size="small"
                value={questionData.user_number || ''}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="작성일"
                fullWidth
                size="small"
                value={questionData.created_at || ''}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
          <TextField
            label="내용"
            multiline
            fullWidth
            size="small"
            value={questionData.question_content || ''}
            InputProps={{ readOnly: true }}
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="관리자(아이디)"
                fullWidth
                size="small"
                value={user.admin_id || ''} // 관리자 아이디
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="답변일"
                fullWidth
                size="small"
                value={new Date().toLocaleDateString()}  // 오늘 날짜 표시
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
          <TextField
            label="내용"
            multiline
            fullWidth
            size="small"
            value={answerContent || ''} // 답변 내용
            onChange={handleAnswerChange}
            sx={{
              '& .MuiInputBase-root': {
                minHeight: '120px',  // 높이를 조금 더 늘려서 텍스트가 잘려 보이지 않게 설정
                padding: '8px',      // 패딩을 추가해서 텍스트가 너무 붙어 보이지 않게 설정
              },
            }}
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
