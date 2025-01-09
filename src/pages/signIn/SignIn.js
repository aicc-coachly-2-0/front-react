import React, { useEffect } from 'react';
import { CssBaseline, Typography, Stack, Card as MuiCard } from '@mui/material';
import { styled } from '@mui/material/styles';
import SignInForm from './SignInForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  const isLoggedIn = useSelector((state) => !!state.auth.user);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleLoginSuccess = () => {
    navigate('/dashboard');
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
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            관리자 로그인
          </Typography>
          {/* 수정: prop 이름 통일 */}
          <SignInForm onLogin={handleLoginSuccess} />
        </Card>
      </Stack>
    </>
  );
}
