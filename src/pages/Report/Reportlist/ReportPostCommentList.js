import ReportListPage from '../ReportList';

export const ReportPostCommentList = () => {
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
      title="신고 접수 - 게시글 댓글"
      columns={columns}
      domain={['post_comment']} // domain 배열로 전달
      detailPath="/dashboard/reports/post_comments"
    />
  );
};