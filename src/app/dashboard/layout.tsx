import DashboardSidebar from "@/components/dashboard/Sidebar";
import PageTransition from "@/components/PageTransition";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <DashboardSidebar />
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
