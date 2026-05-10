"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import DashboardStats from "@/components/admin/DashboardStats";
import DashboardInquiries from "@/components/admin/DashboardInquiries";
import DashboardWidgets from "@/components/admin/DashboardWidgets";

interface DashboardData {
  publishedTreks: number;
  publishedRegions: number;
  draftTreks: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function fetchStats() {
      setLoading(true);
      const [treksResult, regionsResult, draftsResult] = await Promise.all([
        supabase.from("treks").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("regions").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("treks").select("id", { count: "exact", head: true }).eq("is_published", false),
      ]);
      setStats({
        publishedTreks: treksResult.count ?? 0,
        publishedRegions: regionsResult.count ?? 0,
        draftTreks: draftsResult.count ?? 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <DashboardStats stats={stats} loading={loading} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <DashboardInquiries />
        <DashboardWidgets />
      </div>
    </div>
  );
}