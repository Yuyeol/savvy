# bookmarks

북마크(링크) 저장 테이블

## 필드
- `id`: UUID (PK, 자동 생성)
- `title`: 북마크 제목 (필수)
- `url`: 링크 URL (필수)
- `description`: 설명/메모 (선택)
- `folder_id`: 폴더 ID (선택, FK → folders.id)
- `is_favorite`: 즐겨찾기 여부 (기본값: false)
- `user_id`: 사용자 ID (필수)
- `created_at`: 생성 시간 (자동)
- `updated_at`: 수정 시간 (자동)

## 설정
- `folder_id`: 폴더 삭제 시 NULL로 변경 (ON DELETE SET NULL)
- `updated_at`: 수정 시 자동 업데이트 (트리거)
- RLS: 사용자는 본인 데이터만 CRUD 가능
- 인덱스: user_id, folder_id, created_at (성능 최적화)

```sql
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  is_favorite BOOLEAN DEFAULT false,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_folder_id ON bookmarks(folder_id);
CREATE INDEX idx_bookmarks_created_at ON bookmarks(created_at DESC);

CREATE TRIGGER update_bookmarks_updated_at
  BEFORE UPDATE ON bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookmarks"
  ON bookmarks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);
```
