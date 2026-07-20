import { createClient } from "@/lib/supabase/client";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Page, Block } from "@/types";

export async function fetchUserPages(userId: string): Promise<Page[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Page[];
}

export async function fetchPageById(id: string): Promise<Page | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("pages").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Page) ?? null;
}

export async function fetchPageBySlug(slug: string): Promise<Page | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return (data as Page) ?? null;
}

export async function fetchBlocksForPage(pageId: string): Promise<Block[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("blocks")
    .select("*")
    .eq("page_id", pageId)
    .order("position", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Block[];
}

export async function createPage(input: {
  user_id: string;
  title: string;
  slug: string;
  description: string | null;
  theme: string;
}): Promise<Page> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
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
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("pages")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Page;
}

export async function removePage(id: string): Promise<void> {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("pages").delete().eq("id", id);
  if (error) throw error;
}

// Client-side actions for interactive forms
export async function togglePublish(page: Page): Promise<Page> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pages")
    .update({ published: !page.published, updated_at: new Date().toISOString() })
    .eq("id", page.id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Page;
}

export async function duplicatePage(page: Page, userId: string): Promise<Page> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pages")
    .insert({
      user_id: userId,
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
