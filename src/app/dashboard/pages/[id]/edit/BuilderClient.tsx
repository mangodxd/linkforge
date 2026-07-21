"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Page, Block, Json } from "@/types";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { BlockRenderer } from "@/components/blocks";
import { updatePage, togglePublish } from "@/services/page.service";
import { createBlock, removeBlock, reorderBlocks, updateBlock } from "@/services/block.service";
import { BLOCK_TYPE_LABELS } from "@/lib/constants";
import { themes } from "@/lib/theme";
import { cn } from "@/lib/utils";
import BlockEditor from "./BlockEditor";
import AddBlockDialog from "./AddBlockDialog";
import PageSettings from "./PageSettings";

interface Props {
  page: Page;
  blocks: Block[];
}

export default function BuilderClient({ page: initialPage, blocks: initialBlocks }: Props) {
  const router = useRouter();
  const { addToast } = useToast();
  const [page, setPage] = useState<Page>(initialPage);
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [showPageSettings, setShowPageSettings] = useState(false);
  const [saving, setSaving] = useState(false);

  const theme = themes[page.theme] ?? themes.minimal;

  async function handleDeleteBlock(blockId: string) {
    try {
      await removeBlock(blockId);
      setBlocks((prev) => prev.filter((b) => b.id !== blockId));
      setEditingBlockId(null);
      addToast({ title: "Block deleted", variant: "success" });
    } catch (err) {
      addToast({
        title: "Delete failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    }
  }

  async function handleMoveBlock(blockId: string, direction: "up" | "down") {
    const idx = blocks.findIndex((b) => b.id === blockId);
    if (idx === -1) return;
    const newIdx = direction === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= blocks.length) return;

    const newBlocks = [...blocks];
    [newBlocks[idx], newBlocks[newIdx]] = [newBlocks[newIdx], newBlocks[idx]];

    try {
      await reorderBlocks(page.id, newBlocks.map((b) => b.id));
      setBlocks(newBlocks);
    } catch (err) {
      addToast({
        title: "Reorder failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    }
  }

  const handleAddBlock = useCallback(
    async (type: string) => {
      try {
        const newBlock = await createBlock({
          page_id: page.id,
          type,
          content: {} as Json,
          position: blocks.length,
        });
        setBlocks((prev) => [...prev, newBlock]);
        setShowAddBlock(false);
        setEditingBlockId(newBlock.id);
        addToast({
          title: `${BLOCK_TYPE_LABELS[type as keyof typeof BLOCK_TYPE_LABELS] ?? type} block added`,
          variant: "success",
        });
      } catch (err) {
        addToast({
          title: "Add failed",
          description: err instanceof Error ? err.message : "Please try again",
          variant: "destructive",
        });
      }
    },
    [page.id, blocks.length, addToast]
  );

  async function handleSaveBlock(blockId: string, content: Record<string, unknown>) {
    const jsonContent = content as Json;
    try {
      await updateBlock(blockId, { content: jsonContent });
      setBlocks((prev) =>
        prev.map((b) => (b.id === blockId ? { ...b, content: jsonContent } : b))
      );
      setEditingBlockId(null);
      addToast({ title: "Block updated", variant: "success" });
    } catch (err) {
      addToast({
        title: "Update failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    }
  }

  async function handleSavePageSettings(updates: Partial<Page>) {
    setSaving(true);
    try {
      const updated = await updatePage(page.id, updates);
      setPage(updated);
      setShowPageSettings(false);
      addToast({ title: "Page settings saved", variant: "success" });
      router.refresh();
    } catch (err) {
      addToast({
        title: "Save failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2 px-4 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="truncate text-base font-semibold font-heading">{page.title}</h2>
              {page.published ? (
                <Badge variant="success">Published</Badge>
              ) : (
                <Badge variant="outline">Draft</Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Button
                variant={page.published ? "outline" : "default"}
                size="sm"
                onClick={async () => {
                  try {
                    await togglePublish(page);
                    setPage((prev) => ({ ...prev, published: !prev.published }));
                    addToast({
                      title: page.published ? "Page unpublished" : "Page published",
                      variant: "success",
                    });
                    router.refresh();
                  } catch (err) {
                    addToast({
                      title: "Failed to toggle publish",
                      description: err instanceof Error ? err.message : "Please try again",
                      variant: "destructive",
                    });
                  }
                }}
              >
                {page.published ? "Unpublish" : "Publish"}
              </Button>
              {page.published && (
                <a
                  href={`/${page.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center rounded-md px-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Icons.ExternalLink className="h-4 w-4" />
                </a>
              )}
              <a
                href={`/dashboard/pages/${page.id}/domains`}
                className="inline-flex h-9 items-center justify-center rounded-md px-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Icons.Globe className="h-4 w-4" />
              </a>
              <a
                href={`/dashboard/pages/${page.id}/analytics`}
                className="inline-flex h-9 items-center justify-center rounded-md px-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Icons.BarChart3 className="h-4 w-4" />
              </a>
              <Button variant="ghost" size="sm" onClick={() => setShowPageSettings(!showPageSettings)}>
                <Icons.Settings className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={() => setShowAddBlock(true)}>
                <Icons.Plus className="mr-1 h-4 w-4" />
                Add Block
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {showPageSettings && (
            <PageSettings
              page={page}
              onSave={handleSavePageSettings}
              onCancel={() => setShowPageSettings(false)}
              saving={saving}
            />
          )}

          <AnimatePresence mode="popLayout">
            {blocks.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border border-dashed bg-muted/30 p-12 text-center"
              >
                <Icons.FileText className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No blocks yet. Add one to get started.</p>
                <Button variant="outline" className="mt-4" onClick={() => setShowAddBlock(true)}>
                  <Icons.Plus className="mr-2 h-4 w-4" />
                  Add your first block
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {blocks.map((block, i) => (
                  <motion.div
                    key={block.id}
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "rounded-lg border bg-card p-3 transition-all duration-150",
                      editingBlockId === block.id && "border-primary ring-1 ring-primary shadow-sm"
                    )}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground font-heading">
                        {BLOCK_TYPE_LABELS[block.type as keyof typeof BLOCK_TYPE_LABELS] ?? block.type}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {i > 0 && (
                          <Button variant="ghost" size="icon-sm" onClick={() => handleMoveBlock(block.id, "up")}>
                            <Icons.ChevronUp className="h-4 w-4" />
                          </Button>
                        )}
                        {i < blocks.length - 1 && (
                          <Button variant="ghost" size="icon-sm" onClick={() => handleMoveBlock(block.id, "down")}>
                            <Icons.ChevronDown className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setEditingBlockId(editingBlockId === block.id ? null : block.id)}
                        >
                          <Icons.Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDeleteBlock(block.id)}
                          className="hover:text-destructive"
                        >
                          <Icons.Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="pointer-events-none">
                      <BlockRenderer block={block} pageSocialLinks={page.social_links} pageId={page.id} />
                    </div>

                    <AnimatePresence>
                      {editingBlockId === block.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <BlockEditor
                            block={block}
                            onSave={(content) => handleSaveBlock(block.id, content)}
                            onCancel={() => setEditingBlockId(null)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {blocks.length > 0 && (
            <Button variant="outline" className="mt-4 w-full" onClick={() => setShowAddBlock(true)}>
              <Icons.Plus className="mr-2 h-4 w-4" />
              Add Block
            </Button>
          )}
        </div>
      </div>

      <div className="w-full border-t bg-muted/20 lg:w-[420px] lg:border-t-0 lg:border-l xl:w-[480px]">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 border-b px-4 py-2.5 text-xs text-muted-foreground">
            <Icons.Eye className="h-3.5 w-3.5" />
            Live Preview
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div
              className="mx-auto max-w-sm overflow-hidden rounded-2xl border shadow-sm"
              style={{
                backgroundColor: theme.vars["--bg-primary"],
                color: theme.vars["--text-primary"],
                ...Object.fromEntries(Object.entries(theme.vars).map(([k, v]) => [k, v])),
              } as React.CSSProperties}
            >
              <div className="px-4 py-8">
                <div className="mb-4 text-center">
                  <p className="font-bold font-heading" style={{ color: theme.vars["--text-primary"] }}>
                    {page.title}
                  </p>
                  {page.description && (
                    <p className="mt-1 text-sm" style={{ color: theme.vars["--text-secondary"] }}>
                      {page.description}
                    </p>
                  )}
                </div>
                <div className="space-y-3">
                  {blocks.map((block) => (
                    <div key={block.id}>
                      <BlockRenderer block={block} pageSocialLinks={page.social_links} pageId={page.id} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddBlock && <AddBlockDialog onSelect={handleAddBlock} onClose={() => setShowAddBlock(false)} />}
    </div>
  );
}
