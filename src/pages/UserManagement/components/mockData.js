// mockData.js
export const mockUser = {
  id: 'abc1234',
  name: '김OO',
  nickname: 'sirspdia',
  email: 'abcd123@gmail.com',
  contact: '010-1234-1234',
  birthDate: '1987-12-12',
  gender: '남성',
};

export const mockReports = [
  {
    date: '2024-12-20',
    reason: '폭력적인 언어를 지속적으로 사용했습니다.',
    reporter: 'p3in',
  },
  {
    date: '2024-12-11',
    reason: '부적절한 댓글 작성.',
    reporter: 'user12',
  },
];

export const mockHistory = Array.from({ length: 5 }, (_, index) => ({
  id: 20 - index,
  serviceName: 'Coachly AI 서비스 사용',
  amount: '₩9,900/month',
  paymentDate: '2023-04-26',
  status: index === 0 ? '미구독' : index === 1 ? '환불 신청중' : '구독중',
}));
