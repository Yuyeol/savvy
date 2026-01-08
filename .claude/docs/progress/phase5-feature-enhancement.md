# Phase 5: 기능 고도화

## 상태: 완료 ✅

---

## 5.1 OG 메타데이터 자동 추출

### 상태: 완료 ✅ (동적 사이트는 Microlink API 사용)

### 개요

북마크 URL 입력 시 Open Graph 메타데이터를 자동으로 추출하여 title, description, thumbnail 자동 채우기

### 구현 항목

- [x] open-graph-scraper 라이브러리 설치
- [x] DB 스키마: bookmarks 테이블에 `thumbnail`, `memo` 필드 추가
- [x] API: POST /api/og-metadata (URL → OG 메타데이터 추출)
  - [x] open-graph-scraper 기본 구현 (SSR 사이트)
  - [x] Microlink API 연동 (동적 사이트: threads, instagram)
- [x] 커스텀 컴포넌트: UrlInputWithFetch (URL 확인 버튼 → 자동 채우기)
- [x] UI: 북마크 생성/수정 페이지에 자동 채우기 적용
- [x] 썸네일 표시: BookmarkCard에서 이미지 렌더링

### 특징

- URL blur 시 자동 채우기 (사용자 수정 가능)
- 외부 URL만 저장 (Supabase Storage 미사용)
- 에러 시 조용히 실패 (사용자가 수동 입력 가능)
- 폴백: OG → Twitter Card → Dublin Core

### 구현 방식

**하이브리드 접근:**
- **SSR 사이트**: open-graph-scraper 사용 (GitHub, 뉴스, 블로그, YouTube 등)
- **동적 사이트**: Microlink API 사용 (Threads, Instagram - 화이트리스트 방식)
- **에러 처리**: 실패 시 조용히 실패하여 사용자가 수동 입력 가능
- **폴백 체계**: OG → Twitter Card → Dublin Core

**장점:**
- 대부분의 사이트에서 메타데이터 추출 가능
- 외부 API 의존도 최소화 (특정 사이트만)
- Vercel 배포 제약 없음 (Puppeteer 불필요)

---

## 5.2 향후 개선 사항

### 이미지 캐싱

- Supabase Storage에 이미지 복사
- 외부 URL 깨짐 방지

### 배치 갱신

- 여러 북마크의 메타데이터 일괄 갱신
- 오래된 메타데이터 주기적 업데이트

### 실시간 미리보기

- URL 입력 시 실시간 미리보기 표시
