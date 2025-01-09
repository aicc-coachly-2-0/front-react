import React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import { Box, Typography, Divider } from '@mui/material';
import MenuContent from './MenuContent';

const drawerWidth = 240;

// 스타일된 Drawer 컴포넌트 정의
const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper, // MUI 테마 배경색
  },
}));

export default function SideMenu() {
  return (
    <Drawer variant="permanent">
      {/* 상단 로고 박스 */}
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          mb: 2,
          p: 1,
          border: `1px solid ${theme.palette.divider}`, // 테마 분리선 색상 사용
          borderRadius: '16px',
          backgroundColor: theme.palette.background.paper, // 테마 배경색 사용
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          minWidth: '120px',
        })}
      >
        <Typography
          variant="h6"
          sx={(theme) => ({
            fontWeight: 'bold',
            color: theme.palette.text.primary, // 테마 텍스트 색상 사용
            letterSpacing: '0.5px',
          })}
        >
          COACHLY
        </Typography>
      </Box>
      <Divider />
      {/* 메뉴 콘텐츠 */}
      <MenuContent />
    </Drawer>
  );
}
