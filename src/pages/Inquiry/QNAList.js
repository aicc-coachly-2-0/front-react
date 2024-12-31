import React from 'react';
import { useNavigate } from 'react-router-dom';
import InquiryList from './InquiryList';

const QNAList = () => {
  const navigate = useNavigate();
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
    id: index + 1, // 상세 페이지 이동을 위한 고유 ID 추가
    NO: 30 - index,
    '회원(아이디)': `유저${index}(123***qw)`,
    카테고리: index % 3 === 0 ? '공지' : '일반',
    제목: `N번째 문의사항 (${index + 1})`,
    작성일: '2023-04-26',
    답변일: '2024-12-21',
    답변상태: index % 2 === 0 ? '완료' : '미완료',
  }));

  const handleRowClick = (id) => {
    navigate(`/dashboard/inquiry/qna/${id}`);
  };

  return (
    <InquiryList
      title="문의 사항 관리 (Q&A)"
      columns={columns}
      data={data.map((row) => ({
        ...row,
        onClick: () => handleRowClick(row.id), // 클릭 이벤트 추가
      }))}
    />
  );
};

export default QNAList;
