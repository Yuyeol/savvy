# UI Structure

## 폴더 구조 개요

```
src/
├── app/                          # Next.js App Router
│   ├── _components/              # 홈 페이지 전용 컴포넌트
│   ├── bookmark/
│   │   ├── _components/          # 북마크 공용 컴포넌트 (생성/수정)
│   │   ├── create/               # 북마크 생성 페이지
│   │   └── [id]/edit/            # 북마크 수정 페이지
│   ├── folder/
│   │   └── manage/               # 폴더 관리 페이지
│   ├── page.tsx                  # 홈 페이지
│   └── layout.tsx                # 루트 레이아웃
│
└── shared/                       # 공유 컴포넌트 (앱 외부)
    └── components/
        ├── core/                 # 코어 컴포넌트
        ├── layout/               # 레이아웃 컴포넌트
        └── provider/             # Provider 컴포넌트
```

---

## 구조 원칙

1. **페이지 전용 컴포넌트**: `app/[page]/_components/`
2. **도메인 공용 컴포넌트**: `app/[domain]/_components/` (예: bookmark, folder)
3. **전역 공유 컴포넌트**: `shared/components/`
4. **이동 규칙**:
   - 같은 도메인 여러 페이지에서 사용 → 도메인 공용으로 이동
   - 여러 도메인에서 사용 → 전역 공유로 이동
   - 단독 사용 → 페이지 전용으로 이동
