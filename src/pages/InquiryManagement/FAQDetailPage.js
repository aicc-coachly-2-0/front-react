import React from 'react';
import InquiryDetailPage from './InquiryDetailPage';

const FAQDetailPage = () => {
  const fields = [
    { label: '카테고리', value: '일반', readOnly: false },
    { label: '관리자(아이디)', value: 'admin123', readOnly: true },
    { label: '게시일', value: '2024-12-21', readOnly: true },
    { label: '질문', value: 'FAQ 질문 내용', readOnly: false, fullWidth: true },
    { label: '답변', value: 'FAQ 답변 내용', readOnly: false, fullWidth: true },
  ];

  return (
    <InquiryDetailPage title="문의 사항 관리 (FAQ)" fields={fields} isFAQ />
  );
};

export default FAQDetailPage;
