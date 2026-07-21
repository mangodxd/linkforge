"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Heading,
  MousePointerClick,
  FileText,
  Image,
  Images,
  Video,
  Minus,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { BLOCK_TYPES, BLOCK_TYPE_LABELS, type BlockType } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const BLOCK_TYPE_ICON_MAP: Record<BlockType, LucideIcon> = {
  header: Heading,
  button: MousePointerClick,
  text: FileText,
  image: Image,
  gallery: Images,
  video: Video,
  divider: Minus,
  social_links: Share2,
};

const BLOCK_TYPE_DESCRIPTIONS: Record<BlockType, string> = {
  header: "Section headings with multiple sizes",
  button: "Call-to-action links with tracking",
  text: "Paragraph text with alignment",
  image: "Single image with custom sizing",
  gallery: "Image grid or carousel layout",
  video: "YouTube, Vimeo or custom video",
  divider: "Horizontal rule with styles",
  social_links: "Social media profile links",
};

interface Props {
  onSelect: (type: string) => Promise<void>;
  onClose: () => void;
}

export default function AddBlockDialog({ onSelect, onClose }: Props) {
  const types = Object.values(BLOCK_TYPES);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="mx-4 w-full max-w-lg rounded-xl border bg-card p-5 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="mb-1 text-base font-semibold font-heading">Add Block</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Choose a block type to add to your page.
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {types.map((type, i) => {
              const key = type as BlockType;
              const IconComponent = BLOCK_TYPE_ICON_MAP[key];
              return (
                <motion.button
                  key={type}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  onClick={() => onSelect(type)}
                  className="flex items-start gap-3 rounded-lg border p-3 text-left transition-all duration-150 hover:border-primary hover:bg-primary/5 hover:shadow-sm active:scale-[0.98]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-sm font-medium">
                      {BLOCK_TYPE_LABELS[key]}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground leading-snug">
                      {BLOCK_TYPE_DESCRIPTIONS[key]}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <Button variant="ghost" className="mt-4 w-full" onClick={onClose}>
            Cancel
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
