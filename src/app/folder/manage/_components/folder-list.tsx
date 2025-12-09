'use client';

interface Folder {
  id: string;
  name: string;
  itemCount: number;
}

interface FolderListProps {
  folders: Folder[];
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export default function FolderList({ folders, onEdit, onDelete }: FolderListProps) {
  if (folders.length === 0) {
    return (
      <div className="text-center py-8 text-muted">
        <p>폴더가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="flex items-center justify-between px-4 py-3 border border-border-light rounded-lg bg-background"
        >
          <div className="flex items-center gap-2">
            <span>📁</span>
            <span className="text-foreground">
              {folder.name} ({folder.itemCount})
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(folder.id, folder.name)}
              className="px-3 py-1 text-sm text-primary"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(folder.id)}
              className="px-3 py-1 text-sm text-danger"
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
