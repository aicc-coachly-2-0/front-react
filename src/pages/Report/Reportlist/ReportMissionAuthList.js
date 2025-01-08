import ReportListPage from '../ReportList';

export const ReportMissionAuthList = () => {
  const columns = [
    'NO',
    '신고자(아이디)',
    '미션명 제목',
    '신고일',
    '처리일',
    '처리 상태',
  ];
  const data = Array.from({ length: 10 }, (_, index) => ({
    NO: 20 - index,
    '신고자(아이디)': `유저${index}(123***qw)`,
    '미션명 제목': `신고 미션명 제목입니다 (15자 미리보기 ${index})`,
    신고일: '2024-12-21 / 05:23AM',
    처리일: '2023-04-26',
    '처리 상태': '정상',
  }));

  return (
    <ReportListPage
      title="신고 접수 - 미션 인증"
      columns={columns}
      data={data}
      detailPath="/dashboard/reports/mission_validations"
      domain="mission_validation" // domain 값을 추가로 전달
    />
  );
};
