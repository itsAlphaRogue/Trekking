import DashboardStats from "@/components/admin/DashboardStats";
import DashboardInquiries from "@/components/admin/DashboardInquiries";
import DashboardWidgets from "@/components/admin/DashboardWidgets";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* KPI cards */}
      <DashboardStats />

      {/* Main grid — inquiries table + widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        <DashboardInquiries />
        <DashboardWidgets />
      </div>
    </div>
  );
}
