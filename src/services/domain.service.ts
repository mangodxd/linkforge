import { createClient } from "@/lib/supabase/client";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CustomDomain } from "@/types";

export async function fetchDomainsForPage(pageId: string): Promise<CustomDomain[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("custom_domains")
    .select("*")
    .eq("page_id", pageId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CustomDomain[];
}

export async function createDomain(pageId: string, domain: string): Promise<CustomDomain> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("custom_domains")
    .insert({ page_id: pageId, domain: domain.toLowerCase().trim() })
    .select("*")
    .single();
  if (error) throw error;
  return data as CustomDomain;
}

export async function removeDomain(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("custom_domains").delete().eq("id", id);
  if (error) throw error;
}

export async function verifyDomainOwnership(id: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("custom_domains")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) throw error ?? new Error("Domain not found");

  const domain = data as CustomDomain;

  // For MVP, check via DNS TXT record
  // In production, this would be done server-side with a DNS library
  // For now, we simulate verification by checking if the domain exists
  // TODO: Implement actual DNS TXT record verification
  // Requirement: Add a TXT record: linkforge-verify={verification_token}

  try {
    const response = await fetch(
      `https://dns.google/resolve?name=${domain.domain}&type=TXT`
    );
    const result = await response.json();
    const expectedToken = `linkforge-verify=${domain.verification_token}`;

    const records: string[] = [];
    if (result.Answer) {
      for (const answer of result.Answer) {
        if (answer.type === 16) {
          // TXT record
          const txt = answer.data.replace(/"/g, "");
          records.push(txt);
        }
      }
    }

    const isVerified = records.some((r) => r === expectedToken);

    if (isVerified) {
      const { error: updateError } = await supabase
        .from("custom_domains")
        .update({ verified: true, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (updateError) throw updateError;
    }

    return isVerified;
  } catch {
    // Failed to check DNS — return current verification status
    return domain.verified;
  }
}
