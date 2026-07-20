"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
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
        addToast({ title: `${BLOCK_TYPE_LABELS[type as keyof typeof BLOCK_TYPE_LABELS] ?? type} block added`, variant: "success" });
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
      setBlocks((prev) => prev.map((b) => (b.id === blockId ? { ...b, content: jsonContent } : b)));
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
      {/* Editor panel */}
      <div className="flex-1 overflow-y-auto border-r p-4 lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{page.title}</h2>
            {page.published ? (
              <Badge variant="secondary">Published</Badge>
            ) : (
              <Badge variant="outline">Draft</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
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
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 px-3"
              >
                <Icons.ExternalLink className="mr-1 h-4 w-4" />
                View Live
              </a>
            )}
            <Button variant="outline" size="sm" onClick={() => setShowPageSettings(!showPageSettings)}>
              <Icons.Settings className="mr-1 h-4 w-4" />
              Settings
            </Button>
            <Button size="sm" onClick={() => setShowAddBlock(true)}>
              <Icons.Plus className="mr-1 h-4 w-4" />
              Add Block
            </Button>
          </div>
        </div>

        {showPageSettings && (
          <PageSettings
            page={page}
            onSave={handleSavePageSettings}
            onCancel={() => setShowPageSettings(false)}
            saving={saving}
          />
        )}

        {blocks.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-muted/30 p-8 text-center">
            <Icons.FileText className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No blocks yet. Add one to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {blocks.map((block, i) => (
              <div
                key={block.id}
                className={cn(
                  "rounded-lg border bg-card p-3 transition-colors",
                  editingBlockId === block.id && "border-primary ring-1 ring-primary"
                )}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {BLOCK_TYPE_LABELS[block.type as keyof typeof BLOCK_TYPE_LABELS] ?? block.type}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {i > 0 && (
                      <Button variant="ghost" size="sm" onClick={() => handleMoveBlock(block.id, "up")}>
                        <Icons.ChevronUp className="h-4 w-4" />
                      </Button>
                    )}
                    {i < blocks.length - 1 && (
                      <Button variant="ghost" size="sm" onClick={() => handleMoveBlock(block.id, "down")}>
                        <Icons.ChevronDown className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => setEditingBlockId(editingBlockId === block.id ? null : block.id)}>
                      <Icons.Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteBlock(block.id)}>
                      <Icons.Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="pointer-events-none">
                  <BlockRenderer block={block} pageSocialLinks={page.social_links} />
                </div>

                {editingBlockId === block.id && (
                  <BlockEditor block={block} onSave={(content) => handleSaveBlock(block.id, content)} onCancel={() => setEditingBlockId(null)} />
                )}
              </div>
            ))}
          </div>
        )}

        <Button variant="outline" className="mt-4 w-full" onClick={() => setShowAddBlock(true)}>
          <Icons.Plus className="mr-2 h-4 w-4" />
          Add Block
        </Button>

        {showAddBlock && <AddBlockDialog onSelect={handleAddBlock} onClose={() => setShowAddBlock(false)} />}
      </div>

      {/* Preview panel */}
      <div className="w-full bg-muted/30 lg:w-[420px] xl:w-[480px]">
        <div className="p-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Icons.Eye className="h-3.5 w-3.5" />
            Live Preview
          </div>
          <div
            className="overflow-hidden rounded-xl border shadow-sm"
            style={{
              backgroundColor: theme.vars["--bg-primary"],
              color: theme.vars["--text-primary"],
              ...Object.fromEntries(Object.entries(theme.vars).map(([k, v]) => [k, v])),
            } as React.CSSProperties}
          >
            <div className="mx-auto max-w-sm px-4 py-8">
              <div className="mb-4 text-center">
                <p className="font-bold" style={{ color: theme.vars["--text-primary"] }}>
                  {page.title}
                </p>
              </div>
              <div className="space-y-3">
                {blocks.map((block) => (
                  <div key={block.id}>
                    <BlockRenderer block={block} pageSocialLinks={page.social_links} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
