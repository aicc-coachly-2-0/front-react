import React from 'react';
import InquiryListPage from './InquiryListPage';

const QNAListPage = () => {
  const columns = [
    'NO',
    '회원(아이디)',
    '카테고리',
    '제목',
    '작성일',
    '답변일',
    '답변상태',
  ];
  const data = Array.from({ length: 10 }, (_, index) => ({
    NO: 30 - index,
    '회원(아이디)': `유저${index}(123***qw)`,
    카테고리: index % 3 === 0 ? '공지' : '일반',
    제목: `N번째 문의사항 (${index + 1})`,
    작성일: '2023-04-26',
    답변일: '2024-12-21',
    답변상태: index % 2 === 0 ? '완료' : '미완료',
  }));

  return (
    <InquiryListPage
      title="문의 사항 관리 (Q&A)"
      columns={columns}
      data={data}
    />
  );
};

export default QNAListPage;
