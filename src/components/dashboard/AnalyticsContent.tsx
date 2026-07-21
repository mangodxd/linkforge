"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";

interface DailyView {
  date: string;
  count: number;
}

interface Referrer {
  referrer: string | null;
  count: number;
}

interface ClickStat {
  block_type: string;
  count: number;
}

interface Props {
  title: string;
  totalViews: number;
  totalClicks: number;
  ctr: string;
  dailyViews: DailyView[];
  topReferrers: Referrer[];
  clickStats: ClickStat[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
} as const;

export default function AnalyticsContent({
  title,
  totalViews,
  totalClicks,
  ctr,
  dailyViews,
  topReferrers,
  clickStats,
}: Props) {
  const maxDailyCount = Math.max(...dailyViews.map((d) => d.count), 1);
  const maxReferrerCount = Math.max(...topReferrers.map((r) => r.count), 1);
  const maxClickCount = Math.max(...clickStats.map((c) => c.count), 1);

  return (
    <div className="p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold font-heading">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">{title}</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 grid gap-4 sm:grid-cols-3"
      >
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden p-4">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-primary-light" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icons.Eye className="h-4 w-4" />
              Total Views
            </div>
            <p className="mt-2 text-3xl font-bold font-heading">{totalViews}</p>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden p-4">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-warning to-amber-400" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icons.MousePointerClick className="h-4 w-4" />
              Total Clicks
            </div>
            <p className="mt-2 text-3xl font-bold font-heading">{totalClicks}</p>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden p-4">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-success to-emerald-400" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icons.TrendingUp className="h-4 w-4" />
              CTR
            </div>
            <p className="mt-2 text-3xl font-bold font-heading">{ctr}</p>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="mt-6 p-4">
          <h3 className="mb-4 text-sm font-semibold font-heading">Views — Last 7 Days</h3>
          {dailyViews.length === 0 ? (
            <p className="text-sm text-muted-foreground">No views in the last 7 days.</p>
          ) : (
            <div className="space-y-2">
              {dailyViews.map((dv, i) => (
                <motion.div
                  key={dv.date}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-24 shrink-0 text-xs text-muted-foreground">{dv.date}</span>
                  <div className="flex-1">
                    <div className="h-6 rounded-md bg-primary/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(dv.count / maxDailyCount) * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.05, ease: "easeOut" }}
                        className="h-full rounded-md bg-gradient-to-r from-primary to-primary-light"
                      />
                    </div>
                  </div>
                  <span className="w-8 text-right text-xs font-medium tabular-nums">{dv.count}</span>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="p-4">
            <h3 className="mb-4 text-sm font-semibold font-heading">Top Referrers</h3>
            {topReferrers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No referrer data yet.</p>
            ) : (
              <div className="space-y-2">
                {topReferrers.map((ref, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex-1 truncate text-sm">{ref.referrer ?? "Direct"}</span>
                    <div className="h-5 w-20 overflow-hidden rounded-sm bg-muted">
                      <div
                        className="h-full rounded-sm bg-primary/30"
                        style={{ width: `${(ref.count / maxReferrerCount) * 100}%` }}
                      />
                    </div>
                    <Badge variant="secondary" className="shrink-0 tabular-nums">{ref.count}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <Card className="p-4">
            <h3 className="mb-4 text-sm font-semibold font-heading">Clicks by Block</h3>
            {clickStats.length === 0 ? (
              <p className="text-sm text-muted-foreground">No click data yet.</p>
            ) : (
              <div className="space-y-2">
                {clickStats.slice(0, 10).map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex-1 truncate text-sm capitalize">{stat.block_type}</span>
                    <div className="h-5 w-20 overflow-hidden rounded-sm bg-muted">
                      <div
                        className="h-full rounded-sm bg-primary/30"
                        style={{ width: `${(stat.count / maxClickCount) * 100}%` }}
                      />
                    </div>
                    <Badge variant="secondary" className="shrink-0 tabular-nums">{stat.count}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
