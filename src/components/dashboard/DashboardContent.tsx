"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Page, Profile } from "@/types";
import { formatDate, formatNumber } from "@/lib/utils";

interface Props {
  pages: Page[];
  profile: Profile | null;
  totalViews: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
} as const;

export default function DashboardContent({ pages, profile, totalViews }: Props) {
  const published = pages.filter((p) => p.published);
  const recentPages = pages.slice(0, 5);

  return (
    <div className="p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold font-heading">
          Welcome{profile?.display_name ? `, ${profile.display_name}` : ""}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your pages.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-3"
      >
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden p-4">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-primary-light" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icons.FileText className="h-4 w-4" />
              Total Pages
            </div>
            <p className="mt-2 text-3xl font-bold font-heading">{pages.length}</p>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden p-4">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-success to-emerald-400" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icons.CheckCircle2 className="h-4 w-4" />
              Published
            </div>
            <p className="mt-2 text-3xl font-bold font-heading">{published.length}</p>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden p-4">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-warning to-amber-400" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icons.Eye className="h-4 w-4" />
              Total Views
            </div>
            <p className="mt-2 text-3xl font-bold font-heading">{formatNumber(totalViews)}</p>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-8"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold font-heading">Recent Pages</h2>
          <Link href="/dashboard/pages/new">
            <Button size="sm">
              <Icons.Plus className="mr-1.5 h-4 w-4" />
              New Page
            </Button>
          </Link>
        </div>

        {recentPages.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <Icons.FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold">No pages yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first link-in-bio page to get started.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/dashboard/pages/new">
                <Button>Create your first page</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {recentPages.map((page) => (
              <motion.div key={page.id} variants={itemVariants}>
                <Card variant="hover" className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                      {page.title.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/pages/${page.id}/edit`}
                          className="truncate font-medium hover:text-primary transition-colors"
                        >
                          {page.title}
                        </Link>
                        {page.published ? (
                          <Badge variant="success" className="shrink-0">Published</Badge>
                        ) : (
                          <Badge variant="outline" className="shrink-0">Draft</Badge>
                        )}
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        /{page.slug} · Updated {formatDate(page.updated_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden text-sm text-muted-foreground sm:block">
                      {formatNumber(0)} views
                    </span>
                    <div className="flex gap-0.5">
                      {page.published && (
                        <Link
                          href={`/${page.slug}`}
                          target="_blank"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        >
                          <Icons.ExternalLink className="h-4 w-4" />
                        </Link>
                      )}
                      <Link
                        href={`/dashboard/pages/${page.id}/analytics`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        <Icons.BarChart3 className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/dashboard/pages/${page.id}/edit`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        <Icons.Pencil className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {pages.length > 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <Link
            href="/dashboard/pages"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all {pages.length} pages
            <Icons.ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
