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
import EventNoteIcon from '@mui/icons-material/EventNote';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const mainListItems = [
  { text: '홈', icon: <HomeRoundedIcon />, path: '/dashboard' },
  {
    text: '유저 관리',
    icon: <PeopleRoundedIcon />,
    path: '/dashboard/UserManagementPage',
  },
  {
    text: '신고 접수',
    icon: <AssignmentRoundedIcon />,
    subItems: [
      { text: '댓글 신고', path: '/dashboard/reports/comments' },
      { text: '게시글 신고', path: '/dashboard/reports/posts' },
      { text: '미션 인증 신고', path: '/dashboard/reports/mission-auth' },
      { text: '미션방 신고', path: '/dashboard/reports/mission-room' },
      { text: '피드 신고', path: '/dashboard/reports/feeds' },
      { text: '유저 신고', path: '/dashboard/reports/users' },
    ],
  },
  {
    text: '환불 처리',
    icon: <MonetizationOnIcon />,
    path: '/dashboard/refund',
  },
  { text: '공지', icon: <EventNoteIcon />, path: '/dashboard/announcement' },
  {
    text: '문의사항',
    icon: <AnalyticsRoundedIcon />,
    subItems: [
      { text: '문의 사항 관리 (FAQ)', path: '/dashboard/inquiry/faq' },
      { text: '문의 사항 관리 (Q&A)', path: '/dashboard/inquiry/qna' },
    ],
  },
];

export default function MenuContent() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Stack
      sx={{
        flexGrow: 1,
        p: 1,
        justifyContent: 'space-between',
      }}
    >
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: 'block', mt: 1, mb: 1 }}
          >
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
