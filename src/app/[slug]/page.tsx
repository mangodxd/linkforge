import { notFound } from "next/navigation";
import { fetchPageBySlug, fetchBlocksForPage } from "@/services/page.service";
import { themes } from "@/lib/theme";
import { BlockRenderer } from "@/components/blocks";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PublicPage({ params }: Props) {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug);
  if (!page) notFound();

  const blocks = await fetchBlocksForPage(page.id);
  const theme = themes[page.theme] ?? themes.minimal;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.vars["--bg-primary"],
        color: theme.vars["--text-primary"],
        fontFamily: theme.vars["--font-body"],
        "--bg-primary": theme.vars["--bg-primary"],
        "--bg-secondary": theme.vars["--bg-secondary"],
        "--bg-card": theme.vars["--bg-card"],
        "--text-primary": theme.vars["--text-primary"],
        "--text-secondary": theme.vars["--text-secondary"],
        "--text-muted": theme.vars["--text-muted"],
        "--accent": theme.vars["--accent"],
        "--accent-hover": theme.vars["--accent-hover"],
        "--accent-text": theme.vars["--accent-text"],
        "--border": theme.vars["--border"],
        "--font-heading": theme.vars["--font-heading"],
        "--font-body": theme.vars["--font-body"],
        "--radius": theme.vars["--radius"],
      } as React.CSSProperties}
    >
      <div className="mx-auto max-w-lg px-4 py-12">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold" style={{ color: theme.vars["--text-primary"] }}>
            {page.title}
          </h1>
          {page.description && (
            <p className="mt-1 text-sm" style={{ color: theme.vars["--text-secondary"] }}>
              {page.description}
            </p>
          )}
        </div>
        <div className="space-y-4">
          {blocks.map((block) => (
            <div key={block.id}>
              <BlockRenderer block={block} pageSocialLinks={page.social_links} />
            </div>
          ))}
        </div>
        <footer className="mt-12 text-center text-xs" style={{ color: theme.vars["--text-muted"] }}>
          Powered by LinkForge
        </footer>
      </div>
    </div>
  );
}
