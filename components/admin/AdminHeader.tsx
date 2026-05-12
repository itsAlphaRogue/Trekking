"use client";

import { usePathname } from "next/navigation";
import { useAdmin } from "./AdminShell";

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
  const { setSidebarOpen } = useAdmin();

  const match =
    Object.entries(pageTitles).find(([key]) => pathname.startsWith(key))?.[1] ??
    pageTitles["/admin/dashboard"];

  return (
    <header className="h-20 border-b border-outline-variant flex items-center justify-between px-6 md:px-10 bg-surface/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-on-surface-variant hover:text-primary transition-colors p-1"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        <div>
          <h2 className="font-serif text-lg md:text-xl font-semibold text-primary truncate max-w-[150px] md:max-w-none">
            {match.title}
          </h2>
          <p className="hidden xs:block text-[10px] md:text-[11px] font-semibold uppercase tracking-widest text-outline font-sans truncate">
            {match.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        {/* Notification - hidden on very small screens */}
        <div className="relative cursor-pointer hidden sm:block">
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
            notifications
          </span>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full" />
        </div>

        {/* Date range - hidden on small screens */}
        <div className="hidden md:flex items-center gap-2 border border-outline-variant px-3 py-2 rounded bg-surface-container-lowest">
          <span className="material-symbols-outlined text-outline text-sm">
            calendar_today
          </span>
          <span className="text-xs font-semibold font-sans text-on-surface">
            Oct 24 – Oct 30
          </span>
        </div>

        {/* New booking - icon only on small screens */}
        <button className="bg-primary text-on-primary p-2 md:px-5 md:py-2 rounded text-xs font-semibold font-sans flex items-center gap-2 hover:bg-primary-container transition-colors shadow-sm">
          <span className="material-symbols-outlined text-lg">add</span>
          <span className="hidden md:inline">New Booking</span>
        </button>
      </div>
    </header>
  );
}
