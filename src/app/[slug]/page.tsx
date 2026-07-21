import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { fetchPageBySlug, fetchBlocksForPage } from "@/services/page.service";
import { createServiceRoleClient } from "@/lib/db";
import PublicPageContent from "@/components/PublicPageContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PublicPage({ params }: Props) {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug);
  if (!page) notFound();

  const blocks = await fetchBlocksForPage(page.id);

  const headerList = await headers();
  const referrer = headerList.get("referer") ?? null;
  const userAgent = headerList.get("user-agent") ?? null;
  try {
    const db = createServiceRoleClient();
    await db.from("page_views").insert({
      page_id: page.id,
      referrer,
      user_agent: userAgent,
    });
  } catch {
    // Page view tracking failure should not break the page
  }

  return <PublicPageContent page={page} blocks={blocks} />;
}
