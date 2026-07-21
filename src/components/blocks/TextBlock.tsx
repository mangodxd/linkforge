import type { TextBlockContent } from "@/types";

interface Props {
  content: TextBlockContent;
}

export function TextBlock({ content }: Props) {
  return (
    <p
      className="text-[--text-secondary]"
      style={{ textAlign: content.align ?? "center" }}
    >
      {content.text}
    </p>
  );
}
