interface Props {
  createdAt: string;
}

export default function BookmarkCardFooter({ createdAt }: Props) {
  return (
    <div className="text-xs text-end text-muted">
      <span>{createdAt}</span>
    </div>
  );
}
