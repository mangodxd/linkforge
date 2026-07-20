import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types";

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return (data as Profile) ?? null;
}

export async function upsertProfile(
  userId: string,
  input: { display_name: string | null; bio: string | null; avatar_url: string | null }
): Promise<Profile> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      { user_id: userId, ...input, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    )
    .select("*")
    .single();
  if (error) throw error;
  return data as Profile;
}
