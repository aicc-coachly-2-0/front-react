import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import ReportDetail from './ReportDetailbase';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailReport, processReport, fetchProcessedReport } from '../../redux/slices/reportSlice'; 

// ReportDetailContent 컴포넌트는 도메인에 맞는 신고 정보를 표시하는 역할
const ReportDetailContent = () => {
  const { domain, NO } = useParams(); // URL에서 domain과 NO 추출
  console.log("도메인:", domain, "번호:", NO)
  const dispatch = useDispatch(); // Redux 디스패치 함수

  const [adminNumber, setAdminNumber] = useState('');
  const [adminId, setAdminId] = useState('');
  const reportData = useSelector((state) => state.reports.selectedReport);

  useEffect(() => {
    if (domain && NO) {
      dispatch(fetchDetailReport({ domain, NO })); // 신고 상세 정보 가져오기
      dispatch(fetchProcessedReport({ domain, NO })); // 처리된 신고 정보 가져오기
    }
  }, [dispatch, domain, NO]);
   
// 관리자 아이디 및 작성시간 설정
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('user'));
    if (adminData) {
      setAdminId(adminData.admin_id);
      setAdminNumber(adminData.admin_number);
    }
  }, []);
  
  // 도메인에 맞는 필드를 반환하는 함수
  const getFields = (domain, reportData) => {
    if (!reportData) return {}; // reportData가 없을 때 빈 객체 반환
    console.log(reportData)

    const fields = {
      // 각 도메인별 신고 필드를 정의
      feed_comments: {
        general: [
          { label: '접수 번호', value: reportData.feed_comment_report_number, readOnly: true },
          { label: '신고 분류', value: '댓글', readOnly: true },
          { label: '신고자(아이디)', value: reportData.user_id, readOnly: true },
          { label: '처리 상태', value: reportData.state, readOnly: false },
          { label: '신고사유', value: reportData.report_reason, readOnly: true },
        ],
        additional: [
          { label: '댓글 내용', value: '댓글 내용입니다 .', readOnly: true },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '삭제', '경고'] },
        ],
      },
      post_comments: {
        general: [
          { label: '접수 번호', value: reportData.post_comment_report_number, readOnly: true },
          { label: '신고 분류', value: '댓글', readOnly: true },
          { label: '신고자(아이디)', value: reportData.user_id, readOnly: true },
          { label: '처리 상태', value: reportData.state, readOnly: false },
          { label: '신고사유', value: reportData.report_reason, readOnly: true },
        ],
        additional: [
          { label: '댓글 내용', value: '이 댓글은 문제가 있습니다.', readOnly: true },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '삭제', '경고'] },
        ],
      },
      posts: {
        general: [
          { label: '접수 번호', value: reportData.post_report_number, readOnly: true },
          { label: '신고 분류', value: '게시글', readOnly: true },
          { label: '신고자(아이디)', value: reportData.user_id, readOnly: true },
          { label: '처리 상태', value: reportData.state, readOnly: false },
          { label: '신고사유', value: reportData.report_reason, readOnly: true },
        ],
        additional: [
          { label: '게시글 제목', value: '문제 있는 게시글', readOnly: true },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '삭제', '경고'] },
        ],
      },
      mission_validations: {
        general: [
          { label: '접수 번호', value: '34567', readOnly: true },
          { label: '신고 분류', value: '미션 인증', readOnly: true },
          { label: '신고자(아이디)', value: 'user345', readOnly: true },
          { label: '처리 상태', value: '처리 중', readOnly: false },
          { label: '신고사유', value: '사칭입니다', readOnly: true },
        ],
        additional: [
          { label: '미션명 제목', value: '문제 있는 미션 제목', readOnly: true },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '인증 삭제', '인증 성공'] },
        ],
      },
      missions: {
        general: [
          { label: '접수 번호', value: '45678', readOnly: true },
          { label: '신고 분류', value: '미션방', readOnly: true },
          { label: '신고자(아이디)', value: 'user456', readOnly: true },
          { label: '처리 상태', value: '처리 중', readOnly: false },
          { label: '신고사유', value: '사칭입니다', readOnly: true },
        ],
        additional: [
          { label: '미션방 제목', value: '문제 있는 미션방 제목', readOnly: true },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '미션방 삭제'] },
        ],
      },
      feeds: {
        general: [
          { label: '접수 번호', value: reportData.feed_report_number, readOnly: true },
          { label: '신고 분류', value: '피드', readOnly: true },
          { label: '신고자(아이디)', value: reportData.user_id, readOnly: true },
          { label: '처리 상태', value: reportData.state, readOnly: false },
          { label: '신고사유', value: reportData.report_reason, readOnly: true },
        ],
        additional: [
          { label: '피드 내용', value: '문제 있는 피드 내용', readOnly: true },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '피드 삭제', '계정 정지'] },
        ],
      },
      users: {
        general: [
          { label: '접수 번호', value: '67890', readOnly: true },
          { label: '신고 분류', value: '유저', readOnly: true },
          { label: '신고자(아이디)', value: 'user678', readOnly: true },
          { label: '처리 상태', value: '처리 중', readOnly: false },
          { label: '신고사유', value: '사칭입니다', readOnly: true },
        ],
        processing: [
          { label: '처리 결과', value: '기각', type: 'select', options: ['기각', '경고', '정지'] },
        ],
      },
    };
    console.log('ReportDetail 컴포넌트가 렌더링되었습니다.');
    return fields[domain] 
  };

  // domain에 해당하는 필드 정보 가져오기
  const fields = getFields(domain, reportData);
  console.log("필드",fields)

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
