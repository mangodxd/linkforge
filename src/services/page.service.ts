import { createServiceRoleClient } from "@/lib/db";
import type { Page, Block } from "@/types";

const db = createServiceRoleClient();

export async function fetchAllPages(): Promise<Page[]> {
  const { data, error } = await db
    .from("pages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Page[];
}

export async function fetchPageById(id: string): Promise<Page | null> {
  const { data, error } = await db.from("pages").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Page) ?? null;
}

export async function fetchPageBySlug(slug: string): Promise<Page | null> {
  const { data, error } = await db
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return (data as Page) ?? null;
}

export async function fetchBlocksForPage(pageId: string): Promise<Block[]> {
  const { data, error } = await db
    .from("blocks")
    .select("*")
    .eq("page_id", pageId)
    .order("position", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Block[];
}

export async function createPage(input: {
  title: string;
  slug: string;
  description: string | null;
  theme: string;
}): Promise<Page> {
  const { data, error } = await db
    .from("pages")
    .insert({ ...input, published: false })
    .select("*")
    .single();
  if (error) throw error;
  return data as Page;
}

export async function updatePage(
  id: string,
  input: Partial<Pick<Page, "title" | "slug" | "description" | "theme" | "published" | "social_links">>
): Promise<Page> {
  const { data, error } = await db
    .from("pages")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Page;
}

export async function removePage(id: string): Promise<void> {
  const { error } = await db.from("pages").delete().eq("id", id);
  if (error) throw error;
}

export async function togglePublish(page: Page): Promise<Page> {
  const { data, error } = await db
    .from("pages")
    .update({ published: !page.published, updated_at: new Date().toISOString() })
    .eq("id", page.id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Page;
}

export async function duplicatePage(page: Page): Promise<Page> {
  const { data, error } = await db
    .from("pages")
    .insert({
      title: `${page.title} (copy)`,
      slug: `${page.slug}-copy`,
      description: page.description,
      theme: page.theme,
      published: false,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as Page;
}
