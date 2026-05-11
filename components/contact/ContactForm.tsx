"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/supabase/queries/inquiries";

const TREK_OPTIONS = [
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
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    trek: TREK_OPTIONS[0],
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await submitInquiry(form);
      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="lg:col-span-7 bg-surface p-10 shadow-sm border border-surface-variant flex flex-col items-center justify-center gap-6 min-h-120">
        <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center">
          <span className="text-3xl text-secondary">
            <svg
              className="h-8 fill-secondary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z" />
            </svg>
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
        Trek Inquiry
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
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-surface-container-lowest border-0 border-b border-secondary px-0 py-3 focus:ring-0 focus:border-primary focus:outline-none transition-all text-base font-sans placeholder:text-on-surface-variant/50"
              placeholder="explorer@himalaya.com"
            />
          </div>
        </div>

        {/* Trip Interest */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2 font-sans">
            Primary Trek Interest
          </label>
          <div className="relative">
            <select
              value={form.trek}
              onChange={(e) => setForm({ ...form, trek: e.target.value })}
              className="w-full bg-surface-container-lowest border-0 border-b border-secondary px-0 py-3 focus:ring-0 focus:border-primary focus:outline-none transition-all text-base font-sans appearance-none cursor-pointer"
            >
              {TREK_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="absolute right-0 top-3 text-outline pointer-events-none">
              <svg
                className="h-5 fill-on-surface-variant"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2 font-sans">
            Message
          </label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-surface-container-lowest border-0 border-b border-secondary px-0 py-3 focus:ring-0 focus:border-primary focus:outline-none transition-all text-base font-sans placeholder:text-on-surface-variant/50 resize-none"
            placeholder="Tell us about your mountaineering experience and preferred dates..."
          />
        </div>

        {error && (
          <p className="text-sm text-error font-sans flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            {error}
          </p>
        )}

        <button
          disabled={loading}
          type="submit"
          className="bg-primary text-on-primary px-10 py-4 font-serif text-lg hover:bg-primary-container transition-colors shadow-lg active:scale-95 duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Sending…" : "Send Inquiry"}
        </button>
      </form>
    </div>
  );
}
