import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ReportIcon from '@mui/icons-material/Report';
import EventNoteIcon from '@mui/icons-material/EventNote';

const mainListItems = [
  { text: '대시보드', icon: <HomeRoundedIcon />, path: '/dashboard' },
  {
    text: '회원관리',
    icon: <PeopleRoundedIcon />,
    path: '/dashboard/another',
  },
  {
    text: '커뮤니티',
    icon: <AssignmentRoundedIcon />,
    path: '/dashboard/clients',
  },
  { text: '공지', icon: <EventNoteIcon />, path: '/dashboard/notices' },
  { text: '신고', icon: <ReportIcon />, path: '/dashboard/reports' },
  {
    text: '문의사항',
    icon: <AnalyticsRoundedIcon />,
    path: '/dashboard/reports',
  },
];

const secondaryListItems = [
  {
    text: 'Settings',
    icon: <SettingsRoundedIcon />,
    path: '/dashboard/settings',
  },
  { text: 'About', icon: <InfoRoundedIcon />, path: '/dashboard/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, path: '/dashboard/feedback' },
];

export default function MenuContent() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
