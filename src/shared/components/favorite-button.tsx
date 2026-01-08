"use client";

import { Star } from "lucide-react";
import { usePostFavorite } from "@/shared/hooks/queries/bookmarks/usePostFavorite";

interface Props {
  bookmarkId: string;
  isFavorite: boolean;
}

export default function FavoriteButton({ bookmarkId, isFavorite }: Props) {
  const toggleFavorite = usePostFavorite();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite.mutate(bookmarkId, {
      onSuccess: () => {
        // 성공 시 React Query가 자동으로 목록 갱신
      },
      onError: (error) => {
        alert("즐겨찾기 토글에 실패했습니다.");
        console.error(error);
      },
    });
  };

  return (
    <button className="flex items-center" onClick={handleFavoriteToggle}>
      <Star
        size={20}
        className={
          isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted"
        }
      />
    </button>
  );
}
