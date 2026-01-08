import BookmarkThumbnail from "./bookmark-thumbnail";

interface Props {
  thumbnail?: string;
  description?: string;
  title: string;
}

export default function BookmarkCardContent({
  thumbnail,
  description,
  title,
}: Props) {
  return (
    <div className="flex gap-3 items-center">
      {thumbnail && <BookmarkThumbnail src={thumbnail} alt={title} />}
      {description && (
        <p className="text-sm text-muted flex-1 line-clamp-3">{description}</p>
      )}
    </div>
  );
}
