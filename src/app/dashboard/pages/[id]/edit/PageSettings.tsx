"use client";

import { useState } from "react";
import type { Page } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { THEMES, THEME_LABELS, SOCIAL_PLATFORMS, SOCIAL_PLATFORM_LABELS } from "@/lib/constants";
import { themes } from "@/lib/theme";
import type { SocialPlatform } from "@/lib/constants";

interface SocialLinkEntry {
  platform: string;
  url: string;
  label?: string;
}

interface Props {
  page: Page;
  onSave: (updates: Partial<Page>) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function parseSocialLinks(raw: unknown): SocialLinkEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw as SocialLinkEntry[];
}

export default function PageSettings({ page, onSave, onCancel, saving }: Props) {
  const [title, setTitle] = useState(page.title);
  const [slug, setSlug] = useState(page.slug);
  const [description, setDescription] = useState(page.description ?? "");
  const [theme, setTheme] = useState(page.theme);
  const [socialLinks, setSocialLinks] = useState<SocialLinkEntry[]>(
    parseSocialLinks(page.social_links)
  );

  function addSocialLink() {
    setSocialLinks((prev) => [...prev, { platform: "github", url: "" }]);
  }

  function removeSocialLink(index: number) {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  }

  function updateSocialLink(index: number, field: keyof SocialLinkEntry, value: string) {
    setSocialLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    );
  }

  async function handleSave() {
    const updates: Partial<Page> = {};
    if (title !== page.title) updates.title = title;
    if (slug !== page.slug) updates.slug = slug;
    if (description !== (page.description ?? "")) updates.description = description || null;
    if (theme !== page.theme) updates.theme = theme;

    // Always send social_links so the block renders correctly
    updates.social_links = socialLinks as unknown as Page["social_links"];

    if (Object.keys(updates).length === 0) {
      onCancel();
      return;
    }
    await onSave(updates);
  }

  const themeValues = Object.values(THEMES);
  const platformValues = Object.values(SOCIAL_PLATFORMS);

  return (
    <div className="mb-4 rounded-lg border bg-muted/30 p-4">
      <h3 className="mb-3 text-sm font-semibold">Page Settings</h3>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-xs font-medium">Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium">Slug</Label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium">Description</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium">Theme</Label>
          <div className="grid grid-cols-3 gap-2">
            {themeValues.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-all ${
                  theme === t ? "border-primary ring-1 ring-primary" : "hover:border-muted-foreground"
                }`}
                style={{ backgroundColor: themes[t]?.vars["--bg-primary"], color: themes[t]?.vars["--text-primary"] }}
              >
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: themes[t]?.vars["--accent"] }} />
                {THEME_LABELS[t as keyof typeof THEME_LABELS]}
              </button>
            ))}
          </div>
        </div>

        {/* Social links */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium">Social Links</Label>
            <Button variant="ghost" size="sm" onClick={addSocialLink}>
              <Icons.Plus className="mr-1 h-3 w-3" />
              Add
            </Button>
          </div>
          {socialLinks.length === 0 && (
            <p className="text-xs text-muted-foreground">No social links added yet.</p>
          )}
          {socialLinks.map((link, i) => (
            <div key={i} className="flex items-start gap-2 rounded-md bg-muted/50 p-2">
              <div className="flex-1 space-y-1">
                <select
                  className="flex h-8 w-full rounded-md border border-input bg-transparent px-2 text-xs"
                  value={link.platform}
                  onChange={(e) => updateSocialLink(i, "platform", e.target.value)}
                >
                  {platformValues.map((p) => (
                    <option key={p} value={p}>
                      {SOCIAL_PLATFORM_LABELS[p as SocialPlatform]}
                    </option>
                  ))}
                </select>
                <Input
                  value={link.url}
                  onChange={(e) => updateSocialLink(i, "url", e.target.value)}
                  placeholder="https://"
                  className="h-8 text-xs"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSocialLink(i)}
                className="mt-0.5 shrink-0"
              >
                <Icons.X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving && <Icons.Loader2 className="mr-1 h-3 w-3 animate-spin" />}
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
