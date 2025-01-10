import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ReportDetail from './ReportDetailbase';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDetailReport,
  fetchProcessedReport,
} from '../../redux/slices/reportSlice';

const ReportDetailContent = () => {
  const { domain, NO } = useParams();
  const dispatch = useDispatch();
  const reportData = useSelector(
    (state) => state.reports.selectedReport?.reportManagement || {}
  );

  const management = useSelector((state) => state.reports.reportManagement);
  console.log(reportData);
  console.log(management);

  useEffect(() => {
    if (domain && NO) {
      dispatch(fetchProcessedReport({ domain, NO })).then((response) =>
        console.log('fetchProcessedReport 응답:', response.payload)
      );
      dispatch(fetchDetailReport({ domain, NO })).then((response) =>
        console.log('fetchDetailReport 응답:', response.payload)
      );
    }
  }, [dispatch, domain, NO]);

  const getFields = (domain, reportData, management) => {
    if ((!reportData, !management)) return {};
    const fields = {
      // 각 도메인별 신고 필드를 정의
      feed_comments: {
        general: [
          {
            label: '접수 번호',
            value: management.feed_comment_report_number,
            readOnly: true,
          },
          { label: '신고 분류', value: '댓글', readOnly: true },
          {
            label: '신고자(아이디)',
            value: management.user_id,
            readOnly: true,
          },
          { label: '처리 상태', value: management.state, readOnly: false },
          {
            label: '신고사유',
            value: management.report_reason,
            readOnly: true,
          },
        ],
        additional: [
          { label: '댓글 내용', value: '댓글 내용입니다 .', readOnly: true },
        ],
        processing: [
          { label: '신고 처리 번호', value: reportData.report_man_number },
          { label: '관리자 번호', value: reportData.admin_number },
          { label: '처리 내용', value: reportData.report_content },
          { label: '정지일', value: reportData.ban_until },
          { label: '신고 처리일', value: reportData.resolution_at },
          {
            label: '처리 결과',
            value: '기각',
            type: 'select',
            options: ['기각', '삭제', '경고'],
          },
        ],
      },
      post_comments: {
        general: [
          {
            label: '접수 번호',
            value: management.post_comment_report_number,
            readOnly: true,
          },
          { label: '신고 분류', value: '댓글', readOnly: true },
          {
            label: '신고자(아이디)',
            value: management.user_id,
            readOnly: true,
          },
          { label: '처리 상태', value: management.state, readOnly: false },
          {
            label: '신고사유',
            value: management.report_reason,
            readOnly: true,
          },
        ],
        additional: [
          {
            label: '댓글 내용',
            value: '이 댓글은 문제가 있습니다.',
            readOnly: true,
          },
        ],
        processing: [
          { label: '신고 처리 번호', value: reportData.report_man_number },
          { label: '관리자 번호', value: reportData.admin_number },
          { label: '처리 내용', value: reportData.report_content },
          { label: '정지일', value: reportData.ban_until },
          { label: '신고 처리일', value: reportData.resolution_at },
          {
            label: '처리 결과',
            value: '기각',
            type: 'select',
            options: ['기각', '삭제', '경고'],
          },
        ],
      },
      posts: {
        general: [
          {
            label: '접수 번호',
            value: management.post_report_number,
            readOnly: true,
          },
          { label: '신고 분류', value: '게시글', readOnly: true },
          {
            label: '신고자(아이디)',
            value: management.user_id,
            readOnly: true,
          },
          { label: '처리 상태', value: management.state, readOnly: false },
          {
            label: '신고사유',
            value: management.report_reason,
            readOnly: true,
          },
        ],
        additional: [
          { label: '게시글 제목', value: '문제 있는 게시글', readOnly: true },
        ],
        processing: [
          { label: '신고 처리 번호', value: reportData.report_man_number },
          { label: '관리자 번호', value: reportData.admin_number },
          { label: '처리 내용', value: reportData.report_content },
          { label: '정지일', value: reportData.ban_until },
          { label: '신고 처리일', value: reportData.resolution_at },
          {
            label: '처리 결과',
            value: reportData.state,
            type: 'select',
            options: ['기각', '삭제'],
          },
        ],
      },
      mission_validations: {
        general: [
          { label: '접수 번호', value: '34567', readOnly: true },
          { label: '신고 분류', value: '미션 인증', readOnly: true },
          { label: '신고자(아이디)', value: 'user345', readOnly: true },
          { label: '처리 상태', value: '처리 중', readOnly: false },
          { label: '신고사유', value: '사칭입니다', readOnly: true },
          {
            label: '처리 결과',
            value: '기각',
            type: 'select',
            options: ['기각', '미션방 삭제'],
          },
        ],
        additional: [
          {
            label: '미션명 제목',
            value: '문제 있는 미션 제목',
            readOnly: true,
          },
        ],
        processing: [
          {
            label: '처리 결과',
            value: '기각',
            type: 'select',
            options: ['기각', '인증 삭제', '인증 성공'],
          },
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
          {
            label: '미션방 제목',
            value: '문제 있는 미션방 제목',
            readOnly: true,
          },
        ],
        processing: [
          { label: '신고 처리 번호', value: reportData.report_man_number },
          { label: '관리자 번호', value: reportData.admin_number },
          { label: '처리 내용', value: reportData.report_content },
          { label: '정지일', value: reportData.ban_until },
          { label: '신고 처리일', value: reportData.resolution_at },
          {
            label: '처리 결과',
            value: '기각',
            type: 'select',
            options: ['기각', '미션방 삭제'],
          },
        ],
      },
      feeds: {
        general: [
          {
            label: '접수 번호',
            value: management.feed_report_number,
            readOnly: true,
          },
          { label: '신고 분류', value: '피드', readOnly: true },
          {
            label: '신고자(아이디)',
            value: management.user_id,
            readOnly: true,
          },
          { label: '처리 상태', value: management.state, readOnly: false },
          {
            label: '신고사유',
            value: management.report_reason,
            readOnly: true,
          },
        ],
        additional: [
          { label: '피드 내용', value: '문제 있는 피드 내용', readOnly: true },
        ],
        processing: [
          { label: '신고 처리 번호', value: reportData.report_man_number },
          { label: '관리자 번호', value: reportData.admin_number },
          { label: '처리 내용', value: reportData.report_content },
          { label: '정지일', value: reportData.ban_until },
          { label: '신고 처리일', value: reportData.resolution_at },
          {
            label: '처리 결과',
            value: '기각',
            type: 'select',
            options: ['기각', '피드 삭제', '계정 정지'],
          },
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
          { label: '신고 처리 번호', value: reportData.report_man_number },
          { label: '관리자 번호', value: reportData.admin_number },
          { label: '처리 내용', value: reportData.report_content },
          { label: '정지일', value: reportData.ban_until },
          { label: '신고 처리일', value: reportData.resolution_at },
          {
            label: '처리 결과',
            value: '기각',
            type: 'select',
            options: ['기각', '경고', '정지'],
          },
        ],
      },
    };
    return fields[domain];
  };

  if (!reportData) {
    return <Typography>신고 데이터를 불러올 수 없습니다.</Typography>;
  }

  const fields = getFields(domain, reportData, management);
  console.log(fields);
  if (!fields || Object.keys(fields).length === 0) {
    return <Box>해당 도메인의 신고 정보가 없습니다.</Box>;
  }

  return (
    <Box width="100%" height="100%">
      <ReportDetail
        title={`신고 접수 - ${domain}`}
        domain={domain}
        fields={fields}
        NO={NO}
      />
    </Box>
  );
};

export default ReportDetailContent;
