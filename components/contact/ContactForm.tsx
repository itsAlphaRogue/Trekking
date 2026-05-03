"use client";

import { useState } from "react";

const TRIP_OPTIONS = [
  "Everest Base Camp Trek",
  "Annapurna Circuit",
  "Upper Mustang Expedition",
  "Gokyo Lakes Trek",
  "Three Passes Trek",
  "Manaslu Circuit Trek",
  "Langtang Valley Trek",
  "Custom Private Journey",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: wire to Supabase or email API
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="lg:col-span-7 bg-surface p-10 shadow-sm border border-surface-variant flex flex-col items-center justify-center gap-6 min-h-120">
        <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl text-secondary">
            check_circle
          </span>
        </div>
        <h2 className="font-serif text-[32px] leading-10 font-semibold text-primary text-center">
          Inquiry Sent!
        </h2>
        <p className="text-base text-on-surface-variant text-center max-w-sm font-sans">
          Thank you for reaching out. Our expedition team will get back to you
          within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-semibold uppercase tracking-widest text-primary border-b border-primary pb-1 hover:opacity-70 transition-opacity font-sans"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 bg-surface p-10 shadow-sm border border-surface-variant relative z-10">
      <h2 className="font-serif text-[40px] leading-12 font-semibold text-primary mb-8">
        Trip Inquiry
      </h2>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2 font-sans">
              Full Name
            </label>
            <input
              required
              type="text"
              className="w-full bg-surface-container-lowest border-0 border-b border-secondary px-0 py-3 focus:ring-0 focus:border-primary focus:outline-none transition-all text-base font-sans placeholder:text-on-surface-variant/50"
              placeholder="Tenzing Norgay"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2 font-sans">
              Email Address
            </label>
            <input
              required
              type="email"
              className="w-full bg-surface-container-lowest border-0 border-b border-secondary px-0 py-3 focus:ring-0 focus:border-primary focus:outline-none transition-all text-base font-sans placeholder:text-on-surface-variant/50"
              placeholder="explorer@himalaya.com"
            />
          </div>
        </div>

        {/* Trip Interest */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2 font-sans">
            Primary Trip Interest
          </label>
          <div className="relative">
            <select className="w-full bg-surface-container-lowest border-0 border-b border-secondary px-0 py-3 focus:ring-0 focus:border-primary focus:outline-none transition-all text-base font-sans appearance-none cursor-pointer">
              {TRIP_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-0 top-3 text-outline pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2 font-sans">
            Message
          </label>
          <textarea
            rows={4}
            className="w-full bg-surface-container-lowest border-0 border-b border-secondary px-0 py-3 focus:ring-0 focus:border-primary focus:outline-none transition-all text-base font-sans placeholder:text-on-surface-variant/50 resize-none"
            placeholder="Tell us about your mountaineering experience and preferred dates..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-on-primary px-10 py-4 font-serif text-lg hover:bg-primary-container transition-colors shadow-lg active:scale-95 duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Sending…" : "Send Inquiry"}
        </button>
      </form>
    </div>
  );
}
