import React from 'react';
import { Box, Typography, TextField, Avatar, Grid } from '@mui/material';

export const UserInfo = ({ user }) => {
  const labels = {
    user_number: '유저 번호',
    user_id: '아이디',
    user_name: '이름',
    nickname: '닉네임',
    user_email: '이메일',
    user_phone: '전화번호',
    user_gender: '성별',
    user_date_of_birth: '생년월일',
    total_points: '총 포인트',
    status: '상태',
    created_at: '가입일',
    profile_picture: '프로필 사진',
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <Box mb={4}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        유저 세부 정보
      </Typography>
      <Grid container spacing={2}>
        {/* 프로필 사진 */}
        {user.profile_picture && (
          <Grid item xs={12} md={4}>
            <Avatar
              alt={user.nickname || user.user_name}
              src={user.profile_picture}
              sx={{ width: 150, height: 150, margin: 'auto' }}
            />
            <Typography align="center" mt={2}>
              {user.nickname || user.user_name}
            </Typography>
          </Grid>
        )}

        {/* 기본 정보 */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {Object.entries(labels).map(([key, label]) => {
              if (key === 'profile_picture') return null; // 프로필 사진은 이미 표시
              const value =
                key === 'user_date_of_birth' || key === 'created_at'
                  ? formatDate(user[key]) // 날짜 포맷팅
                  : user[key] || '정보 없음'; // 값이 없을 경우 '정보 없음' 표시
              return (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    label={label}
                    value={value}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
