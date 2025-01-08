import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice'; // 경로 확인 필요

const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: 'transparent',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Redux 상태 초기화
    localStorage.removeItem('token'); // JWT 토큰 제거
    navigate('/'); // 로그인 페이지로 이동
  };

  return (
    <StyledButton
      variant="outlined"
      onClick={handleLogout}
      startIcon={<LogoutRoundedIcon />}
    ></StyledButton>
  );
}
