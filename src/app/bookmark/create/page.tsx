"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Header from "@/shared/components/layout/header";
import FormInput from "@/shared/components/core/form-input";
import FormTextarea from "@/shared/components/core/form-textarea";
import FolderSelector from "@/app/bookmark/_components/folder-selector";
import CreateFolderButton from "@/app/bookmark/_components/create-folder-button";
import Button from "@/shared/components/core/button";

// TODO: API에서 가져오기
const MOCK_FOLDERS = [
  { id: "1", name: "개발 자료" },
  { id: "2", name: "디자인 레퍼런스" },
  { id: "3", name: "읽을거리" },
];

interface BookmarkFormData {
  url: string;
  title: string;
  description: string;
  folderId?: string;
}

export default function BookmarkCreatePage() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<BookmarkFormData>({
    defaultValues: {
      url: "",
      title: "",
      description: "",
      folderId: undefined,
    },
  });

  const handleCancel = () => {
    router.push("/");
  };

  const onSubmit = async (data: BookmarkFormData) => {
    // TODO: API 호출하여 북마크 저장
    console.log(data);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-14 px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">링크 추가</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            name="url"
            control={control}
            label="URL"
            type="url"
            placeholder="https://example.com"
            rules={{ required: "URL을 입력해주세요" }}
          />

          <FormInput
            name="title"
            control={control}
            label="제목"
            placeholder="제목을 입력하세요"
            maxLength={100}
            rules={{ required: "제목을 입력해주세요" }}
          />

          <FormTextarea
            name="description"
            control={control}
            label="설명"
            placeholder="설명을 입력하세요"
            maxLength={500}
            rows={3}
          />

          <FolderSelector
            name="folderId"
            control={control}
            folders={MOCK_FOLDERS}
          />

          <CreateFolderButton />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="neutral" onClick={handleCancel}>
              취소
            </Button>
            <Button type="submit" variant="primary">
              저장
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
