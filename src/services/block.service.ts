import { createServiceRoleClient } from "@/lib/db";
import type { Block, Json } from "@/types";

const db = createServiceRoleClient();

export async function createBlock(input: {
  page_id: string;
  type: string;
  content: Json;
  position: number;
}): Promise<Block> {
  const { data, error } = await db
    .from("blocks")
    .insert(input)
    .select("*")
    .single();
  if (error) throw error;
  return data as Block;
}

export async function updateBlock(
  id: string,
  input: Partial<Pick<Block, "content" | "type" | "position">>
): Promise<Block> {
  const { data, error } = await db
    .from("blocks")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Block;
}

export async function removeBlock(id: string): Promise<void> {
  const { error } = await db.from("blocks").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderBlocks(
  pageId: string,
  orderedIds: string[]
): Promise<void> {
  const updates = orderedIds.map((id, index) => ({
    id,
    position: index,
    updated_at: new Date().toISOString(),
  }));
  for (const update of updates) {
    const { error } = await db
      .from("blocks")
      .update({ position: update.position, updated_at: update.updated_at })
      .eq("id", update.id);
    if (error) throw error;
  }
}
