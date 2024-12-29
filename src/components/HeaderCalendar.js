import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import dayjs from 'dayjs';

// IconButton을 테마에 맞게 스타일링
const ThemedIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function HeaderCalendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 기준 날짜: 오늘
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemedIconButton
        onClick={() => setOpen(true)}
        aria-label="Open calendar"
        size="medium" // 아이콘 크기
      >
        <CalendarMonthRoundedIcon />
      </ThemedIconButton>
      <DatePicker
        open={open}
        onClose={() => setOpen(false)}
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              display: 'none', // 헤더에선 숨김
            }}
          />
        )}
        // DatePicker 스타일링
        PopperProps={{
          sx: {
            '& .MuiPaper-root': {
              backgroundColor: (theme) => theme.palette.background.paper,
              color: (theme) => theme.palette.text.primary,
              border: `1px solid ${(theme) => theme.palette.divider}`,
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
