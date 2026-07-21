"use client";

import type { ButtonBlockContent } from "@/types";

interface Props {
  content: ButtonBlockContent;
  pageId?: string;
  blockId?: string;
}

export function ButtonBlock({ content, pageId, blockId }: Props) {
  const variantStyles: Record<string, string> = {
    primary: "bg-[--accent] text-[--accent-text] hover:opacity-90",
    secondary: "bg-[--bg-secondary] text-[--text-primary] hover:bg-[--border]",
    outline: "border-2 border-[--accent] text-[--accent] hover:bg-[--accent] hover:text-[--accent-text]",
    ghost: "text-[--text-primary] hover:bg-[--bg-secondary]",
  };

  function handleClick() {
    if (!pageId || !blockId) return;
    fetch("/api/track/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page_id: pageId,
        block_id: blockId,
        referrer: document.referrer || null,
      }),
    }).catch(() => {});
  }

  return (
    <a
      href={content.url}
      target={content.openInNewTab ? "_blank" : undefined}
      rel={content.openInNewTab ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className={`block w-full rounded-[--radius] px-4 py-3 text-center font-medium transition-all ${variantStyles[content.variant ?? "primary"]}`}
    >
      {content.text}
    </a>
  );
}
