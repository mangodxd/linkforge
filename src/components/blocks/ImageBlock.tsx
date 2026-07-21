import type { ImageBlockContent } from "@/types";

interface Props {
  content: ImageBlockContent;
}

export function ImageBlock({ content }: Props) {
  return (
    <div className="flex justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={content.src}
        alt={content.alt}
        width={content.width}
        height={content.height}
        className="max-w-full object-cover"
        style={{ borderRadius: content.borderRadius ?? "8px" }}
      />
    </div>
  );
}
