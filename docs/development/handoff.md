# 개발 인수인계

> 다른 환경에서 작업을 이어받을 AI를 위한 문서

## 작업 완료 현황

### 페이지
- ✅ 홈 (`/`)
- ✅ 북마크 생성 (`/bookmark/create`)
- ✅ 북마크 수정 (`/bookmark/[id]/edit`)
- ✅ 폴더 관리 (`/folder/manage`)

### 핵심 패턴

**Form 컴포넌트 2단계 구조**
```typescript
// 1. 코어: Input (React Hook Form 독립적)
// 2. 래퍼: FormInput (Controller 내장)
// → 보일러플레이트 제거, 재사용성 확보
```

**생성/수정 페이지 차이**
- 생성: `useForm` defaultValues 빈 값
- 수정: `useEffect`로 API 데이터 로드 후 `reset()`

**도메인 공용 컴포넌트**
- `bookmark/_components/`: FolderSelector, CreateFolderButton
- 생성/수정 페이지 공용 사용

## 미완성 작업

1. **API 연동**: 모든 페이지 MOCK 데이터 사용 중
2. **검색/정렬**: SearchBar, SortSelector UI만 있음
3. **인터랙션**: 링크/폴더 클릭 동작 미정의

## 참고

- 컨벤션: `docs/conventions/`
- 구조: `docs/structure/ui-structure.md`
- 명세: `docs/spec/pages/`
