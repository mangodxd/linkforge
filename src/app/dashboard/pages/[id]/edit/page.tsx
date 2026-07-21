import { notFound } from "next/navigation";
import { fetchPageById, fetchBlocksForPage } from "@/services/page.service";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import BuilderClient from "./BuilderClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: Props) {
  const { id } = await params;

  const page = await fetchPageById(id);
  if (!page) notFound();

  const blocks = await fetchBlocksForPage(id);

  return (
    <ErrorBoundary>
      <BuilderClient page={page} blocks={blocks} />
    </ErrorBoundary>
  );
}
