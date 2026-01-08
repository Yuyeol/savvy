"use client";

import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import Dropdown, { DropdownOption } from "@/shared/components/core/dropdown";
import { useDeleteBookmark } from "@/shared/hooks/queries/bookmarks/useDeleteBookmark";

interface Props {
  bookmarkId: string;
  onDeleteSuccess?: () => void;
}

export default function MoreButton({ bookmarkId, onDeleteSuccess }: Props) {
  const router = useRouter();
  const deleteBookmark = useDeleteBookmark();

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteBookmark.mutate(bookmarkId, {
        onSuccess: () => {
          onDeleteSuccess?.();
        },
        onError: (error) => {
          alert("삭제에 실패했습니다.");
          console.error(error);
        },
      });
    }
  };

  const dropdownOptions: DropdownOption[] = [
    {
      label: "수정",
      value: "edit",
      onClick: () => router.push(`/bookmark/${bookmarkId}/edit`),
    },
    {
      label: "삭제",
      value: "delete",
      variant: "danger",
      onClick: handleDelete,
    },
  ];

  return (
    <Dropdown
      trigger={
        <button className="flex items-center text-muted">
          <MoreVertical size={20} />
        </button>
      }
      options={dropdownOptions}
    />
  );
}
