"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
  //   { href: "/admin/active-treks", icon: "map", label: "Active Treks" },
  //   { href: "/admin/bookings", icon: "event_available", label: "Bookings" },
  { href: "/admin/treks", icon: "hiking", label: "treks" },
  { href: "/admin/regions", icon: "terrain", label: "Regions" },
  //   { href: "/admin/inquiries", icon: "chat_bubble", label: "Inquiries", badge: 12,},
  //   { href: "/admin/finance", icon: "payments", label: "Finance" },
  { href: "/admin/settings", icon: "settings", label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-outline-variant bg-surface flex flex-col shrink-0">
      {/* Brand */}
      <div className="p-8 flex items-center gap-4">
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
            Himalayan Vistas
          </h1>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-outline font-sans">
            Admin Console
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1 mt-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
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
              {/* {item.badge && (
                <span className="ml-auto bg-error text-on-error px-2 py-0.5 rounded-full text-[10px] font-sans">
                  {item.badge}
                </span>
              )} */}
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm7GHZ1MDiggW9vIQlcRMe4dydXnSr3lCPdClZmPlD5Je8L0XFs-SUZg1OLu9n7kDI7prdB-Rq8dc87_jTkvtV_rKODP9o-X_7H_9lPoyVbhbLUh11F1BwUMQEUC3UfqiekQuqs3fTMlNcsdDlf7ODE5-deKIwMQ1oK51bBNh37cnb66TJkyAP4XPgcDY0KsUxwG9KaieMoRlS3w0-DXa25i3NPtoWvXYNBI9J59nK3eNNqz2Nb_1d7-qIJ_Py4mdo4Zq4PaSMWd0j"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-on-surface font-sans truncate">
              Tashi Dorje
            </p>
            <p className="text-[11px] text-outline font-sans">
              Chief Operations
            </p>
          </div>
          <Link href="/admin/settings">
            <span className="material-symbols-outlined text-outline text-sm hover:text-primary transition-colors cursor-pointer">
              settings
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
