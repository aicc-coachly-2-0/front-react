import ReportListPage from '../ReportList';

export const ReportFeedList = () => {
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
      title="신고 접수 - 피드"
      columns={columns}
      detailPath="/dashboard/reports/feeds"
      domain="feed" // domain 값을 추가로 전달
    />
  );
};
