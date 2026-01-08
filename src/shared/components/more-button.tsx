"use client";

import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import Dropdown, { DropdownOption } from "@/shared/components/core/dropdown";
import { useDeleteBookmark } from "@/shared/hooks/queries/bookmarks/useDeleteBookmark";
import { useDeleteFolder } from "@/shared/hooks/queries/folders/useDeleteFolder";
import { buildUrlWithParams } from "@/shared/utils/buildUrlWithParams";

interface Props {
  entityType: "bookmark" | "folder";
  entityId: string;
  onDeleteSuccess?: () => void;
}

export default function MoreButton({
  entityType,
  entityId,
  onDeleteSuccess,
}: Props) {
  const router = useRouter();
  const deleteBookmark = useDeleteBookmark();
  const deleteFolder = useDeleteFolder();

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const deleteMutation = entityType === "bookmark" ? deleteBookmark : deleteFolder;

      deleteMutation.mutate(entityId, {
        onSuccess: () => {
          onDeleteSuccess?.();
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  };

  const handleEdit = () => {
    if (entityType === "bookmark") {
      router.push(`/bookmark/${entityId}/edit`);
    } else {
      router.push(buildUrlWithParams("/folder/manage", { edit: entityId }));
    }
  };

  const dropdownOptions: DropdownOption[] = [
    {
      label: "수정",
      value: "edit",
      onClick: handleEdit,
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
