import type { HeaderBlockContent } from "@/types";

interface Props {
  content: HeaderBlockContent;
}

export function HeaderBlock({ content }: Props) {
  const Tag = content.level === 1 ? "h1" : content.level === 3 ? "h3" : "h2";

  return (
    <Tag
      className="text-center text-[--text-primary]"
      style={{ textAlign: content.align ?? "center" }}
    >
      {content.text}
    </Tag>
  );
}
