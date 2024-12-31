import React from 'react';
import { useParams } from 'react-router-dom';
import InquiryDetail from '../InquiryDetail';

const QNADetail = () => {
  const { id } = useParams(); // URL 파라미터에서 ID 가져오기

  const fields = [
    {
      label: '제목',
      value: `Q&A 제목 (ID: ${id})`,
      readOnly: false,
      fullWidth: true,
    },
    { label: '카테고리', value: '일반', readOnly: false },
    { label: '작성자(아이디)', value: 'user123', readOnly: true },
    { label: '작성일', value: '2024-12-21', readOnly: true },
    { label: '내용', value: 'Q&A 내용', readOnly: false, fullWidth: true },
  ];

  return <InquiryDetail title="문의 사항 관리 (Q&A)" fields={fields} />;
};

export default QNADetail;
