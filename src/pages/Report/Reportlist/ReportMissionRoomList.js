import ReportListPage from '../ReportList';

export const ReportMissionRoomList = () => {
  const columns = [
    'NO',
    '신고자(아이디)',
    '미션방 제목',
    '신고일',
    '처리일',
    '처리 상태',
  ];
  
  return (
    <ReportListPage
      title="신고 접수 - 미션방"
      columns={columns}
      detailPath="/dashboard/reports/missions"
      domain="mission" // domain 값을 추가로 전달
    />
  );
};
