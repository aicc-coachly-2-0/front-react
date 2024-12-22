import React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

// Render 함수 정의
export function renderAvatar(params) {
  if (params.value == null) return null;
  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

// Sparkline 데이터 생성
function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const daysInMonth = date.getDate();
  return Array.from({ length: daysInMonth }, (_, i) => `Day ${i + 1}`);
}

function renderSparklineCell(params) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{ scaleType: 'band', data }}
      />
    </div>
  );
}

// Columns 정의
export const columns = [
  { field: 'pageTitle', headerName: 'Page Title', flex: 1.5, minWidth: 200 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.5,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === 'Online' ? 'success' : 'default'}
        size="small"
      />
    ),
  },
  {
    field: 'users',
    headerName: 'Users',
    flex: 1,
    minWidth: 80,
    align: 'right',
  },
  {
    field: 'eventCount',
    headerName: 'Event Count',
    flex: 1,
    minWidth: 100,
    align: 'right',
  },
  {
    field: 'viewsPerUser',
    headerName: 'Views per User',
    flex: 1,
    minWidth: 120,
    align: 'right',
  },
  {
    field: 'averageTime',
    headerName: 'Average Time',
    flex: 1,
    minWidth: 100,
    align: 'right',
  },
  {
    field: 'conversions',
    headerName: 'Daily Conversions',
    flex: 1,
    renderCell: renderSparklineCell,
  },
];

// Rows 데이터 정의
export const rows = [
  {
    id: 1,
    pageTitle: 'Homepage Overview',
    status: 'Online',
    users: 212423,
    eventCount: 8345,
    viewsPerUser: 18.5,
    averageTime: '2m 15s',
    conversions: Array.from({ length: 30 }, (_, i) => 1000 + i * 100),
  },
  // 추가 행 데이터를 여기에 정의...
];

export default { columns, rows };
