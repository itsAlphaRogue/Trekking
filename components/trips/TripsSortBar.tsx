"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

interface Props {
  total: number;
}

export default function TripsSortBar({ total }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSort = searchParams.get("sortBy") ?? "popular";

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
      <div>
        <h1 className="font-serif text-3xl leading-12 font-semibold text-on-background">
          Exploring the Himalayas
        </h1>
        <p className="text-base text-on-surface-variant font-sans">
          Showing {total} curated expedition{total !== 1 ? "s" : ""} based on
          your filters
        </p>
      </div>

      <div className="flex items-center gap-3 bg-surface-container-low p-2 rounded-xl shrink-0">
        <span className="text-xs font-semibold uppercase tracking-widest text-outline px-2 font-sans">
          Sort By
        </span>
        <select
          className="bg-transparent border-none focus:ring-0 text-base text-primary font-semibold py-1 pr-8 cursor-pointer font-sans"
          value={currentSort}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="popular">Most Popular</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="duration_asc">Duration: Shortest First</option>
        </select>
      </div>
    </div>
  );
}
