import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
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
    path: '/dashboard/UserManagement',
  },
  {
    text: '신고 접수',
    icon: <AssignmentRoundedIcon />,
    subItems: [
      { text: '유저 신고', path: '/dashboard/reports/users' },
      { text: '게시글 댓글 신고', path: '/dashboard/reports/post_comments' },
      { text: '피드댓글 신고', path: '/dashboard/reports/feed_comments' },
      { text: '게시글 신고', path: '/dashboard/reports/posts' },
      { text: '피드 신고', path: '/dashboard/reports/feeds' },
      { text: '미션 인증 신고', path: '/dashboard/reports/mission_validations' },
      { text: '미션방 신고', path: '/dashboard/reports/missions' },
    ],
  },
  {
    text: '환불 처리',
    icon: <MonetizationOnIcon />,
    path: '/dashboard/refund',
  },
  { text: '공지', icon: <EventNoteIcon />, path: '/dashboard/notice' },
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
  const [openMenus, setOpenMenus] = React.useState({});

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleMenu = (index) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
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
          <React.Fragment key={index}>
            <ListItem disablePadding sx={{ display: 'block', mt: 1, mb: 1 }}>
              <ListItemButton
                onClick={() =>
                  item.subItems
                    ? toggleMenu(index)
                    : handleNavigation(item.path)
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.subItems ? (
                  openMenus[index] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>
            </ListItem>
            {item.subItems && (
              <Collapse in={openMenus[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem, subIndex) => (
                    <ListItem
                      key={subIndex}
                      disablePadding
                      sx={{ pl: 4, mt: 0.5, mb: 0.5 }}
                    >
                      <ListItemButton
                        onClick={() => handleNavigation(subItem.path)}
                      >
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}
