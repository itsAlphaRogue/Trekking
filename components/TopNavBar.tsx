"use client";

import { useState } from "react";
import Link from "next/link";

type ActivePage = "home" | "destinations" | "treks" | "contact";

interface TopNavBarProps {
  activePage?: ActivePage;
}

const navLinks: { label: string; href: string; key: ActivePage }[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Destinations", href: "/destinations", key: "destinations" },
  { label: "Treks", href: "/treks", key: "treks" },
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
          className="text-xl md:text-2xl font-bold font-serif text-primary-container tracking-tight"
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
                  ? "text-primary-container border-b-2 border-primary-container pb-1"
                  : "text-stone-600 hover:text-primary-container"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4 text-stone-600">
            <button className="hover:opacity-80 transition-opacity active:scale-95 duration-200">
              <svg className="fill-gray-700 h-8" viewBox="0 0 640 640">
                <path d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z" />
              </svg>
            </button>
            <button className="hover:opacity-80 transition-opacity active:scale-95 duration-200">
              <svg className="fill-gray-700 h-8" viewBox="0 0 640 640">
                <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z" />
              </svg>
            </button>
          </div>
          <button className="bg-primary-container text-white px-6 py-3 font-serif hover:opacity-90 active:scale-95 transition-all">
            Enquire Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-primary-container w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu with Transition */}
      <div
        className={`md:hidden bg-stone-50 border-t border-stone-200 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map(({ label, href, key }) => (
            <Link
              key={key}
              href={href}
              className={`font-serif py-3 border-b border-stone-100 transition-colors ${
                activePage === key
                  ? "text-primary-container font-semibold"
                  : "text-stone-600 active:text-primary-container"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <button className="bg-primary-container text-white px-6 py-4 font-serif mt-2 shadow-sm active:scale-[0.98] transition-transform">
            Enquire Now
          </button>
        </div>
      </div>
    </header>
  );
}
