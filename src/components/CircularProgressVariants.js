import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

export default function CircularProgressVariants() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // 전체 화면 높이
        width: '100vw', // 전체 화면 너비
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
        position: 'fixed', // 화면 고정
        top: 0,
        left: 0,
        zIndex: 9999, // 최상위에 표시
      }}
    >
      <CircularProgress variant="soft" />
    </Box>
  );
}
