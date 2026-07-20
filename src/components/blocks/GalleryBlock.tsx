import type { GalleryBlockContent } from "@/types";

interface Props {
  content: GalleryBlockContent;
}

export function GalleryBlock({ content }: Props) {
  const { images, layout } = content;

  if (!images || images.length === 0) return null;

  const gridCols =
    layout === "grid"
      ? images.length === 1
        ? "grid-cols-1"
        : images.length === 2
          ? "grid-cols-2"
          : "grid-cols-2 sm:grid-cols-3"
      : "grid-cols-1";

  return (
    <div className={`grid gap-2 ${gridCols}`}>
      {images.map((img, i) => (
        <div key={i} className="overflow-hidden rounded-[--radius]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            className="h-48 w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
