"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
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
          <h2 className="font-serif text-lg md:text-xl font-semibold text-primary truncate">
            {match.title}
          </h2>
          <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-widest text-outline font-sans">
            {match.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Quick Actions */}
        <div className="flex items-center gap-1 md:gap-2 pr-2 md:pr-4 border-r border-outline-variant hidden sm:flex">
          <Link
            href="/"
            target="_blank"
            className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
            title="View Public Site"
          >
            <span className="material-symbols-outlined text-xl">open_in_new</span>
            <span className="hidden xl:inline text-[11px] font-semibold uppercase tracking-wider font-sans">Site</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Settings Shortcut */}
          <Link
            href="/admin/settings"
            className="p-2 text-on-surface-variant hover:text-primary transition-colors sm:flex items-center justify-center"
            title="Admin Settings"
          >
            <span className="material-symbols-outlined text-xl">settings</span>
          </Link>

          {/* Quick Add Menu / Action */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin/treks"
              className="bg-primary-container text-on-primary-container px-3 md:px-4 py-2 rounded text-[11px] font-semibold uppercase tracking-wider font-sans flex items-center gap-2 hover:bg-primary-container/80 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              <span className="hidden md:inline">Trek</span>
            </Link>
            <Link
              href="/admin/regions"
              className="bg-secondary-container text-on-secondary-fixed-variant px-3 md:px-4 py-2 rounded text-[11px] font-semibold uppercase tracking-wider font-sans flex items-center gap-2 hover:bg-secondary-container/80 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              <span className="hidden md:inline">Region</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
