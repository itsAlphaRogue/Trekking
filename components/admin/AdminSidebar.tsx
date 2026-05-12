"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminGetProfile } from "@/lib/supabase/queries/admin";
import { getSettings } from "@/lib/supabase/queries/settings";
import { createClient } from "@/lib/supabase/client";
import { useAdmin } from "./AdminShell";

const navItems = [
  { href: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/admin/treks", icon: "hiking", label: "treks" },
  { href: "/admin/regions", icon: "terrain", label: "Regions" },
  { href: "/admin/settings", icon: "settings", label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { sidebarOpen, setSidebarOpen } = useAdmin();

  const [profile, setProfile] = useState<{
    full_name: string;
    role_label: string;
    avatar_url: string;
  } | null>(null);
  const [companyName, setCompanyName] = useState("Himalayan Vistas");

  useEffect(() => {
    adminGetProfile()
      .then((data) => {
        setProfile({
          full_name: data.full_name || "Admin",
          role_label: data.role_label || "Administrator",
          avatar_url: data.avatar_url || "",
        });
      })
      .catch((err) => console.error("Sidebar profile fetch error:", err));

    getSettings()
      .then((data) => {
        setCompanyName(data.company_name);
      })
      .catch((err) => console.error("Sidebar settings fetch error:", err));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin-login");
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-outline-variant bg-surface flex flex-col shrink-0 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="p-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary-container flex items-center justify-center rounded-lg">
              <span
                className="material-symbols-outlined text-on-primary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                landscape
              </span>
            </div>
            <div>
              <h1 className="font-serif text-base font-semibold text-primary leading-tight">
                {companyName}
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-outline font-sans">
                Admin Console
              </p>
            </div>
          </div>
          <button
            className="lg:hidden text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1 mt-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-semibold uppercase tracking-widest font-sans transition-colors ${
                  isActive
                    ? "bg-secondary-container text-on-secondary-fixed-variant"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={
                    isActive ? { fontVariationSettings: "'FILL' 1" } : undefined
                  }
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="p-4 border-t border-outline-variant">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden shrink-0">
              <img
                alt="Admin"
                className="w-full h-full object-cover"
                src={profile?.avatar_url || "/fallback.png"}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-on-surface font-sans truncate">
                {profile?.full_name || "Loading..."}
              </p>
              <p className="text-[11px] text-outline font-sans">
                {profile?.role_label || "Admin"}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/admin/settings" className="flex items-center">
                <span className="material-symbols-outlined text-outline text-sm hover:text-primary transition-colors cursor-pointer">
                  settings
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center group"
                title="Log out"
              >
                <span className="material-symbols-outlined text-outline text-sm group-hover:text-error transition-colors">
                  logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
