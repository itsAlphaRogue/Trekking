import Link from "next/link";
import { RegionListing } from "@/lib/supabase/queries/regions";

interface Props {
  regions: RegionListing[];
}

// Bento layout by position index — matches sort_order in DB
type Layout = "large" | "small" | "large-split";
const LAYOUTS: Layout[] = ["large", "small", "small", "large-split"];
const getLayout = (i: number): Layout => LAYOUTS[i] ?? "small";

export default function DestinationGrid({ regions }: Props) {
  const [r0, r1, r2, r3] = regions;

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-8">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
        <div>
          <h2 className="font-serif text-[40px] leading-[48px] font-semibold text-primary mb-4">
            Major Trekking Regions
          </h2>
          <p className="text-base text-on-surface-variant max-w-xl font-sans">
            From the legendary trails of Everest to the quiet paths of Manaslu,
            find your next high-altitude adventure.
          </p>
        </div>
        <div className="hidden md:flex">
          <span className="text-xs font-semibold text-on-surface-variant px-4 py-2 border border-outline-variant rounded-full font-sans">
            {regions.length} Region{regions.length !== 1 ? "s" : ""} Available
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Position 1 — large (8 cols) */}
        {r0 && (
          <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-lowest border border-stone-100">
            <div className="aspect-video overflow-hidden">
              <img
                alt={r0.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={r0.heroImage ?? "fallback.png"}
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-on-secondary-fixed-variant/10 text-on-secondary-fixed-variant px-3 py-1 text-xs font-semibold uppercase tracking-wider font-sans">
                    {r0.badge}
                  </span>
                </div>
                <h3 className="font-serif text-[32px] leading-[40px] font-semibold text-primary mb-4">
                  {r0.name}
                </h3>
                <p className="text-base text-on-surface-variant font-sans">
                  {r0.cardDescription}
                </p>
              </div>
              <Link
                href={`/destinations/${r0.slug}`}
                className="bg-primary-container text-on-primary font-serif px-8 py-4 whitespace-nowrap self-start md:self-end hover:bg-primary transition-colors active:scale-95 duration-200"
              >
                View Trips
              </Link>
            </div>
          </div>
        )}

        {/* Position 2 — small (4 cols) */}
        {r1 && (
          <div className="md:col-span-4 group relative flex flex-col bg-surface-container-lowest border border-stone-100">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                alt={r1.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={r1.heroImage ?? "fallback.png"}
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <span className="text-secondary text-xs font-semibold uppercase tracking-widest mb-3 font-sans">
                {r1.badge}
              </span>
              <h3 className="font-serif text-[32px] leading-[40px] font-semibold text-primary mb-3">
                {r1.name}
              </h3>
              <p className="text-base text-on-surface-variant mb-8 flex-1 font-sans">
                {r1.cardDescription}
              </p>
              <Link
                href={`/destinations/${r1.slug}`}
                className="border border-primary text-primary font-serif px-6 py-3 text-center hover:bg-primary hover:text-on-primary transition-all active:scale-95 duration-200"
              >
                View Trips
              </Link>
            </div>
          </div>
        )}

        {/* Position 3 — small (4 cols) */}
        {r2 && (
          <div className="md:col-span-4 group relative flex flex-col bg-surface-container-lowest border border-stone-100">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                alt={r2.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={r2.heroImage ?? "fallback.png"}
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <span className="text-secondary text-xs font-semibold uppercase tracking-widest mb-3 font-sans">
                {r2.badge}
              </span>
              <h3 className="font-serif text-[32px] leading-[40px] font-semibold text-primary mb-3">
                {r2.name}
              </h3>
              <p className="text-base text-on-surface-variant mb-8 flex-1 font-sans">
                {r2.cardDescription}
              </p>
              <Link
                href={`/destinations/${r2.slug}`}
                className="border border-primary text-primary font-serif px-6 py-3 text-center hover:bg-primary hover:text-on-primary transition-all active:scale-95 duration-200"
              >
                View Trips
              </Link>
            </div>
          </div>
        )}

        {/* Position 4 — large split (8 cols) */}
        {r3 && (
          <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-lowest border border-stone-100">
            <div className="grid md:grid-cols-2 h-full min-h-[400px]">
              <div className="overflow-hidden">
                <img
                  alt={r3.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={r3.heroImage ?? "fallback.png"}
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 text-xs font-semibold uppercase tracking-wider font-sans">
                    {r3.badge}
                  </span>
                </div>
                <h3 className="font-serif text-[32px] leading-[40px] font-semibold text-primary mb-4">
                  {r3.name}
                </h3>
                <p className="text-base text-on-surface-variant mb-8 font-sans">
                  {r3.cardDescription}
                </p>
                <Link
                  href={`/destinations/${r3.slug}`}
                  className="bg-primary-container text-on-primary font-serif px-8 py-4 self-start hover:bg-primary transition-colors active:scale-95 duration-200"
                >
                  View Trips
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Overflow regions (5th+) — narrow cards */}
        {regions.slice(4).map((r) => (
          <div
            key={r.slug}
            className="md:col-span-4 group relative flex flex-col bg-surface-container-lowest border border-stone-100"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                alt={r.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={r.heroImage ?? "fallback.png"}
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <span className="text-secondary text-xs font-semibold uppercase tracking-widest mb-3 font-sans">
                {r.badge}
              </span>
              <h3 className="font-serif text-[32px] leading-[40px] font-semibold text-primary mb-3">
                {r.name}
              </h3>
              <p className="text-base text-on-surface-variant mb-8 flex-1 font-sans">
                {r.cardDescription}
              </p>
              <Link
                href={`/destinations/${r.slug}`}
                className="border border-primary text-primary font-serif px-6 py-3 text-center hover:bg-primary hover:text-on-primary transition-all active:scale-95 duration-200"
              >
                View Trips
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
