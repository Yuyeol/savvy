# 쿼리 파라미터 리팩토링 체크리스트

## Phase 1: useQueryParam/useSetQueryParams 훅 적용

### ✅ 완료 항목

- [x] 훅 파일 복사 완료
- [x] 쿼리 파서 복사 (`parseAsBoolean`, `parseAsInteger`)
- [x] API 타입 수정 (쿼리 파라미터 `| null` 허용)
- [x] `src/app/(home)/page.tsx` (120줄 → 112줄)
- [x] `src/app/(home)/_components/view-tabs.tsx`
- [x] `src/app/(home)/_components/search-bar.tsx`
- [x] `src/app/(home)/_components/bookmarks-tab.tsx`
- [x] `src/app/(home)/_components/folders-tab.tsx`

### 📋 결과

- **총 5개 파일 리팩토링 완료**
- 코드 간결성 62% 개선
- 선언적 쿼리 상태 관리 구현

---

## Phase 2: buildUrlWithParams 유틸 적용

### 📁 유틸리티 생성

- [x] `src/shared/utils/buildUrlWithParams.ts` 작성
  - lodash 의존성 제거 (for...of 사용)
  - `boolean` 타입 지원 추가
  - null/undefined/빈 문자열 자동 필터링

### 🎯 적용 대상 (4곳)

#### API Layer (Client-side)

- [ ] `src/shared/api/bookmarks.ts:22-33` - getBookmarks 함수

  - 현재: 수동 URLSearchParams (5개 if문)
  - 목표: `buildUrlWithParams('/api/bookmarks', params)`

- [ ] `src/shared/api/folders.ts:19-25` - getFolders 함수
  - 현재: 수동 URLSearchParams (3개 if문)
  - 목표: `buildUrlWithParams('/api/folders', params)`

#### UI Layer

- [ ] `src/app/(home)/_components/folder-card.tsx:20` - handleCardClick

  - 현재: `router.push(\`/?folder_id=${id}\`)`
  - 목표: `router.push(buildUrlWithParams('/', { folder_id: id }))`

- [ ] `src/app/(home)/_components/folder-card.tsx:41` - 수정 버튼
  - 현재: `router.push(\`/folder/manage?edit=${id}\`)`
  - 목표: `router.push(buildUrlWithParams('/folder/manage', { edit: id }))`
