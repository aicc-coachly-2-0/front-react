import ReportListPage from '../ReportList';

export const ReportCommentList = () => {
  const columns = [
    'NO',
    '신고자(아이디)',
    '댓글 내용',
    '신고일',
    '처리일',
    '처리 상태',
  ];

  return (
    <ReportListPage
      title="신고 접수 - 댓글"
      columns={columns}
      detailPath="/dashboard/reports/comments"
      domain="comment" // domain 값을 추가로 전달
    />
  );
};
