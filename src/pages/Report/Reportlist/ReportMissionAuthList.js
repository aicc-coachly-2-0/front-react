import ReportListPage from '../ReportList';

export const ReportMissionAuthList = () => {
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
      title="신고 접수 - 미션 인증"
      columns={columns}
      detailPath="/dashboard/reports/mission_validations"
      domain="mission_validation" // domain 값을 추가로 전달
    />
  );
};
