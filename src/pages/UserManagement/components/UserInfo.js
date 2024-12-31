import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

export const UserInfo = ({ user }) => {
  return (
    <Box mb={4}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        유저 세부 관리
      </Typography>
      <Box display="flex" gap={2}>
        {Object.entries(user).map(([key, value]) => (
          <Box key={key} flex="1">
            <TextField
              label={key.toUpperCase()}
              value={value}
              fullWidth
              size="small"
              InputProps={{ readOnly: true }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
