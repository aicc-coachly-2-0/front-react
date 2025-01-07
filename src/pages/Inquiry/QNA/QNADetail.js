import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Grid, Stack, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionDetail, fetchAnswersByQuestion, updateAnswer, createAnswer } from '../../../redux/slice/qnaSlice';
import { selectQuestionDetail, selectQnaStatus, selectQnaError, selectAnswers } from '../../../redux/slice/qnaSlice';

const QNADetail = () => {
  const navigate = useNavigate();
  const { question_number } = useParams(); // URL에서 질문 번호 가져오기
  const dispatch = useDispatch();

  // Redux 상태
  const questionData = useSelector(selectQuestionDetail);
  const answers = useSelector(selectAnswers);
  const status = useSelector(selectQnaStatus);
  const error = useSelector(selectQnaError);

  // 로컬 상태 관리
  const [localQuestionData, setLocalQuestionData] = useState({
    title: '',
    category: '',
    author: '',
    date: '',
    content: '',
  });

  const [localAnswerData, setLocalAnswerData] = useState({
    title: '',
    admin: '',
    answerDate: '',
    content: '',
  });

  const [noAnswers, setNoAnswers] = useState(false); // 답변이 없을 경우 상태 관리

  // 질문 및 답변 데이터 로드
  useEffect(() => {
    if (question_number) {
      dispatch(fetchQuestionDetail(question_number));
      dispatch(fetchAnswersByQuestion(question_number));
    }
  }, [question_number, dispatch]);

  // 답변 데이터 로드 후 처리
  useEffect(() => {
    if (answers.length === 0) {
      setNoAnswers(true);  // 답변이 없을 경우 상태 변경
    } else {
      setNoAnswers(false);
    }
  }, [answers]);

// Redux 상태에서 로컬 상태 업데이트
useEffect(() => {
  console.log('Question Data:', questionData); // 데이터를 확인합니다.
  
  // 질문 데이터가 존재할 경우
  if (questionData) {
    setLocalQuestionData({
      title: questionData.title || '',
      category: questionData.question_classification_number || '',  // 카테고리
      author: questionData.user_number || '',  // 작성자 (여기서는 user_number로 가정)
      date: questionData.created_at || '',  // 작성일
      content: questionData.question_content || '',  // 질문 내용
    });
  }

  // 답변 데이터가 존재할 경우 (answers 배열에서 첫 번째 답변을 가져옴)
  if (answers && answers.length > 0) {
    const answer = answers[0];  // 첫 번째 답변
    setLocalAnswerData({
      title: answer.answer_content || '',  // 답변 내용 (여기서는 answer_content)
      admin: answer.admin_number || '',  // 관리자 번호 (admin_number)
      answerDate: answer.answer_at || '',  // 답변 날짜 (answer_at)
      content: answer.answer_content || '',  // 답변 내용
    });
  } else {
    setNoAnswers(true);  // 답변이 없으면 noAnswers를 true로 설정
  }
}, [questionData, answers]);  // questionData와 answers가 변경될 때마다 상태 업데이트

  // 저장 핸들러
  const handleSave = () => {
    const payload = {
      question: localQuestionData,
      answer: localAnswerData,
    };

    if (question_number) {
      dispatch(updateAnswer({ question_number, payload }))
        .then(() => {
          alert('Q&A가 수정되었습니다.');
          navigate('/dashboard/inquiry/qna');
        })
        .catch((err) => {
          console.error('수정 실패:', err.message);
        });
    } else {
      dispatch(createAnswer(payload))
        .then(() => {
          alert('새 Q&A가 생성되었습니다.');
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
            value={localQuestionData.title}
            onChange={(e) => setLocalQuestionData({ ...localQuestionData, title: e.target.value })}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="카테고리"
                fullWidth
                size="small"
                value={localQuestionData.category}
                onChange={(e) => setLocalQuestionData({ ...localQuestionData, category: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="작성자(아이디)"
                fullWidth
                size="small"
                value={localQuestionData.author}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="작성일"
                fullWidth
                size="small"
                value={localQuestionData.date}
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
            value={localQuestionData.content}
            onChange={(e) => setLocalQuestionData({ ...localQuestionData, content: e.target.value })}
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
        {noAnswers ? (
          <Typography variant="body1" color="textSecondary">
            이 질문에는 아직 답변이 없습니다.
          </Typography>
        ) : (
          <Stack spacing={3}>
            <TextField
              label="제목"
              fullWidth
              size="small"
              value={localAnswerData.title}
              onChange={(e) => setLocalAnswerData({ ...localAnswerData, title: e.target.value })}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="관리자(아이디)"
                  fullWidth
                  size="small"
                  value={localAnswerData.admin}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="답변일"
                  fullWidth
                  size="small"
                  value={localAnswerData.answerDate}
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
              value={localAnswerData.content}
              onChange={(e) => setLocalAnswerData({ ...localAnswerData, content: e.target.value })}
            />
          </Stack>
        )}
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
