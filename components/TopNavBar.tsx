"use client";

import { useState } from "react";
import Link from "next/link";

type ActivePage = "home" | "destinations" | "trips" | "about" | "contact";

interface TopNavBarProps {
  activePage?: ActivePage;
}

const navLinks: { label: string; href: string; key: ActivePage }[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Destinations", href: "/destinations", key: "destinations" },
  { label: "Trips", href: "/trips", key: "trips" },
  { label: "About", href: "/about", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export default function TopNavBar({ activePage = "home" }: TopNavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-stone-50/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center h-20 md:h-24">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold font-serif text-[#1B365D] tracking-tight"
        >
          Himalayan Vistas
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(({ label, href, key }) => (
            <Link
              key={key}
              href={href}
              className={`font-serif tracking-tight transition-colors ${
                activePage === key
                  ? "text-[#1B365D] border-b-2 border-[#1B365D] pb-1"
                  : "text-stone-600 hover:text-[#1B365D]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4 text-stone-600">
            <button className="material-symbols-outlined hover:opacity-80 transition-opacity active:scale-95 duration-200">
              mail
            </button>
            <button className="material-symbols-outlined hover:opacity-80 transition-opacity active:scale-95 duration-200">
              chat
            </button>
          </div>
          <button className="bg-[#1B365D] text-white px-6 py-3 font-serif hover:opacity-90 active:scale-95 transition-all">
            Enquire Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#1B365D]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-stone-50 border-t border-stone-200 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, href, key }) => (
            <Link
              key={key}
              href={href}
              className={`font-serif py-2 border-b border-stone-100 ${
                activePage === key
                  ? "text-[#1B365D] font-semibold"
                  : "text-stone-600"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <button className="bg-[#1B365D] text-white px-6 py-3 font-serif mt-2">
            Enquire Now
          </button>
        </div>
      )}
    </header>
  );
}
