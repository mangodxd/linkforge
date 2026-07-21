import { notFound } from "next/navigation";
import { fetchPageById } from "@/services/page.service";
import {
  getTotalViews,
  getTotalClicks,
  getViewsByDay,
  getTopReferrers,
  getClickStats,
} from "@/services/analytics.service";
import AnalyticsContent from "@/components/dashboard/AnalyticsContent";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AnalyticsPage({ params }: Props) {
  const { id } = await params;

  const page = await fetchPageById(id);
  if (!page) notFound();

  const [totalViews, totalClicks, dailyViews, topReferrers, clickStats] = await Promise.all([
    getTotalViews(id),
    getTotalClicks(id),
    getViewsByDay(id, 7),
    getTopReferrers(id, 5),
    getClickStats(id),
  ]);

  const totalClicksDisplay = clickStats.reduce((sum, s) => sum + s.count, 0);
  const ctr = totalViews > 0 ? `${Math.round((totalClicksDisplay / totalViews) * 100)}%` : "—";

  return (
    <AnalyticsContent
      title={page.title}
      totalViews={totalViews}
      totalClicks={totalClicks}
      ctr={ctr}
      dailyViews={dailyViews}
      topReferrers={topReferrers}
      clickStats={clickStats}
    />
  );
}
