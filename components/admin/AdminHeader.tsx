"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin/dashboard": {
    title: "Overview",
    subtitle: "Welcome back. Here is what's happening today.",
  },
  "/admin/treks": {
    title: "Active Treks",
    subtitle: "Monitor all live expeditions in real time.",
  },
  "/admin/bookings": {
    title: "Bookings",
    subtitle: "Manage all confirmed and pending bookings.",
  },
  "/admin/regions": {
    title: "Regions",
    subtitle: "Manage trekking regions shown on the destinations page.",
  },
  "/admin/packages": {
    title: "Packages",
    subtitle: "Add, edit and delete trek packages shown on the public site.",
  },
  "/admin/inquiries": {
    title: "Inquiries",
    subtitle: "Respond to new and ongoing client inquiries.",
  },
  "/admin/finance": {
    title: "Finance",
    subtitle: "Revenue, expenses, and financial summaries.",
  },
  "/admin/settings": {
    title: "Settings",
    subtitle: "Manage your account and system preferences.",
  },
};

export default function AdminHeader() {
  const pathname = usePathname();
  const match =
    Object.entries(pageTitles).find(([key]) => pathname.startsWith(key))?.[1] ??
    pageTitles["/admin/dashboard"];

  return (
    <header className="h-20 border-b border-outline-variant flex items-center justify-between px-8 md:px-10 bg-surface/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
      <div>
        <h2 className="font-serif text-xl font-semibold text-primary">
          {match.title}
        </h2>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-outline font-sans">
          {match.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-5">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
            notifications
          </span>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full" />
        </div>

        {/* Date range */}
        <div className="flex items-center gap-2 border border-outline-variant px-3 py-2 rounded bg-surface-container-lowest">
          <span className="material-symbols-outlined text-outline text-sm">
            calendar_today
          </span>
          <span className="text-xs font-semibold font-sans text-on-surface">
            Oct 24 – Oct 30
          </span>
        </div>

        {/* New booking */}
        <button className="bg-primary text-on-primary px-5 py-2 rounded text-xs font-semibold font-sans flex items-center gap-2 hover:bg-primary-container transition-colors">
          <span className="material-symbols-outlined text-lg">add</span>
          New Booking
        </button>
      </div>
    </header>
  );
}
