"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { createPage } from "@/services/page.service";
import { generateSlug } from "@/lib/utils";

export default function NewPageForm() {
  const router = useRouter();
  const { addToast } = useToast();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (autoSlug) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;
    setIsLoading(true);
    try {
      const page = await createPage({
        title: title.trim(),
        slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, ""),
        description: null,
        theme: "minimal",
      });
      addToast({ title: "Page created", variant: "success" });
      router.push(`/dashboard/pages/${page.id}/edit`);
    } catch (err) {
      addToast({
        title: "Failed to create page",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="relative overflow-hidden p-6">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-primary-light" />

      <h2 className="text-lg font-semibold font-heading">Create a new page</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Set up your link-in-bio page with a title and custom URL.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="My Links"
            required
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="slug">URL slug</Label>
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setAutoSlug(!autoSlug)}
            >
              {autoSlug ? "Edit manually" : "Auto-generate"}
            </button>
          </div>
          <div className="flex h-10 items-center gap-1 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground">
            <span className="truncate">{typeof window !== "undefined" ? window.location.hostname : ""}/</span>
            <input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setAutoSlug(false);
              }}
              placeholder="my-links"
              className="min-w-0 flex-1 bg-transparent outline-none text-foreground"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create page
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
