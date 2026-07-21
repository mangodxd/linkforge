import { createServiceRoleClient } from "@/lib/db";
import type { Profile } from "@/types";

const db = createServiceRoleClient();

export async function fetchProfile(): Promise<Profile | null> {
  const { data, error } = await db
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data as Profile) ?? null;
}

export async function upsertProfile(
  input: { display_name: string | null; bio: string | null; avatar_url: string | null }
): Promise<Profile> {
  const existing = await fetchProfile();
  const { data, error } = await db
    .from("profiles")
    .upsert(
      { id: existing?.id, ...input, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    )
    .select("*")
    .single();
  if (error) throw error;
  return data as Profile;
}
