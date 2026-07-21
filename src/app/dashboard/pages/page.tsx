import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fetchAllPages } from "@/services/page.service";
import { formatDate } from "@/lib/utils";
import type { Page } from "@/types";
import PageRowActions from "@/components/dashboard/PageRowActions";

export default async function PagesPage() {
  const pages: Page[] = await fetchAllPages();

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pages</h1>
          <p className="text-sm text-muted-foreground">Manage your link-in-bio pages</p>
        </div>
        <Link href="/dashboard/pages/new">
          <Button>
            <Icons.Plus className="mr-2 h-4 w-4" />
            New Page
          </Button>
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-muted/30 p-12 text-center">
          <Icons.FileText className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <h3 className="font-semibold">No pages yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first link-in-bio page to get started.
          </p>
          <Link href="/dashboard/pages/new">
            <Button className="mt-4">Create a page</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {pages.map((page: Page) => (
            <Card key={page.id} className="flex items-center justify-between p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/pages/${page.id}/edit`}
                    className="truncate font-medium hover:underline"
                  >
                    {page.title}
                  </Link>
                  {page.published ? (
                    <Badge variant="secondary">Published</Badge>
                  ) : (
                    <Badge variant="outline">Draft</Badge>
                  )}
                </div>
                <p className="truncate text-sm text-muted-foreground">
                  /{page.slug} · Updated {formatDate(page.updated_at)}
                </p>
              </div>
              <PageRowActions page={page} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}