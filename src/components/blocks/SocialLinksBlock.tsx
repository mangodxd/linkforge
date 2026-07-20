import type { SocialLinksBlockContent } from "@/types";

interface Props {
  content: SocialLinksBlockContent;
  /** When provided, page-level social links override block-level links */
  pageSocialLinks?: Array<{ platform: string; url: string; label?: string }>;
}

const platformIcons: Record<string, string> = {
  github: "🐙",
  twitter: "𝕏",
  linkedin: "in",
  youtube: "▶",
  instagram: "📷",
  tiktok: "♪",
  discord: "💬",
  website: "🌐",
  email: "✉",
};

export function SocialLinksBlock({ content, pageSocialLinks }: Props) {
  const links = pageSocialLinks ?? content.links;
  const isRow = content.layout !== "column";

  if (links.length === 0) return null;

  return (
    <div className={`flex gap-3 ${isRow ? "justify-center" : "flex-col"}`}>
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-[--radius] bg-[--bg-secondary] px-3 py-2 text-sm text-[--text-primary] transition-colors hover:bg-[--border]"
        >
          <span className="shrink-0">{platformIcons[link.platform] ?? "🔗"}</span>
          {link.label && <span>{link.label}</span>}
        </a>
      ))}
    </div>
  );
}
