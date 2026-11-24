# Self-Introduction WebApp

강원대학교 클라우드 데이터베이스 과목 과제 - 외주 문의로 이어지는 자기소개 웹앱.
기획서: `9095920263_이세훈_웹앱_개발_기획서.docx` 참고.

## 구조

정적 5페이지 멀티페이지 사이트입니다.

| 파일 | 화면 ID | 내용 |
|---|---|---|
| `index.html` | S01 Home | 프로필, 한 줄 소개, 바로가기 버튼 |
| `about.html` | S02 소개 | 자기소개, 보유 기술, 외주 절차 |
| `projects.html` | S03 프로젝트 | 프로젝트 카드 목록 + 상세 모달 |
| `contact.html` | S04 연락처 | 외주 문의 폼 |
| `reviews.html` | S05 후기 | 초대 코드 기반 후기 작성 + 목록 |

`css/style.css` 공통 스타일, `js/` 페이지별 동작(JS). `js/data.js`의 데이터는
아직 AWS 백엔드가 없는 현재 단계의 더미 데이터이며, 추후 AppSync GraphQL API로 교체됩니다.

## 이번 주 과제: AWS 환경 구성

1. S3 버킷 생성 (퍼블릭 액세스 차단 유지) → 이 폴더의 정적 파일 업로드
2. CloudFront 배포 생성, Origin Access Control(OAC)로 S3 원본 연결
3. S3 버킷 정책에 CloudFront 서비스 프린시펄만 허용하도록 설정
4. CloudFront 도메인으로 접속 성공 / S3 버킷 URL 직접 접속 시 거부(Access Denied) 확인

### 배포 정보

- S3 버킷: `sehoon-self-intro-webapp-kr-124355660486` (서울, `ap-northeast-2` / 퍼블릭 액세스 차단 전체 활성화)
- CloudFront 배포 ID: `E14KGKRIGSE1L3`
- CloudFront 도메인(접속 URL): https://d2z7qcabbgi9on.cloudfront.net
- Origin Access Control: `sehoon-self-intro-webapp-oac` (`E3KPB3CVJQOM8X`)
- S3 버킷 정책: `cloudfront.amazonaws.com` 서비스 프린시펄 + `AWS:SourceArn`이 위 CloudFront 배포 ARN과 일치할 때만 `s3:GetObject` 허용

## TODO (제출 전 실제 내용으로 교체)

- `about.html`: 자기소개 문단, 보유 기술 태그
- `projects.html` 데이터(`js/data.js`의 `SAMPLE_PROJECTS`): 실제 프로젝트 경험
- `contact.html`: 실제 연락용 이메일 주소
- 추후 주차: AppSync + DynamoDB 연동 (listProjects, createContact, createReview, listReviews)
