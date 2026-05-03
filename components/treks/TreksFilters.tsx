"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition, useState, useEffect } from "react";
import { Difficulty } from "@/lib/trekListings";

const DIFFICULTIES: Difficulty[] = [
  "Easy",
  "Moderate",
  "Strenuous",
  "Challenging",
];
const REGIONS = [
  { value: "everest", label: "Everest Region" },
  { value: "annapurna", label: "Annapurna Massif" },
  { value: "manaslu", label: "Manaslu Circuit" },
  { value: "langtang", label: "Langtang Valley" },
];

export default function TreksFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // URL values
  const currentDifficulty = searchParams.getAll("difficulty") as Difficulty[];
  const currentRegions = searchParams.getAll("region");
  const currentMaxDuration = searchParams.get("maxDuration") ?? "30";
  const currentMinPrice = searchParams.get("minPrice") ?? "";
  const currentMaxPrice = searchParams.get("maxPrice") ?? "";
  const currentQ = searchParams.get("q") ?? "";

  // LOCAL STATE (for debounce control)
  const [q, setQ] = useState(currentQ);
  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);
  const [duration, setDuration] = useState(currentMaxDuration);

  // Keep state in sync if URL changes externally
  useEffect(() => setQ(currentQ), [currentQ]);
  useEffect(() => setMinPrice(currentMinPrice), [currentMinPrice]);
  useEffect(() => setMaxPrice(currentMaxPrice), [currentMaxPrice]);
  useEffect(() => setDuration(currentMaxDuration), [currentMaxDuration]);

  const updateParam = useCallback(
    (key: string, value: string | string[] | null) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      params.set("page", "1");

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== null && value !== "") {
        params.set(key, value);
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams],
  );

  const toggleArrayParam = useCallback(
    (key: string, value: string, current: string[]) => {
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateParam(key, next);
    },
    [updateParam],
  );

  // ✅ Debounce: Search
  useEffect(() => {
    const t = setTimeout(() => {
      updateParam("q", q);
    }, 800);
    return () => clearTimeout(t);
  }, [q]);

  // ✅ Debounce: Price
  useEffect(() => {
    const t = setTimeout(() => {
      updateParam("minPrice", minPrice);
      updateParam("maxPrice", maxPrice);
    }, 400);
    return () => clearTimeout(t);
  }, [minPrice, maxPrice]);

  const handleApply = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClear = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  return (
    <aside className="w-full md:w-80 shrink-0 space-y-10">
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif text-xl font-semibold text-primary">
            Refine Search
          </h3>
          {searchParams.toString() && (
            <button
              onClick={handleClear}
              className="text-xs font-semibold text-outline hover:text-error uppercase tracking-widest font-sans transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <input
              className="w-full bg-surface-container-lowest border-b-2 border-primary focus:border-outline px-4 py-3 text-base font-sans outline-none"
              placeholder="e.g. Base Camp"
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <span className=" absolute right-3 top-3 text-outline">
              <svg
                className="h-8 fill-primary"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-8">
          <span className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-4 font-sans">
            Difficulty
          </span>
          <div className="grid grid-cols-2 gap-2">
            {DIFFICULTIES.map((d) => (
              <label
                key={d}
                className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container"
              >
                <input
                  type="checkbox"
                  checked={currentDifficulty.includes(d)}
                  onChange={() =>
                    toggleArrayParam("difficulty", d, currentDifficulty)
                  }
                />
                <span className="text-base font-sans">{d}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest font-sans">
              Duration
            </span>
            <span className="text-base font-semibold text-primary font-sans">
              Up to {duration} Days
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            value={duration}
            onChange={(e) => setDuration(e.target.value)} // smooth UI
            onMouseUp={(e) => updateParam("maxDuration", e.currentTarget.value)}
            onTouchEnd={(e) =>
              updateParam("maxDuration", e.currentTarget.value)
            }
            className="w-full h-1 cursor-pointer accent-primary"
          />
        </div>

        {/* Regions */}
        <div className="mb-8">
          <span className="block text-xs font-semibold uppercase tracking-widest mb-4 font-sans">
            Regions
          </span>
          {REGIONS.map((r) => (
            <label
              key={r.value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={currentRegions.includes(r.value)}
                onChange={() =>
                  toggleArrayParam("region", r.value, currentRegions)
                }
              />
              <span className="font-sans">{r.label}</span>
            </label>
          ))}
        </div>

        {/* Price */}
        <div className="mb-8">
          <span className="block text-xs font-semibold uppercase tracking-widest mb-4 font-sans">
            Price Range (USD)
          </span>
          <div className="flex gap-4">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <button
          onClick={handleApply}
          disabled={isPending}
          className="w-full bg-primary-container text-on-primary py-4 font-sans font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-60"
        >
          {isPending ? "Filtering…" : "Apply Filters"}
        </button>
      </section>
    </aside>
  );
}
