import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "@/shared/api/bookmarks";
import { bookmarkKeys } from "@/shared/utils/queryKeyFactory";

export function useGetBookmarks(params?: {
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  folder_id?: string;
  is_favorite?: boolean;
}) {
  return useQuery({
    queryKey: bookmarkKeys.list(params),
    queryFn: () => getBookmarks(params),
  });
}
