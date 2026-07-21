import { notFound } from "next/navigation";
import { fetchPageById } from "@/services/page.service";
import { fetchDomainsForPage } from "@/services/domain.service";
import DomainsForm from "./DomainsForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DomainsPage({ params }: Props) {
  const { id } = await params;

  const page = await fetchPageById(id);
  if (!page) notFound();

  const domains = await fetchDomainsForPage(id);

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold">Custom Domains</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Connect a custom domain to <span className="font-medium">{page.title}</span>.
      </p>
      <div className="mt-6 max-w-lg">
        <DomainsForm pageId={id} initialDomains={domains} />
      </div>
    </div>
  );
}
