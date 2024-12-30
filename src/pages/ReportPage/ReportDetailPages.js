import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  useTheme,
} from '@mui/material';

const ReportDetailPage = ({ title, fields }) => {
  const theme = useTheme(); // MUI Theme 사용
  return (
    <Box
      p={3}
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      boxSizing="border-box"
      overflow="auto"
      bgcolor={theme.palette.background.default} // 테마 배경색 사용
    >
      <Typography variant="h5" fontWeight="bold" mb={3}>
        {title}
      </Typography>

      {/* 신고 정보 섹션 */}
      <Box
        mb={3}
        p={2}
        borderRadius="8px"
        bgcolor={theme.palette.background.paper} // 테마 카드 배경색 사용
        boxShadow={1}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          신고 정보
        </Typography>
        <Grid container spacing={2}>
          {fields.general.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                label={field.label}
                defaultValue={field.value}
                InputProps={{ readOnly: field.readOnly }}
                fullWidth
                size="small"
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 추가 정보 섹션 */}
      {fields.additional && (
        <Box
          mb={3}
          p={2}
          borderRadius="8px"
          bgcolor={theme.palette.background.paper}
          boxShadow={1}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            추가 정보
          </Typography>
          <Grid container spacing={2}>
            {fields.additional.map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  label={field.label}
                  defaultValue={field.value}
                  InputProps={{ readOnly: field.readOnly }}
                  fullWidth
                  size="small"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* 처리 정보 섹션 */}
      <Box
        p={2}
        borderRadius="8px"
        bgcolor={theme.palette.background.paper}
        boxShadow={1}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          처리 정보
        </Typography>
        <Grid container spacing={2}>
          {fields.processing.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              {field.type === 'select' ? (
                <Select defaultValue={field.value} fullWidth size="small">
                  {field.options.map((option, i) => (
                    <MenuItem value={option} key={i}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <TextField
                  label={field.label}
                  defaultValue={field.value}
                  InputProps={{ readOnly: field.readOnly }}
                  fullWidth
                  size="small"
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 액션 버튼 */}
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button variant="outlined" color="secondary" size="large">
          취소
        </Button>
        <Button variant="contained" color="primary" size="large">
          저장
        </Button>
      </Box>
    </Box>
  );
};

const ReportDetailPages = {
  Comment: () => (
    <Box width="100%" height="100%">
      <ReportDetailPage
        title="신고 접수 - 댓글"
        fields={{
          general: [
            { label: '접수 번호', value: '12345', readOnly: true },
            { label: '신고 분류', value: '댓글', readOnly: true },
            { label: '신고자(아이디)', value: 'user123', readOnly: true },
            { label: '처리 상태', value: '처리 중', readOnly: false },
          ],
          additional: [
            {
              label: '댓글 내용',
              value: '이 댓글은 문제가 있습니다.',
              readOnly: true,
            },
          ],
          processing: [
            {
              label: '처리 결과',
              value: '기각',
              type: 'select',
              options: ['기각', '삭제', '경고'],
            },
          ],
        }}
      />
    </Box>
  ),
  Post: () => (
    <Box width="100%" height="100%">
      <ReportDetailPage
        title="신고 접수 - 게시글"
        fields={{
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
            {
              label: '처리 결과',
              value: '기각',
              type: 'select',
              options: ['기각', '삭제', '경고'],
            },
          ],
        }}
      />
    </Box>
  ),
  MissionAuth: () => (
    <Box width="100%" height="100%">
      <ReportDetailPage
        title="신고 접수 - 미션 인증"
        fields={{
          general: [
            { label: '접수 번호', value: '34567', readOnly: true },
            { label: '신고 분류', value: '미션 인증', readOnly: true },
            { label: '신고자(아이디)', value: 'user345', readOnly: true },
            { label: '처리 상태', value: '처리 중', readOnly: false },
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
        }}
      />
    </Box>
  ),
  MissionRoom: () => (
    <Box width="100%" height="100%">
      <ReportDetailPage
        title="신고 접수 - 미션방"
        fields={{
          general: [
            { label: '접수 번호', value: '45678', readOnly: true },
            { label: '신고 분류', value: '미션방', readOnly: true },
            { label: '신고자(아이디)', value: 'user456', readOnly: true },
            { label: '처리 상태', value: '처리 중', readOnly: false },
          ],
          additional: [
            {
              label: '미션방 제목',
              value: '문제 있는 미션방 제목',
              readOnly: true,
            },
          ],
          processing: [
            {
              label: '처리 결과',
              value: '기각',
              type: 'select',
              options: ['기각', '미션방 삭제'],
            },
          ],
        }}
      />
    </Box>
  ),
  Feed: () => (
    <Box width="100%" height="100%">
      <ReportDetailPage
        title="신고 접수 - 피드"
        fields={{
          general: [
            { label: '접수 번호', value: '56789', readOnly: true },
            { label: '신고 분류', value: '피드', readOnly: true },
            { label: '신고자(아이디)', value: 'user567', readOnly: true },
            { label: '처리 상태', value: '처리 중', readOnly: false },
          ],
          additional: [
            {
              label: '피드 내용',
              value: '문제 있는 피드 내용',
              readOnly: true,
            },
          ],
          processing: [
            {
              label: '처리 결과',
              value: '기각',
              type: 'select',
              options: ['기각', '피드 삭제', '계정 정지'],
            },
          ],
        }}
      />
    </Box>
  ),
  User: () => (
    <Box width="100%" height="100%">
      <ReportDetailPage
        title="신고 접수 - 유저"
        fields={{
          general: [
            { label: '접수 번호', value: '67890', readOnly: true },
            { label: '신고 분류', value: '유저', readOnly: true },
            { label: '신고자(아이디)', value: 'user678', readOnly: true },
            { label: '처리 상태', value: '처리 중', readOnly: false },
          ],
          processing: [
            {
              label: '처리 결과',
              value: '기각',
              type: 'select',
              options: ['기각', '경고', '정지'],
            },
          ],
        }}
      />
    </Box>
  ),
};

export default ReportDetailPages;
