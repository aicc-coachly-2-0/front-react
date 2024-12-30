import React from 'react';
import InquiryDetailPage from './InquiryDetailPage';

const QNADetailPage = () => {
  const fields = [
    { label: '제목', value: 'Q&A 제목', readOnly: false, fullWidth: true },
    { label: '카테고리', value: '일반', readOnly: false },
    { label: '작성자(아이디)', value: 'user123', readOnly: true },
    { label: '작성일', value: '2024-12-21', readOnly: true },
    { label: '내용', value: 'Q&A 내용', readOnly: false, fullWidth: true },
  ];

  return <InquiryDetailPage title="문의 사항 관리 (Q&A)" fields={fields} />;
};

export default QNADetailPage;
