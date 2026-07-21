import { fetchAllPages } from "@/services/page.service";
import { fetchProfile } from "@/services/profile.service";
import { getTotalViews } from "@/services/analytics.service";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default async function DashboardPage() {
  const [pages, profile] = await Promise.all([
    fetchAllPages(),
    fetchProfile(),
  ]);

  const viewCounts = await Promise.all(
    pages.map((p) => getTotalViews(p.id).catch(() => 0))
  );
  const totalViews = viewCounts.reduce((a, b) => a + b, 0);

  return (
    <DashboardContent pages={pages} profile={profile} totalViews={totalViews} />
  );
}
