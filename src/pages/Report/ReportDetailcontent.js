import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import ReportDetail from './ReportDetail';

// ReportDetailContent 컴포넌트는 도메인에 맞는 신고 정보를 표시하는 역할
const ReportDetailContent = () => {
  const { domain, NO } = useParams(); // URL에서 domain과 NO 추출
  // 도메인에 맞는 필드를 반환하는 함수
  const getFields = () => {
    const fields = {
      // 각 도메인별 신고 필드를 정의
      Comment: {
        general: [
          { label: '접수 번호', value: '12345', readOnly: true },
          { label: '신고 분류', value: '댓글', readOnly: true },
          { label: '신고자(아이디)', value: 'user123', readOnly: true },
          { label: '처리 상태', value: '처리 중', readOnly: false },
        ],
        additional: [
          { label: '댓글 내용', value: '이 댓글은 문제가 있습니다.', readOnly: true },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '삭제', '경고'] },
        ],
      },
      Post: {
        general: [
          { label: '접수 번호', value: '23456', readOnly: true },
          { label: '신고 분류', value: '게시글', readOnly: true },
          { label: '신고자(아이디)', value: 'user234', readOnly: true },
          { label: '처리 상태', value: '처리 중', readOnly: false },
        ],
        additional: [
          { label: '게시글 제목', value: '문제 있는 게시글', readOnly: true },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '삭제', '경고'] },
        ],
      },
      MissionAuth: {
        general: [
          { label: '접수 번호', value: '34567', readOnly: true },
          { label: '신고 분류', value: '미션 인증', readOnly: true },
          { label: '신고자(아이디)', value: 'user345', readOnly: true },
          { label: '처리 상태', value: '처리 중', readOnly: false },
        ],
        additional: [
          { label: '미션명 제목', value: '문제 있는 미션 제목', readOnly: true },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '인증 삭제', '인증 성공'] },
        ],
      },
      MissionRoom: {
        general: [
          { label: '접수 번호', value: '45678', readOnly: true },
          { label: '신고 분류', value: '미션방', readOnly: true },
          { label: '신고자(아이디)', value: 'user456', readOnly: true },
          { label: '처리 상태', value: '처리 중', readOnly: false },
        ],
        additional: [
          { label: '미션방 제목', value: '문제 있는 미션방 제목', readOnly: true },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '미션방 삭제'] },
        ],
      },
      Feed: {
        general: [
          { label: '접수 번호', value: '56789', readOnly: true },
          { label: '신고 분류', value: '피드', readOnly: true },
          { label: '신고자(아이디)', value: 'user567', readOnly: true },
          { label: '처리 상태', value: '처리 중', readOnly: false },
        ],
        additional: [
          { label: '피드 내용', value: '문제 있는 피드 내용', readOnly: true },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '피드 삭제', '계정 정지'] },
        ],
      },
      User: {
        general: [
          { label: '접수 번호', value: '67890', readOnly: true },
          { label: '신고 분류', value: '유저', readOnly: true },
          { label: '신고자(아이디)', value: 'user678', readOnly: true },
          { label: '처리 상태', value: '처리 중', readOnly: false },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '경고', '정지'] },
        ],
      },
    };
    console.log('ReportDetail 컴포넌트가 렌더링되었습니다.');
    console.log('전달된 필드:', fields);
    
    return fields[domain] || {}; // 주어진 domain에 해당하는 필드를 반환, 없으면 빈 객체 반환
  };

  // domain에 해당하는 필드 정보 가져오기
  const fields = getFields(domain);

  // 필드 정보가 없으면 사용자에게 해당 도메인의 신고 정보가 없음을 표시
  if (!fields || Object.keys(fields).length === 0) {
    return <Box>해당 도메인의 신고 정보가 없습니다.</Box>;
  }
  
  return (
    <Box width="100%" height="100%">
      {/* ReportDetail 컴포넌트를 렌더링하고 필드를 전달 */}
      <ReportDetail
        title={`신고 접수 - ${domain}`} // 제목에 도메인 정보를 포함
        domain={domain}
        fields={fields} // 신고 관련 필드를 전달
        NO={NO} // NO 값도 전달
      />
    </Box>
  );
};

export default ReportDetailContent;
