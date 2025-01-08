import ReportListPage from '../ReportList';

export const ReportPostList = () => {
  const columns = [
    'NO',
    '신고자(아이디)',
    '게시글 제목',
    '신고일',
    '처리일',
    '처리 상태',
  ];

  return (
    <ReportListPage
      title="신고 접수 - 유저"
      columns={columns}
      detailPath="/dashboard/reports/posts"
      domain="post" // domain 값을 추가로 전달
    />
  );
};
