"use client";

import { useRouter } from "next/navigation";
import { BookMarked, Plus } from "lucide-react";

export default function BottomNav() {
  const router = useRouter();

  return (
    <>
      <nav className="max-w-2xl fixed bottom-0 w-full left-1/2 -translate-x-1/2 bg-background border-t border-border-light z-50">
        <div className="flex items-center justify-around h-16 px-4">
          {/* 저장목록 */}
          <button
            onClick={() => {
              router.push("/");
            }}
            className="flex flex-col items-center gap-1"
          >
            <BookMarked size={20} className="text-muted" />
            <span className="text-xs text-muted">저장목록</span>
          </button>

          {/* 추가 버튼 */}
          <button
            onClick={() => {
              router.push("/bookmark/create");
            }}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white"
          >
            <Plus size={24} />
          </button>
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
}
