// Placeholder data for this week's static deployment (S3 + CloudFront only).
// From a later week, these arrays will be replaced by AppSync GraphQL calls
// (listProjects / getProject / listReviews / createReview / createContact)
// backed by the DynamoDB tables in the plan document (ProjectsTable, ReviewTable, InviteTable, ContactTable).

var SAMPLE_PROJECTS = [
  {
    id: "p4",
    title: "자기소개 웹앱 (본 프로젝트)",
    startDate: "2026-11-01",
    period: "2026.11 - 진행중",
    role: "기획 · 프론트엔드 · AWS 인프라",
    tech: "HTML, CSS, JavaScript, AWS S3, CloudFront, AppSync, DynamoDB",
    result: "정적 사이트를 S3 + CloudFront로 배포하고 서버리스 API로 문의/후기 기능을 구현",
    link: "#"
  },
  {
    id: "p3",
    title: "GitInsight 2.0",
    startDate: "2026-11-09",
    period: "2026.11 (해커톤)",
    role: "A파트: 분석 엔진 (레포 분석 · 기여 근거 검증 · LLM 출제/검토)",
    tech: "Python, TypeScript, Docker, tree-sitter, LLM API(GPT/Gemini)",
    result: "GitHub 커밋 이력을 근거로 꼬리질문을 이어가는 AI 모의 기술면접 서비스의 분석 엔진 개발 - 코드 근거를 줄 단위로 대조해 불필요한 재출제를 줄이는 검증 로직 개선",
    link: "https://github.com/GitInsight2-0/GitInsight2.0"
  },
  {
    id: "p2",
    title: "healthcare-2-emergency",
    startDate: "2026-10-23",
    period: "2026.10 - 2026.11",
    role: "D파트: 구급대원 웹앱 개발",
    tech: "React, TypeScript, Vite, AWS Amplify, Cognito",
    result: "구급차 현장 음성 자동 요약·중증도 분류·이송 병원 매칭 서비스의 구급대원용 웹앱 구현 - 로그인 → 녹음 → 일지 확인/수정 → 등급 확정 플로우, 백엔드 API·Cognito 연동, AWS Amplify 배포",
    link: "https://github.com/rlehd/healthcare-2-emergency"
  }
];

// Mock invite codes for the reviews demo (InviteTable stand-in). Each can be used once per browser session.
var SAMPLE_INVITE_CODES = ["DEMO-0001", "DEMO-0002", "DEMO-0003"];

var SAMPLE_REVIEWS = [
  { name: "샘플 의뢰인", message: "작업 소통이 빠르고 꼼꼼했습니다. (샘플 후기입니다)", createdAt: "2026-10-20T10:00:00" },
  { name: "샘플 협업자", message: "일정 관리가 체계적이어서 믿고 맡길 수 있었어요. (샘플 후기입니다)", createdAt: "2026-09-02T15:30:00" }
];
