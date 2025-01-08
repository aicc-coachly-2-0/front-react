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
  const data = Array.from({ length: 10 }, (_, index) => ({
    NO: 20 - index,
    '신고자(아이디)': `유저${index}(123***qw)`,
    '신고대상(아이디)': `유저대상${index}(456***qw)`,
    신고일: '2024-12-21 / 05:23AM',
    처리일: '2023-04-26',
    '처리 상태': '정상',
  }));

  return (
    <ReportListPage
      title="신고 접수 - 유저"
      columns={columns}
      data={data}
      detailPath="/dashboard/reports/users"
      domain="user" // domain 값을 추가로 전달
    />
  );
};
