import type { VideoBlockContent } from "@/types";

interface Props {
  content: VideoBlockContent;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // raw video ID
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

function getVimeoEmbedUrl(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  if (match) return `https://player.vimeo.com/video/${match[1]}`;
  return null;
}

export function VideoBlock({ content }: Props) {
  const { url, platform, autoplay } = content;
  if (!url) return null;

  let embedUrl: string | null = null;

  if (platform === "youtube") {
    embedUrl = getYouTubeEmbedUrl(url);
  } else if (platform === "vimeo") {
    embedUrl = getVimeoEmbedUrl(url);
  } else {
    // Try to auto-detect
    embedUrl = getYouTubeEmbedUrl(url) ?? getVimeoEmbedUrl(url);
  }

  if (embedUrl) {
    const src = autoplay ? `${embedUrl}?autoplay=1` : embedUrl;
    return (
      <div className="overflow-hidden rounded-[--radius]">
        <div className="aspect-video">
          <iframe
            src={src}
            className="h-full w-full"
            allow={autoplay ? "autoplay; encrypted-media" : "encrypted-media"}
            allowFullScreen
            title="Video content"
          />
        </div>
      </div>
    );
  }

  // Fallback to direct video URL
  return (
    <div className="overflow-hidden rounded-[--radius]">
      <video
        src={url}
        controls
        className="w-full"
        playsInline
        autoPlay={autoplay}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
