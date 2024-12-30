import ReportListPage from '../ReportListPage';

export const ReportCommentListPage = () => {
  const columns = [
    'NO',
    '신고 분류',
    '신고자(아이디)',
    '댓글 내용',
    '신고일',
    '처리일',
    '처리 상태',
  ];
  const data = Array.from({ length: 10 }, (_, index) => ({
    NO: 20 - index,
    '신고 분류': index % 3 === 0 ? '경고' : index % 3 === 1 ? '신고' : '처리',
    '신고자(아이디)': `유저${index}(123***qw)`,
    '댓글 내용': `신고 댓글 내용입니다 (${index + 1})`,
    신고일: '2024-12-21 / 05:23AM',
    처리일: '2023-04-26',
    '처리 상태': '정상',
  }));

  return (
    <ReportListPage
      title="신고 접수 - 댓글"
      columns={columns}
      data={data}
      detailPath="/dashboard/reports/comments"
    />
  );
};
