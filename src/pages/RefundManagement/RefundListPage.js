import React from 'react';
import RefundListPageCommon from './RefundListPageCommon';

const RefundListPage = () => {
  const columns = [
    'NO',
    '회원(아이디)',
    '환불 금액',
    '환불 사유',
    '요청일',
    '처리 상태',
  ];
  const data = Array.from({ length: 10 }, (_, index) => ({
    NO: 10 - index,
    '회원(아이디)': `user${index}(123***qw)`,
    '환불 금액': `${(index + 1) * 10000}원`,
    '환불 사유': `환불 사유 ${index + 1}`,
    요청일: '2024-12-21 / 05:23AM',
    '처리 상태': index % 2 === 0 ? '승인 완료' : '대기 중',
  }));

  return (
    <RefundListPageCommon
      title="환불 처리 관리"
      columns={columns}
      data={data}
    />
  );
};

export default RefundListPage;
