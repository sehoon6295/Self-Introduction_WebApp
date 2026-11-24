// Placeholder data for this week's static deployment (S3 + CloudFront only).
// From a later week, these arrays will be replaced by AppSync GraphQL calls
// (listProjects / getProject / listReviews / createReview / createContact)
// backed by the DynamoDB tables in the plan document (ProjectsTable, ReviewTable, InviteTable, ContactTable).
// TODO: replace with real project history before final submission.

var SAMPLE_PROJECTS = [
  {
    id: "p3",
    title: "자기소개 웹앱 (본 프로젝트)",
    startDate: "2026-11-01",
    period: "2026.11 - 진행중",
    role: "기획 · 프론트엔드 · AWS 인프라",
    tech: "HTML, CSS, JavaScript, AWS S3, CloudFront, AppSync, DynamoDB",
    result: "정적 사이트를 S3 + CloudFront로 배포하고 서버리스 API로 문의/후기 기능을 구현",
    link: "#"
  },
  {
    id: "p2",
    title: "샘플 프로젝트 B",
    startDate: "2026.05",
    period: "2026.03 - 2026.05",
    role: "백엔드 개발",
    tech: "Node.js, Express, MySQL",
    result: "예시 설명 - 실제 프로젝트 내용으로 교체해 주세요.",
    link: "#"
  },
  {
    id: "p1",
    title: "샘플 프로젝트 A",
    startDate: "2025.12",
    period: "2025.10 - 2025.12",
    role: "풀스택 개발",
    tech: "React, Spring Boot",
    result: "예시 설명 - 실제 프로젝트 내용으로 교체해 주세요.",
    link: "#"
  }
];

// Mock invite codes for the reviews demo (InviteTable stand-in). Each can be used once per browser session.
var SAMPLE_INVITE_CODES = ["DEMO-0001", "DEMO-0002", "DEMO-0003"];

var SAMPLE_REVIEWS = [
  { name: "샘플 의뢰인", message: "작업 소통이 빠르고 꼼꼼했습니다. (샘플 후기입니다)", createdAt: "2026-10-20T10:00:00" },
  { name: "샘플 협업자", message: "일정 관리가 체계적이어서 믿고 맡길 수 있었어요. (샘플 후기입니다)", createdAt: "2026-09-02T15:30:00" }
];
