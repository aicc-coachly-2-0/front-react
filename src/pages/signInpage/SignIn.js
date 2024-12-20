import React, { useEffect } from 'react';
import { CssBaseline, Typography, Stack, Card as MuiCard } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SitemarkIcon } from '../../internals/dashboardpage/CustomIcons'; // 경로 수정
import SignInForm from './SignInForm'; // 경로 유지
import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  maxWidth: '450px',
  margin: 'auto',
}));

export default function SignIn() {
  const navigate = useNavigate();

  // 더미 유저 데이터
  const DUMMY_USER = {
    email: 'test@example.com',
    password: 'qwer1234',
  };

  // 로그인 상태 확인
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = (email, password) => {
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 저장
      navigate('/dashboard'); // 대시보드로 이동
    } else {
      alert('Invalid email or password'); // 실패 메시지
    }
  };

  return (
    <>
      <CssBaseline />
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh' }}
      >
        <Card variant="outlined">
          {/* <SitemarkIcon /> */} {/* 아이콘은 주석 처리 유지 */}
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            관리자 로그인
          </Typography>
          <SignInForm onLogin={handleLogin} />
        </Card>
      </Stack>
    </>
  );
}
