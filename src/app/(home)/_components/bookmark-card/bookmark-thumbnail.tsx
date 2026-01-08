import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export default function BookmarkThumbnail({ src, alt }: Props) {
  return (
    <div className="w-14 h-14 rounded-md overflow-hidden bg-muted-light flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        width={48}
        height={48}
      />
    </div>
  );
}
