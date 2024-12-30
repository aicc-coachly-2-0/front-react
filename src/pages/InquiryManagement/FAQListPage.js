import React from 'react';
import InquiryListPage from './InquiryListPage';

const FAQListPage = () => {
  const columns = ['NO', '작성자', '카테고리', '제목', '게시일', '노출상태'];
  const data = Array.from({ length: 10 }, (_, index) => ({
    NO: 30 - index,
    작성자: index % 2 === 0 ? '박준' : '이수',
    카테고리: index % 3 === 0 ? '공지' : '이벤트',
    제목: `N번째 FAQ 제목 (${index + 1})`,
    게시일: '2024-12-21',
    노출상태: '정상',
  }));

  return (
    <InquiryListPage
      title="문의 사항 관리 (FAQ)"
      columns={columns}
      data={data}
    />
  );
};

export default FAQListPage;
