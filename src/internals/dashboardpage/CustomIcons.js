import React from 'react';
import FlagIcon from '@mui/icons-material/Flag';

// 컴포넌트를 함수로 변경
export const IndiaFlag = () => <FlagIcon style={{ color: 'orange' }} />;
export const UsaFlag = () => <FlagIcon style={{ color: 'blue' }} />;
export const BrazilFlag = () => <FlagIcon style={{ color: 'green' }} />;
export const GlobeFlag = () => <FlagIcon style={{ color: 'gray' }} />;

const countries = [
  { name: 'India', value: 50, flag: IndiaFlag, color: 'hsl(220, 25%, 65%)' },
  { name: 'USA', value: 35, flag: UsaFlag, color: 'hsl(220, 25%, 45%)' },
  { name: 'Brazil', value: 10, flag: BrazilFlag, color: 'hsl(220, 25%, 30%)' },
  { name: 'Other', value: 5, flag: GlobeFlag, color: 'hsl(220, 25%, 20%)' },
];

export default countries;
