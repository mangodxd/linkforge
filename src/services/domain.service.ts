import { createServiceRoleClient } from "@/lib/db";
import type { CustomDomain } from "@/types";

const db = createServiceRoleClient();

export async function fetchDomainsForPage(pageId: string): Promise<CustomDomain[]> {
  const { data, error } = await db
    .from("custom_domains")
    .select("*")
    .eq("page_id", pageId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CustomDomain[];
}

export async function createDomain(pageId: string, domain: string): Promise<CustomDomain> {
  const { data, error } = await db
    .from("custom_domains")
    .insert({ page_id: pageId, domain: domain.toLowerCase().trim() })
    .select("*")
    .single();
  if (error) throw error;
  return data as CustomDomain;
}

export async function removeDomain(id: string): Promise<void> {
  const { error } = await db.from("custom_domains").delete().eq("id", id);
  if (error) throw error;
}

export async function verifyDomainOwnership(id: string): Promise<boolean> {
  const { data, error } = await db
    .from("custom_domains")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) throw error ?? new Error("Domain not found");

  const domain = data as CustomDomain;

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
          const txt = answer.data.replace(/"/g, "");
          records.push(txt);
        }
      }
    }

    const isVerified = records.some((r) => r === expectedToken);

    if (isVerified) {
      const { error: updateError } = await db
        .from("custom_domains")
        .update({ verified: true, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (updateError) throw updateError;
    }

    return isVerified;
  } catch {
    return domain.verified;
  }
}
