"use client";

import { useState } from "react";
import FolderInput from "@/app/folder/manage/_components/folder-input";
import FolderList from "@/app/folder/manage/_components/folder-list";

// TODO: API에서 가져오기
const MOCK_FOLDERS = [
  { id: "1", name: "개발 자료", itemCount: 12 },
  { id: "2", name: "디자인 레퍼런스", itemCount: 5 },
  { id: "3", name: "읽을거리", itemCount: 8 },
];

export default function FolderManagePage() {
  const [folders, setFolders] = useState(MOCK_FOLDERS);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const mode = editingId ? "edit" : "create";

  const handleSubmit = () => {
    if (mode === "create") {
      // TODO: API 호출하여 폴더 생성
      const newFolder = {
        id: Date.now().toString(),
        name: inputValue,
        itemCount: 0,
      };
      setFolders([...folders, newFolder]);
      setInputValue("");
    } else {
      // TODO: API 호출하여 폴더 수정
      setFolders(
        folders.map((folder) =>
          folder.id === editingId ? { ...folder, name: inputValue } : folder
        )
      );
      setInputValue("");
      setEditingId(null);
    }
  };

  const handleEdit = (id: string, name: string) => {
    setEditingId(id);
    setInputValue(name);
  };

  const handleDelete = (id: string) => {
    // TODO: API 호출하여 폴더 삭제
    setFolders(folders.filter((folder) => folder.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">분류 관리</h1>
        <div className="space-y-6">
          <FolderInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            mode={mode}
          />
          <FolderList
            folders={folders}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
