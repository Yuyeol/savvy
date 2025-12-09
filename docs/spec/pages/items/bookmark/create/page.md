# Link Add Page

## 개요

새로운 링크를 추가하는 페이지

---

## 페이지 구조

```
┌────────────────────────────────────────────┐
│ [Header]                                   │
├────────────────────────────────────────────┤
│                                            │
│  링크 추가                                  │
│                                            │
│  [URL Input]                               │
│                                            │
│  [Title Input]                             │
│                                            │
│  [Description Input]                       │
│                                            │
│  [Folder Selector]                         │
│                                            │
│                                            │
│                         [취소] [저장]       │
│                                            │
└────────────────────────────────────────────┘
```

---

## 컴포넌트 구성

**[URL Input](./components/url-input.md)**
- URL 입력 필드 (필수)
- 메타데이터 자동 추출

**[Title Input](./components/title-input.md)**
- 제목 입력 필드 (선택)

**[Description Input](./components/description-input.md)**
- 설명 입력 필드 (선택)

**[Folder Selector](./components/folder-selector.md)**
- 폴더 선택 드롭다운
- 폴더 생성 페이지 랜딩 버튼

---

## 사용자 플로우

1. URL 입력 → 메타데이터 자동 추출 (제목, 설명, 썸네일)
2. 제목/설명 수정 (선택)
3. 폴더 선택 or 새 폴더 생성
4. 저장 → 홈으로 이동
5. 취소 → 홈으로 이동
