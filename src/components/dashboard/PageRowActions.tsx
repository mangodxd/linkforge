'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { togglePublish, duplicatePage, removePage } from "@/services/page.service";
import type { Page } from "@/types";

export default function PageRowActions({ page }: { page: Page }) {
  const router = useRouter();
  const { addToast } = useToast();

  async function handleToggle() {
    try {
      await togglePublish(page);
      router.refresh();
    } catch (err) {
      addToast({
        title: "Update failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    }
  }

  async function handleDuplicate() {
    try {
      await duplicatePage(page);
      addToast({ title: "Page duplicated", variant: "success" });
      router.refresh();
    } catch (err) {
      addToast({
        title: "Duplicate failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    }
  }

  async function handleDelete() {
    try {
      await removePage(page.id);
      addToast({ title: "Page deleted", variant: "success" });
      router.refresh();
    } catch (err) {
      addToast({
        title: "Delete failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      <Link href={`/dashboard/pages/${page.id}/edit`}>
        <Button variant="ghost" size="sm">
          <Icons.Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button></Link>
      <Link href={`/dashboard/pages/${page.id}/analytics`}>
        <Button variant="ghost" size="sm">
          <Icons.BarChart3 className="h-4 w-4" />
          <span className="sr-only">Analytics</span>
        </Button></Link>
      <Button variant="ghost" size="sm" onClick={handleToggle}>
        {page.published ? <Icons.EyeOff className="h-4 w-4" /> : <Icons.Eye className="h-4 w-4" />}
        <span className="sr-only">Toggle publish</span>
      </Button>
      <Button variant="ghost" size="sm" onClick={handleDuplicate}>
        <Icons.Copy className="h-4 w-4" />
        <span className="sr-only">Duplicate</span>
      </Button>
      <Button variant="ghost" size="sm" onClick={handleDelete}>
        <Icons.Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}