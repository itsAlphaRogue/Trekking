"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection({ heroImage }: { heroImage?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/treks?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative h-140 flex items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="Mount Everest"
          className="w-full h-full object-cover"
          src={heroImage || "/default.png"}
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary-container/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-white text-5xl md:text-[64px] leading-tight font-bold mb-8">
            Scale the Roof of the World.
          </h1>

          <p className="text-white/90 text-lg mb-10 max-w-lg">
            Experience the raw majesty of the Himalayas with elite-level safety
            protocols and premium high-altitude support.
          </p>

          {/* Search Bar */}
          <div className="bg-white/10 backdrop-blur-xl p-2 flex flex-col md:flex-row items-center gap-4 border border-white/20">
            {/* Search Input */}
            <div className="flex-1 w-full px-4 flex items-center gap-3">
              <svg className=" h-5 fill-white/80" viewBox="0 0 640 640">
                <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM370.7 389.1L226.4 444.6C207 452.1 187.9 433 195.4 413.6L250.9 269.3C254.2 260.8 260.8 254.2 269.3 250.9L413.6 195.4C433 187.9 452.1 207 444.6 226.4L389.1 370.7C385.9 379.2 379.2 385.8 370.7 389.1zM352 320C352 302.3 337.7 288 320 288C302.3 288 288 302.3 288 320C288 337.7 302.3 352 320 352C337.7 352 352 337.7 352 320z" />
              </svg>

              <input
                className="bg-transparent text-white placeholder-white/60 focus:outline-none w-full text-base py-3"
                placeholder="Find Your Adventure..."
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="h-6 w-px bg-white/20 hidden md:block" />

            {/* Button */}
            <button
              onClick={handleSearch}
              className="w-full md:w-auto bg-white text-primary-container px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-stone-300 hover:cursor-pointer transition-colors whitespace-nowrap"
            >
              Search Treks
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
