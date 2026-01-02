"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import FormInput from "@/shared/components/core/form-input";
import FormTextarea from "@/shared/components/core/form-textarea";
import FolderSelector from "@/app/bookmark/_components/folder-selector";
import CreateFolderButton from "@/app/bookmark/_components/create-folder-button";
import Button from "@/shared/components/core/button";
import { useGetBookmark } from "@/shared/hooks/queries/bookmarks/useGetBookmark";
import { usePatchBookmark } from "@/shared/hooks/queries/bookmarks/usePatchBookmark";

interface BookmarkFormData {
  url: string;
  title: string;
  description: string;
  folderId?: string;
}

export default function BookmarkEditPage() {
  const router = useRouter();
  const params = useParams();
  const bookmarkId = params.id as string;

  const { data: bookmark, isLoading } = useGetBookmark({ id: bookmarkId });
  const patchBookmark = usePatchBookmark();

  const { control, handleSubmit, reset } = useForm<BookmarkFormData>({
    defaultValues: {
      url: "",
      title: "",
      description: "",
      folderId: undefined,
    },
  });

  useEffect(() => {
    if (bookmark) {
      reset({
        url: bookmark.url,
        title: bookmark.title,
        description: bookmark.description || "",
        folderId: bookmark.folder_id || undefined,
      });
    }
  }, [bookmark, reset]);

  const handleCancel = () => {
    router.push("/");
  };

  const onSubmit = async (data: BookmarkFormData) => {
    patchBookmark.mutate(
      {
        id: bookmarkId,
        request: {
          url: data.url,
          title: data.title,
          description: data.description,
          folder_id: data.folderId || null,
        },
      },
      {
        onSuccess: () => {
          router.push(`/bookmark/${bookmarkId}`);
        },
        onError: (error) => {
          console.error("Failed to update bookmark:", error);
          alert("북마크 수정에 실패했습니다.");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">로딩 중...</p>
      </div>
    );
  }

  if (!bookmark) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">북마크를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">링크 수정</h1>

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

          <FolderSelector name="folderId" control={control} />

          <CreateFolderButton />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="neutral" onClick={handleCancel}>
              취소
            </Button>
            <Button type="submit" variant="primary" disabled={patchBookmark.isPending}>
              {patchBookmark.isPending ? "수정 중..." : "수정"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
