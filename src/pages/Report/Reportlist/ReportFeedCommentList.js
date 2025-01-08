import ReportListPage from '../ReportList';

export const ReportFeedCommentList = () => {
  const columns = [
    'NO',
    '신고자(아이디)',
    '신고사유',
    '신고일',
    '처리일',
    '처리 상태',
  ];

  return (
    <ReportListPage
      title="신고 접수 - 피드댓글"
      columns={columns}
      domain={['feed_comment']} // domain 배열로 전달
      detailPath="/dashboard/reports/feed_comments"
    />
  );
};