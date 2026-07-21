import type { DividerBlockContent } from "@/types";

interface Props {
  content: DividerBlockContent;
}

export function DividerBlock({ content }: Props) {
  return (
    <hr
      className="w-full"
      style={{
        border: "none",
        borderTopStyle: content.style ?? "solid",
        borderTopWidth: (content.thickness ?? 1) + "px",
        borderTopColor: content.color ?? "var(--border)",
      }}
    />
  );
}
