import * as React from 'react';
import Stack from '@mui/material/Stack';
// import CustomDatePicker from '../components/CustomDatePicker'; // 경로 수정
import NavbarBreadcrumbs from '../components/NavbarBreadcrumbs'; // 경로 수정
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown'; // 경로 수정
import LogoutBtuuon from './LogoutBtuuon';
import HeaderCalendar from './HeaderCalendar';
export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        {/* <CustomDatePicker /> */}
        <HeaderCalendar />
        <ColorModeIconDropdown />
        <LogoutBtuuon />
      </Stack>
    </Stack>
  );
}
