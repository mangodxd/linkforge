import { createServiceRoleClient } from "@/lib/db";

export interface DailyViews {
  date: string;
  count: number;
}

export interface TopReferrer {
  referrer: string | null;
  count: number;
}

const db = createServiceRoleClient();

export async function getTotalViews(pageId: string): Promise<number> {
  const { count, error } = await db
    .from("page_views")
    .select("*", { count: "exact", head: true })
    .eq("page_id", pageId);
  if (error) throw error;
  return count ?? 0;
}

export async function getTotalClicks(pageId: string): Promise<number> {
  const { count, error } = await db
    .from("click_events")
    .select("*", { count: "exact", head: true })
    .eq("page_id", pageId);
  if (error) throw error;
  return count ?? 0;
}

export async function getViewsByDay(pageId: string, days: number = 7): Promise<DailyViews[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await db
    .from("page_views")
    .select("viewed_at")
    .eq("page_id", pageId)
    .gte("viewed_at", since.toISOString())
    .order("viewed_at", { ascending: true });

  if (error) throw error;

  const dayMap = new Map<string, number>();
  for (const row of data ?? []) {
    const day = row.viewed_at.slice(0, 10);
    dayMap.set(day, (dayMap.get(day) ?? 0) + 1);
  }

  return Array.from(dayMap.entries()).map(([date, count]) => ({ date, count }));
}

export async function getTopReferrers(pageId: string, limit: number = 10): Promise<TopReferrer[]> {
  const { data, error } = await db
    .from("page_views")
    .select("referrer")
    .eq("page_id", pageId);

  if (error) throw error;

  const refMap = new Map<string, number>();
  for (const row of data ?? []) {
    const ref = row.referrer ?? "(direct)";
    refMap.set(ref, (refMap.get(ref) ?? 0) + 1);
  }

  return Array.from(refMap.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function getClickStats(
  pageId: string
): Promise<Array<{ block_type: string; count: number }>> {
  const { data, error } = await db
    .from("click_events")
    .select("block_id, clicked_at")
    .eq("page_id", pageId);

  if (error) throw error;

  const clickMap = new Map<string, number>();
  for (const row of data ?? []) {
    const id = row.block_id ?? "(unknown)";
    clickMap.set(id, (clickMap.get(id) ?? 0) + 1);
  }

  return Array.from(clickMap.entries())
    .map(([block_type, count]) => ({ block_type, count }))
    .sort((a, b) => b.count - a.count);
}
