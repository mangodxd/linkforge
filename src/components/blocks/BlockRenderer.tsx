import type { Block, Page } from "@/types";
import { BLOCK_TYPES } from "@/lib/constants";
import { HeaderBlock } from "./HeaderBlock";
import { ButtonBlock } from "./ButtonBlock";
import { TextBlock } from "./TextBlock";
import { ImageBlock } from "./ImageBlock";
import { DividerBlock } from "./DividerBlock";
import { SocialLinksBlock } from "./SocialLinksBlock";
import { GalleryBlock } from "./GalleryBlock";
import { VideoBlock } from "./VideoBlock";
import type {
  HeaderBlockContent,
  ButtonBlockContent,
  TextBlockContent,
  ImageBlockContent,
  DividerBlockContent,
  SocialLinksBlockContent,
  GalleryBlockContent,
  VideoBlockContent,
} from "@/types";

interface Props {
  block: Block;
  pageSocialLinks?: Page["social_links"];
  pageId?: string;
}

export function BlockRenderer({ block, pageSocialLinks, pageId }: Props) {
  switch (block.type) {
    case BLOCK_TYPES.HEADER:
      return <HeaderBlock content={block.content as unknown as HeaderBlockContent} />;
    case BLOCK_TYPES.BUTTON:
      return (
        <ButtonBlock
          content={block.content as unknown as ButtonBlockContent}
          pageId={pageId}
          blockId={block.id}
        />
      );
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
    case BLOCK_TYPES.GALLERY:
      return <GalleryBlock content={block.content as unknown as GalleryBlockContent} />;
    case BLOCK_TYPES.VIDEO:
      return <VideoBlock content={block.content as unknown as VideoBlockContent} />;
    default:
      return null;
  }
}
