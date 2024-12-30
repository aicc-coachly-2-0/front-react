import React from 'react';
import { useNavigate } from 'react-router-dom';
import InquiryListPage from './InquiryListPage';

const FAQListPage = () => {
  const navigate = useNavigate();
  const columns = ['NO', '작성자', '카테고리', '제목', '게시일', '노출상태'];
  const data = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1, // 상세 페이지 이동을 위한 고유 ID 추가
    NO: 30 - index,
    작성자: index % 2 === 0 ? '박준' : '이수',
    카테고리: index % 3 === 0 ? '공지' : '이벤트',
    제목: `N번째 FAQ 제목 (${index + 1})`,
    게시일: '2024-12-21',
    노출상태: '정상',
  }));

  const handleRowClick = (id) => {
    navigate(`/dashboard/inquiry/faq/${id}`);
  };

  return (
    <InquiryListPage
      title="문의 사항 관리 (FAQ)"
      columns={columns}
      data={data.map((row) => ({
        ...row,
        onClick: () => handleRowClick(row.id), // 클릭 이벤트 추가
      }))}
    />
  );
};

export default FAQListPage;
