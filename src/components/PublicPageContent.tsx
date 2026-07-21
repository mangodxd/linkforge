"use client";

import { motion } from "framer-motion";
import type { Block, Page } from "@/types";
import { themes } from "@/lib/theme";
import { BlockRenderer } from "@/components/blocks";

interface Props {
  page: Page;
  blocks: Block[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
} as const;

export default function PublicPageContent({ page, blocks }: Props) {
  const theme = themes[page.theme] ?? themes.minimal;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.vars["--bg-primary"],
        color: theme.vars["--text-primary"],
        fontFamily: theme.vars["--font-body"],
        "--bg-primary": theme.vars["--bg-primary"],
        "--bg-secondary": theme.vars["--bg-secondary"],
        "--bg-card": theme.vars["--bg-card"],
        "--text-primary": theme.vars["--text-primary"],
        "--text-secondary": theme.vars["--text-secondary"],
        "--text-muted": theme.vars["--text-muted"],
        "--accent": theme.vars["--accent"],
        "--accent-hover": theme.vars["--accent-hover"],
        "--accent-text": theme.vars["--accent-text"],
        "--border": theme.vars["--border"],
        "--font-heading": theme.vars["--font-heading"],
        "--font-body": theme.vars["--font-body"],
        "--radius": theme.vars["--radius"],
      } as React.CSSProperties}
    >
      <div className="mx-auto max-w-lg px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-center"
        >
          <h1 className="text-2xl font-bold font-heading" style={{ color: theme.vars["--text-primary"] }}>
            {page.title}
          </h1>
          {page.description && (
            <p className="mt-1 text-sm" style={{ color: theme.vars["--text-secondary"] }}>
              {page.description}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {blocks.map((block) => (
            <motion.div key={block.id} variants={itemVariants}>
              <BlockRenderer block={block} pageSocialLinks={page.social_links} pageId={page.id} />
            </motion.div>
          ))}
        </motion.div>

        <footer className="mt-12 text-center text-xs" style={{ color: theme.vars["--text-muted"] }}>
          Powered by <span className="font-semibold">LinkForge</span>
        </footer>
      </div>
    </div>
  );
}
