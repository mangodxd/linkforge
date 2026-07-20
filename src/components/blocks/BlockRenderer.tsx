import type { Block, Page } from "@/types";
import { BLOCK_TYPES } from "@/lib/constants";
import { HeaderBlock } from "./HeaderBlock";
import { ButtonBlock } from "./ButtonBlock";
import { TextBlock } from "./TextBlock";
import { ImageBlock } from "./ImageBlock";
import { DividerBlock } from "./DividerBlock";
import { SocialLinksBlock } from "./SocialLinksBlock";
import type {
  HeaderBlockContent,
  ButtonBlockContent,
  TextBlockContent,
  ImageBlockContent,
  DividerBlockContent,
  SocialLinksBlockContent,
} from "@/types";

interface Props {
  block: Block;
  /** Pass page social_links so the social links block can use page-level data */
  pageSocialLinks?: Page["social_links"];
}

export function BlockRenderer({ block, pageSocialLinks }: Props) {
  switch (block.type) {
    case BLOCK_TYPES.HEADER:
      return <HeaderBlock content={block.content as unknown as HeaderBlockContent} />;
    case BLOCK_TYPES.BUTTON:
      return <ButtonBlock content={block.content as unknown as ButtonBlockContent} />;
    case BLOCK_TYPES.TEXT:
      return <TextBlock content={block.content as unknown as TextBlockContent} />;
    case BLOCK_TYPES.IMAGE:
      return <ImageBlock content={block.content as unknown as ImageBlockContent} />;
    case BLOCK_TYPES.DIVIDER:
      return <DividerBlock content={block.content as unknown as DividerBlockContent} />;
    case BLOCK_TYPES.SOCIAL_LINKS:
      return (
        <SocialLinksBlock
          content={block.content as unknown as SocialLinksBlockContent}
          pageSocialLinks={
            Array.isArray(pageSocialLinks)
              ? (pageSocialLinks as Array<{ platform: string; url: string; label?: string }>)
              : undefined
          }
        />
      );
    default:
      return null;
  }
}
