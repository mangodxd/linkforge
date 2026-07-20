"use client";

import { useState } from "react";
import type { Block } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { BLOCK_TYPES } from "@/lib/constants";

interface Props {
  block: Block;
  onSave: (content: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

export default function BlockEditor({ block, onSave, onCancel }: Props) {
  const [content, setContent] = useState<Record<string, unknown>>(
    typeof block.content === "object" && block.content !== null
      ? (block.content as Record<string, unknown>)
      : {}
  );
  const [saving, setSaving] = useState(false);

  function updateField(key: string, value: unknown) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(content);
    } finally {
      setSaving(false);
    }
  }

  switch (block.type) {
    case BLOCK_TYPES.HEADER:
      return (
        <div className="mt-3 space-y-3 rounded-lg bg-muted/50 p-3">
          <div className="space-y-1">
            <Label className="text-xs font-medium">Text</Label>
            <Input value={(content.text as string) ?? ""} onChange={(e) => updateField("text", e.target.value)} placeholder="Heading text" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium">Level</Label>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              value={(content.level as number) ?? 2}
              onChange={(e) => updateField("level", Number(e.target.value))}
            >
              <option value={1}>H1</option>
              <option value={2}>H2</option>
              <option value={3}>H3</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving && <Icons.Loader2 className="mr-1 h-3 w-3 animate-spin" />}
              Save
            </Button>
          </div>
        </div>
      );

    case BLOCK_TYPES.BUTTON:
      return (
        <div className="mt-3 space-y-3 rounded-lg bg-muted/50 p-3">
          <div className="space-y-1">
            <Label className="text-xs font-medium">Text</Label>
            <Input value={(content.text as string) ?? ""} onChange={(e) => updateField("text", e.target.value)} placeholder="Button text" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium">URL</Label>
            <Input value={(content.url as string) ?? ""} onChange={(e) => updateField("url", e.target.value)} placeholder="https://" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium">Variant</Label>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              value={(content.variant as string) ?? "primary"}
              onChange={(e) => updateField("variant", e.target.value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="outline">Outline</option>
              <option value="ghost">Ghost</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={(content.openInNewTab as boolean) ?? false}
              onChange={(e) => updateField("openInNewTab", e.target.checked)}
            />
            Open in new tab
          </label>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving && <Icons.Loader2 className="mr-1 h-3 w-3 animate-spin" />}
              Save
            </Button>
          </div>
        </div>
      );

    case BLOCK_TYPES.TEXT:
      return (
        <div className="mt-3 space-y-3 rounded-lg bg-muted/50 p-3">
          <div className="space-y-1">
            <Label className="text-xs font-medium">Text</Label>
            <textarea
              className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              value={(content.text as string) ?? ""}
              onChange={(e) => updateField("text", e.target.value)}
              placeholder="Text content"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving && <Icons.Loader2 className="mr-1 h-3 w-3 animate-spin" />}
              Save
            </Button>
          </div>
        </div>
      );

    case BLOCK_TYPES.IMAGE:
      return (
        <div className="mt-3 space-y-3 rounded-lg bg-muted/50 p-3">
          <div className="space-y-1">
            <Label className="text-xs font-medium">Image URL</Label>
            <Input value={(content.src as string) ?? ""} onChange={(e) => updateField("src", e.target.value)} placeholder="https://..." />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium">Alt text</Label>
            <Input value={(content.alt as string) ?? ""} onChange={(e) => updateField("alt", e.target.value)} placeholder="Description" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving && <Icons.Loader2 className="mr-1 h-3 w-3 animate-spin" />}
              Save
            </Button>
          </div>
        </div>
      );

    case BLOCK_TYPES.DIVIDER:
      return (
        <div className="mt-3 space-y-3 rounded-lg bg-muted/50 p-3">
          <div className="space-y-1">
            <Label className="text-xs font-medium">Style</Label>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              value={(content.style as string) ?? "solid"}
              onChange={(e) => updateField("style", e.target.value)}
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving && <Icons.Loader2 className="mr-1 h-3 w-3 animate-spin" />}
              Save
            </Button>
          </div>
        </div>
      );

    case BLOCK_TYPES.SOCIAL_LINKS:
      return (
        <div className="mt-3 space-y-3 rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">
            Social links are managed in the page settings. This block renders them automatically.
          </p>
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={onCancel}>Close</Button>
          </div>
        </div>
      );

    case BLOCK_TYPES.GALLERY: {
      const images: Array<{ src: string; alt: string }> = (content.images as Array<{ src: string; alt: string }>) ?? [];
      return (
        <div className="mt-3 space-y-3 rounded-lg bg-muted/50 p-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium">Images</Label>
            <Button variant="ghost" size="sm" onClick={() => updateField("images", [...images, { src: "", alt: "" }])}>
              <Icons.Plus className="mr-1 h-3 w-3" />
              Add image
            </Button>
          </div>
          {images.map((img: { src: string; alt: string }, i: number) => (
            <div key={i} className="space-y-1 rounded-md bg-muted/50 p-2">
              <Input
                value={img.src}
                onChange={(e) => {
                  const updated = images.map((im: { src: string; alt: string }, j: number) =>
                    j === i ? { ...im, src: e.target.value } : im
                  );
                  updateField("images", updated);
                }}
                placeholder="Image URL"
                className="h-8 text-xs"
              />
              <Input
                value={img.alt}
                onChange={(e) => {
                  const updated = images.map((im: { src: string; alt: string }, j: number) =>
                    j === i ? { ...im, alt: e.target.value } : im
                  );
                  updateField("images", updated);
                }}
                placeholder="Alt text"
                className="h-8 text-xs"
              />
            </div>
          ))}
          <div className="space-y-1">
            <Label className="text-xs font-medium">Layout</Label>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              value={(content.layout as string) ?? "grid"}
              onChange={(e) => updateField("layout", e.target.value)}
            >
              <option value="grid">Grid</option>
              <option value="carousel">Carousel</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving && <Icons.Loader2 className="mr-1 h-3 w-3 animate-spin" />}
              Save
            </Button>
          </div>
        </div>
      );
    }

    case BLOCK_TYPES.VIDEO:
      return (
        <div className="mt-3 space-y-3 rounded-lg bg-muted/50 p-3">
          <div className="space-y-1">
            <Label className="text-xs font-medium">Video URL</Label>
            <Input
              value={(content.url as string) ?? ""}
              onChange={(e) => updateField("url", e.target.value)}
              placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium">Platform</Label>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              value={(content.platform as string) ?? "custom"}
              onChange={(e) => updateField("platform", e.target.value)}
            >
              <option value="custom">Auto-detect</option>
              <option value="youtube">YouTube</option>
              <option value="vimeo">Vimeo</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={(content.autoplay as boolean) ?? false}
              onChange={(e) => updateField("autoplay", e.target.checked)}
            />
            Autoplay
          </label>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving && <Icons.Loader2 className="mr-1 h-3 w-3 animate-spin" />}
              Save
            </Button>
          </div>
        </div>
      );

    default:
      return null;
  }
}
