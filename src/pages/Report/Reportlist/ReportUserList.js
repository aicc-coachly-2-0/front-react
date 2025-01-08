import ReportListPage from '../ReportList';

export const ReportUserList = () => {
  const columns = [
    'NO',
    '신고자(아이디)',
    '신고대상(아이디)',
    '신고일',
    '처리일',
    '처리 상태',
  ];

  return (
    <ReportListPage
      title="신고 접수 - 유저"
      columns={columns}
      detailPath="/dashboard/reports/users"
      domain="user" // domain 값을 추가로 전달
    />
  );
};
