"use client";

import Input from "@/shared/components/core/input";
import Button from "@/shared/components/core/button";

interface FolderInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  mode: "create" | "edit";
}

export default function FolderInput({
  value,
  onChange,
  onSubmit,
  mode,
}: FolderInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          name="folderName"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="폴더명 입력..."
          maxLength={50}
        />
      </div>
      <Button type="submit" variant="primary" disabled={!value.trim()}>
        {mode === "create" ? "추가" : "수정 완료"}
      </Button>
    </form>
  );
}
