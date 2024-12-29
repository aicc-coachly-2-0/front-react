import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: 'transparent',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // 로그인 상태 제거
    navigate('/'); // 로그인 페이지로 리다이렉트
  };

  return (
    <StyledButton
      variant="outlined"
      onClick={handleLogout}
      startIcon={<LogoutRoundedIcon />}
    ></StyledButton>
  );
}
