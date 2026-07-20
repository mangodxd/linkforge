import { createClient } from "@/lib/supabase/client";
import type { Asset } from "@/types";

const BUCKET_NAME = "assets";

export async function uploadAsset(
  userId: string,
  file: File
): Promise<Asset> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
  const publicUrl = urlData.publicUrl;

  const { data, error } = await supabase
    .from("assets")
    .insert({
      user_id: userId,
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
      storage_path: fileName,
      public_url: publicUrl,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as Asset;
}

export async function fetchUserAssets(userId: string): Promise<Asset[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("assets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Asset[];
}

export async function removeAsset(id: string, storagePath: string): Promise<void> {
  const supabase = createClient();
  const { error: storageError } = await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
  if (storageError) throw storageError;

  const { error } = await supabase.from("assets").delete().eq("id", id);
  if (error) throw error;
}
